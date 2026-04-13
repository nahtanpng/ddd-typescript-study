import { v4 as uuidv4 } from "uuid";
import type Customer from "../entity/customer.ts";
import Order from "../entity/order.ts";
import type OrderItem from "../entity/order_item.ts";

export default class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error("Order must have at least one item");
    }

    const order = new Order(uuidv4(), customer.id, items);
    customer.addRewardPoints(order.total() / 2);

    return order;
  }

  static total(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.total(), 0);
  }
}
