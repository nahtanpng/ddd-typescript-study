import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address.ts";
import Customer from "../../domain/entity/customer.ts";
import CustomerModel from "../db/sequelize/model/customer.model.ts";
import CustomerRepository from "./custmer.repository.ts";

describe("Customer repository implementation unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "John Doe");
    const address = new Address("Main Street", 123, "12345", "Anytown");
    customer.Address = address;
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: "123" },
    });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: "123",
      name: "John Doe",
      street: "Main Street",
      number: 123,
      zipcode: "12345",
      city: "Anytown",
      active: true,
      rewardPoints: 0,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "John Doe");
    const address = new Address("Main Street", 123, "12345", "Anytown");
    customer.Address = address;
    await customerRepository.create(customer);

    customer.changeName("Jane Doe");
    await customerRepository.update(customer);
    const customerModel = await CustomerModel.findOne({
      where: { id: "123" },
    });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: "123",
      name: "Jane Doe",
      street: "Main Street",
      number: 123,
      zipcode: "12345",
      city: "Anytown",
      active: true,
      rewardPoints: 0,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "John Doe");
    const address = new Address("Main Street", 123, "12345", "Anytown");
    customer.Address = address;
    await customerRepository.create(customer);

    const foundCustomer = await customerRepository.find("123");

    expect(foundCustomer).toStrictEqual(customer);
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    await expect(customerRepository.find("123")).rejects.toThrow(
      "Customer not found",
    );
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("123", "John Doe");
    const address1 = new Address("Main Street", 123, "12345", "Anytown");
    customer1.Address = address1;
    await customerRepository.create(customer1);

    const customer2 = new Customer("456", "Jane Doe");
    const address2 = new Address("Second Street", 456, "67890", "Othertown");
    customer2.Address = address2;
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });
});
