import { Injectable } from '@nestjs/common';
import { ProductsRepository } from 'src/repositories/products.repository';
import { CreateProductDto } from './dto/createProduct.dto';
import { ClientSession } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) { }

  async createProduct(
    createProductDto: CreateProductDto,
    session: ClientSession,
  ) {
    const createdProduct = this.productsRepository.createProduct(
      createProductDto,
      session,
    );
    return createdProduct;
  }

  async getProducts() {
    return this.productsRepository.getProducts();
  }
}
