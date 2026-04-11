import Address from "./entity/address.js";
import Customer from "./entity/customer.js";
import Order from "./entity/order.js";
import OrderItem from "./entity/order_item.js";

const customer = new Customer("123", "Nathan");
const address = new Address("Rua 1", 123, "12345-678", "São Paulo");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10);
const item2 = new OrderItem("2", "Item 2", 20);

const order = new Order("1", customer._id, [item1, item2]);

console.log("Customer:", customer);
console.log("Order:", order);
