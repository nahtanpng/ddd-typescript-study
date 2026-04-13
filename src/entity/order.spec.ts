import Order from "./order.ts";
import OrderItem from "./order_item.ts";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const order = new Order("", "123", []);
    }).toThrow("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      const order = new Order("123", "", []);
    }).toThrow("customerId is required");
  });

  it("should throw error when item qtd is 0", () => {
    expect(() => {
      const order = new Order("123", "123", []);
    }).toThrow("Item qtd must be greater than 0");
  });

  it("should calculate total", () => {
    const item1 = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const order = new Order("o1", "c1", [item1]);
    expect(order.total()).toBe(200);

    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
    const order2 = new Order("o2", "c1", [item1, item2]);
    expect(order2.total()).toBe(600);
  });

  it("should throw error if the item qtd is greater than zero", () => {
    expect(() => {
      const item1 = new OrderItem("i1", "Item 1", 100, "p1", 0);
    }).toThrow("Quantity must be greater than zero");
  });
});
