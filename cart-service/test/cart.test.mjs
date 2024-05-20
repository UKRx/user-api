import { expect } from "chai";
import Cart from "../cart.js";

describe("Cart Service", () => {
  let cart;

  beforeEach(() => {
    cart = Cart.create(1);
  });

  it("should create a cart", () => {
    expect(cart).to.be.an("object");
  });

  it("should add items to the cart", () => {
    cart.add(1, 3);
    expect(cart.count()).to.eql({ 1: 3 });
  });

  it("should update item quantity in the cart", () => {
    cart.add(1, 3);
    cart.update(1, 5);
    expect(cart.count()).to.eql({ 1: 5 });
  });

  it("should remove items from the cart", () => {
    cart.add(1, 3);
    cart.remove(1);
    expect(cart.count()).to.eql({});
  });

  it("should check if cart has a product", () => {
    cart.add(1, 3);
    expect(cart.has(1)).to.be.true;
  });

  it("should check if the cart is empty", () => {
    expect(cart.isEmpty()).to.be.true;
    cart.add(1, 3);
    expect(cart.isEmpty()).to.be.false;
  });

  it("should return the correct quantity of different items", () => {
    cart.add(1, 3);
    cart.add(2, 2);
    expect(cart.quantity()).to.equal(2);
  });

  it("should calculate the total correctly", () => {
    cart.add(1, 3);
    cart.add(2, 2);
    expect(cart.total()).to.equal(500);
  });

  it("should apply fixed discounts correctly", () => {
    cart.add(1, 3);
    cart.addDiscount("promo1", { type: "fixed", amount: 50 });
    expect(cart.total()).to.equal(250);
  });

  it("should apply percentage discounts correctly", () => {
    cart.add(1, 3);
    cart.addDiscount("promo2", { type: "percentage", amount: 10, max: 100 });
    expect(cart.total()).to.equal(270);
  });

  it("should remove discounts correctly", () => {
    cart.add(1, 3);
    cart.addDiscount("promo1", { type: "fixed", amount: 50 });
    cart.removeDiscount("promo1");
    expect(cart.total()).to.equal(300);
  });

  it("should apply freebies correctly", () => {
    cart.add(1, 1);
    const condition = { type: "contains", productId: 1 };
    const reward = { productId: 2, quantity: 1 };
    cart.addFreebie("freebie1", condition, reward);
    expect(cart.has(2)).to.be.true;
  });

  it("should destroy the cart", () => {
    cart.add(1, 3);
    cart.destroy();
    expect(cart.isEmpty()).to.be.true;
  });
});
