import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address.ts";
import Customer from "../../domain/entity/customer.ts";
import Order from "../../domain/entity/order.ts";
import OrderItem from "../../domain/entity/order_item.ts";
import Product from "../../domain/entity/product.ts";
import CustomerModel from "../db/sequelize/model/customer.model.ts";
import OrderModel from "../db/sequelize/model/order.model.ts";
import OrderItemModel from "../db/sequelize/model/order-item.model.ts";
import ProductModel from "../db/sequelize/model/product.model.ts";
import CustomerRepository from "./customer.repository.ts";
import OrderRepository from "./order.repository.ts";
import ProductRepository from "./product.repository.ts";

describe("Order repository implementation test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderItemModel,
      ProductModel,
      OrderModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "John Doe");
    const address = new Address("Street 1", 123, "City", "Zipcode");
    customer.Address = address;
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2,
    );

    const order = new Order("123", customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    if (!orderModel) {
      throw new Error("Order not found");
    }

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          product_id: orderItem.productId,
          quantity: orderItem.quantity,
          order_id: "123",
        },
      ],
    });
  });
});
