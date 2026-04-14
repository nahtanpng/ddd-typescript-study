import { Sequelize } from "sequelize-typescript";
import Product from "../../domain/entity/product.ts";
import ProductModel from "../db/sequelize/model/product.model.ts";
import ProductRepository from "./product.repository.ts";

describe("Product repository implementation unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productCreated = await ProductModel.findOne({ where: { id: "1" } });

    expect(productCreated?.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productCreated = await ProductModel.findOne({ where: { id: "1" } });

    expect(productCreated?.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });

    product.changeName("Product 2");
    product.changePrice(200);

    await productRepository.update(product);

    const productUpdated = await ProductModel.findOne({ where: { id: "1" } });

    expect(productUpdated?.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 2",
      price: 200,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });
    const productFound = await productRepository.find("1");

    expect(productModel?.toJSON()).toStrictEqual({
      id: productFound.id,
      name: productFound.name,
      price: productFound.price,
    });
  });

  it("should throw an error when product is not found", async () => {
    const productRepository = new ProductRepository();

    await expect(productRepository.find("1")).rejects.toThrow(
      "Product not found",
    );
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product("1", "Product 1", 100);
    const product2 = new Product("2", "Product 2", 200);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const productsFound = await productRepository.findAll();
    const products = [product1, product2];

    expect(products).toEqual(productsFound);
  });
});
