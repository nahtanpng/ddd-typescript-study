import type OrderItem from "./order_item.js";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }

    if (this._customerId.length === 0) {
      throw new Error("customerId is required");
    }

    if (this._items.length === 0) {
      throw new Error("Item qtd must be greater than 0");
    }
    return true;
  }

  total(): number {
    return this._items.reduce((total, item) => total + item._price, 0);
  }
}
