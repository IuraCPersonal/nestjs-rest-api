import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
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
}
