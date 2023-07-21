import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { Response } from 'express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/createProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @InjectConnection()
    private readonly mongoConnection: Connection,
    private productsService: ProductsService,
  ) { }

  @Get('/')
  async getProducts() {
    return this.productsService.getProducts();
  }

  @Post('/createProduct')
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Res() res: Response,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();

    try {
      const newProduct: any = await this.productsService.createProduct(
        createProductDto,
        session,
      );

      await session.commitTransaction();

      return res.status(HttpStatus.CREATED).send(newProduct);
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error);
    } finally {
      session.endSession();
    }
  }

  @Get('/getProductById/:id')
  async getProductById(
    @Param('id') id: MongooseSchema.Types.ObjectId,
    @Res() res: Response,
  ) {
    const product: any = await this.productsService.getProductById(id);
    return res.status(HttpStatus.OK).send(product);
  }
}
