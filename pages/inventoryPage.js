class InventoryPage {
  constructor(page) {
    this.page = page;
    this.items = page.locator('[data-test="inventory-item"]');
    this.names = page.locator('[data-test="inventory-item-name"]');
    this.prices = page.locator('[data-test="inventory-item-price"]');
    this.sort = page.locator('[data-test="product-sort-container"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  addToCart(slug) {
    return this.page.locator(`[data-test="add-to-cart-${slug}"]`).click();
  }

  removeFromCart(slug) {
    return this.page.locator(`[data-test="remove-${slug}"]`).click();
  }

  async priceValues() {
    const texts = await this.prices.allTextContents();
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }
}

module.exports = { InventoryPage };
