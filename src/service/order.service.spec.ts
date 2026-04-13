import Customer from "../entity/customer.ts";
import Order from "../entity/order.ts";
import OrderItem from "../entity/order_item.ts";
import OrderService from "./order.service.ts";

describe("Order service unit test", () => {
  it("should place an order", () => {
    const customer = new Customer("c1", "Customer 1");
    const orderItem = new OrderItem("1", "Item 1", 100, "p1", 1);

    const order = OrderService.placeOrder(customer, [orderItem]);
    expect(customer.rewardPoints).toBe(50);
    expect(order.total()).toBe(100);
  });

  it("should get total of all orders", () => {
    const orderItem = new OrderItem("1", "Item 1", 100, "p1", 1);
    const orderItem2 = new OrderItem("2", "Item 2", 200, "p2", 2);

    const order = new Order("1", "c1", [orderItem]);
    const order2 = new Order("2", "c1", [orderItem2]);

    const total = OrderService.total([order, order2]);
    expect(total).toBe(500);
  });
});
