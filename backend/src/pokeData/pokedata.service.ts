import { Injectable, NotFoundException } from '@nestjs/common';
import { Pokedata } from './pokedata.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Pokedata') private readonly productModel: Model<Pokedata>,
  ) {}

  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({
      title: title,
      desc: desc,
      price: price,
    });
    const result = await newProduct.save();
    console.log(result);
    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map((prod) => ({
      id: prod.id,
      // title: prod.title,
      // describe: prod.desc,
      // price: prod.price,
    }));
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      // title: product.title,
      // description: product.desc,
      // price: product.price,
    };
  }

  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const updateProduct = await this.findProduct(productId);

    // if (title) {
    //   updateProduct.title = title;
    // }
    // if (desc) {
    //   updateProduct.desc = desc;
    // }
    // if (price) {
    //   updateProduct.price = price;
    // }
    updateProduct.save();
  }

  async deleteProduct(prodId: string) {
    await this.productModel.deleteOne({ _id: prodId }).exec();
  }

  private async findProduct(id: string): Promise<Pokedata> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }
}
