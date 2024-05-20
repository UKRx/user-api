class Cart {
  constructor(customerId) {
    this.customerId = customerId;
    this.items = new Map();
    this.discounts = new Map();
    this.freebies = new Map();
  }

  static create(customerId) {
    return new Cart(customerId);
  }

  add(productId, quantity) {
    if (this.items.has(productId)) {
      this.items.set(productId, this.items.get(productId) + quantity);
    } else {
      this.items.set(productId, quantity);
    }
  }

  update(productId, quantity) {
    if (quantity <= 0) {
      this.items.delete(productId);
    } else {
      this.items.set(productId, quantity);
    }
  }

  remove(productId) {
    this.items.delete(productId);
  }

  destroy() {
    this.items.clear();
    this.discounts.clear();
    this.freebies.clear();
  }

  has(productId) {
    return this.items.has(productId);
  }

  isEmpty() {
    return this.items.size === 0;
  }

  count() {
    return Object.fromEntries(this.items);
  }

  quantity() {
    return this.items.size;
  }

  total() {
    let total = 0;
    for (let [productId, quantity] of this.items) {
      total += this.getProductPrice(productId) * quantity;
    }
    for (let discount of this.discounts.values()) {
      if (discount.type === "fixed") {
        total -= discount.amount;
      } else if (discount.type === "percentage") {
        total -= Math.min(total * (discount.amount / 100), discount.max);
      }
    }
    return total;
  }

  addDiscount(name, discount) {
    this.discounts.set(name, discount);
  }

  removeDiscount(name) {
    this.discounts.delete(name);
  }

  addFreebie(name, condition, reward) {
    this.freebies.set(name, { condition, reward });
    this.applyFreebies();
  }

  applyFreebies() {
    for (let { condition, reward } of this.freebies.values()) {
      if (
        condition.type === "contains" &&
        this.items.has(condition.productId)
      ) {
        this.add(reward.productId, reward.quantity);
      }
    }
  }

  getProductPrice(productId) {
    return 100;
  }
}

export default Cart;
