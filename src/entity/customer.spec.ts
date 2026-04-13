import Address from "./address.ts";
import Customer from "./customer.ts";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const customer = new Customer("", "John");
    }).toThrow("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const customer = new Customer("123", "");
    }).toThrow("Name is required");
  });

  it("should change name", () => {
    const customer = new Customer("123", "John");
    customer.changeName("Jane");
    expect(customer.name).toBe("Jane");
  });

  it("should activate customer", () => {
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 123, "Zipcode 1", "City 1");
    customer.Address = address;
    customer.activate();
    expect(customer.isActive()).toBeTruthy();
  });

  it("should throw error when address is undefined when you activate", () => {
    expect(() => {
      const customer = new Customer("123", "Customer 1");
      customer.activate();
    }).toThrow("Address is required to activate a customer");
  });

  it("should deactivate customer", () => {
    const customer = new Customer("123", "Customer 1");
    customer.deactivate();
    expect(customer.isActive()).toBeFalsy();
  });
});
