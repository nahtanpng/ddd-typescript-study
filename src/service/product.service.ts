import type Product from "../entity/product.ts";

export default class ProductService {
  static increasePrice(products: Product[], percentage: number): void {
    products.forEach((product) => {
      const newPrice = product.price + (product.price * percentage) / 100;
      product.changePrice(newPrice);
    });
  }
}
