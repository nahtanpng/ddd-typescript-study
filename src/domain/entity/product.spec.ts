import Product from "./product.ts";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrow("Id is required");
  });

  it("should throw error when Name is empty", () => {
    expect(() => {
      const product = new Product("1", "", 100);
    }).toThrow("Name is required");
  });

  it("should throw error when Price is less than zero", () => {
    expect(() => {
      const product = new Product("1", "Product 1", -1);
    }).toThrow("Price must be greater than zero");
  });

  it("should change name", () => {
    const product = new Product("1", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change Price", () => {
    const product = new Product("1", "Product 1", 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  });
});
