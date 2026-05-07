import Order from "../../domain/entity/order.ts";
import OrderItem from "../../domain/entity/order_item.ts";
import type OrderRepositoryInterface from "../../domain/repository/order-repository.interface.ts";
import OrderModel from "../db/sequelize/model/order.model.ts";
import OrderItemModel from "../db/sequelize/model/order-item.model.ts";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: ["items"],
      },
    );
  }
  async update(entity: Order): Promise<void> {
    const orderModel = await OrderModel.findOne({
      where: { id: entity.id },
      include: ["items"],
    });

    if (!orderModel) {
      throw new Error("Order not found");
    }

    await orderModel.update({
      customer_id: entity.customerId,
      total: entity.total(),
    });

    await OrderItemModel.destroy({ where: { order_id: entity.id } });
    await OrderItemModel.bulkCreate(
      entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id,
      })),
    );
  }
  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: ["items"],
    });

    if (!orderModel) {
      throw new Error("Order not found");
    }

    const items = orderModel.items.map((item) => {
      return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity,
      );
    });

    const order = new Order(orderModel.id, orderModel.customer_id, items);

    return order;
  }
  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: ["items"],
    });

    return orderModels.map((orderModel) => {
      const items = orderModel.items.map((item) => {
        return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity,
        );
      });
      const orders = new Order(orderModel.id, orderModel.customer_id, items);
      return orders;
    });
  }
}
