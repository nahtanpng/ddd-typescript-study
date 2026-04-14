import Address from "../../domain/entity/address.ts";
import Customer from "../../domain/entity/customer.ts";
import type CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface.ts";
import CustomerModel from "../db/sequelize/model/customer.model.ts";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.Address.street,
      number: entity.Address.number,
      zipcode: entity.Address.zip,
      city: entity.Address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }
  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.Address.street,
        number: entity.Address.number,
        zipcode: entity.Address.zip,
        city: entity.Address.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      {
        where: { id: entity.id },
      },
    );
  }
  async find(id: string): Promise<Customer> {
    const customerModel = await CustomerModel.findOne({ where: { id } });

    if (!customerModel) {
      throw new Error("Customer not found");
    }

    const customer = new Customer(customerModel.id, customerModel.name);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zipcode,
      customerModel.city,
    );
    customer.Address = address;
    if (!customerModel.active) {
      customer.deactivate();
    }
    customer.addRewardPoints(customerModel.rewardPoints);
    return customer;
  }
  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    return customerModels.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name);
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zipcode,
        customerModel.city,
      );
      customer.Address = address;
      if (!customerModel.active) {
        customer.deactivate();
      }
      customer.addRewardPoints(customerModel.rewardPoints);
      return customer;
    });
  }
}
