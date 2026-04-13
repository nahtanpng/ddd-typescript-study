import Address from "./entity/address.js";
import Customer from "./entity/customer.js";
import Order from "./entity/order.js";
import OrderItem from "./entity/order_item.js";

const customer = new Customer("123", "Nathan");
const address = new Address("Rua 1", 123, "12345-678", "São Paulo");
customer.Address = address;
customer.activate();
console.log("Customer:", customer);
