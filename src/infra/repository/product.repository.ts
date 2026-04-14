import Product from "../../domain/entity/product.ts";
import type ProductRepositoryInterface from "../../domain/repository/product-repository.interface.ts";
import ProductModel from "../db/sequelize/model/product.model.ts";

export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }
  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: { id: entity.id },
      },
    );
  }
  async find(id: string): Promise<Product> {
    const productFound = await ProductModel.findOne({ where: { id } });

    if (!productFound) {
      throw new Error("Product not found");
    }

    return new Product(productFound.id, productFound.name, productFound.price);
  }
  async findAll(): Promise<Product[]> {
    const productsFound = await ProductModel.findAll();

    return productsFound.map(
      (product) => new Product(product.id, product.name, product.price),
    );
  }
}
