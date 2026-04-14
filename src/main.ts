import Address from "./domain/entity/address.ts";
import Customer from "./domain/entity/customer.ts";

const customer = new Customer("123", "Nathan");
const address = new Address("Rua 1", 123, "12345-678", "São Paulo");
customer.Address = address;
customer.activate();
console.log("Customer:", customer);
