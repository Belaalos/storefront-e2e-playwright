const { test, expect } = require('./fixtures');

const BACKPACK = 'sauce-labs-backpack';
const BIKE_LIGHT = 'sauce-labs-bike-light';

test.describe('Cart', () => {
  test('badge counts added items and drops after remove', async ({ loggedIn, inventory }) => {
    await inventory.addToCart(BACKPACK);
    await inventory.addToCart(BIKE_LIGHT);
    await expect(inventory.cartBadge).toHaveText('2');
    await inventory.removeFromCart(BACKPACK);
    await expect(inventory.cartBadge).toHaveText('1');
  });

  test('cart page lists the added product', async ({ loggedIn: page, inventory }) => {
    await inventory.addToCart(BACKPACK);
    await inventory.cartLink.click();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
  });
});

test.describe('Checkout', () => {
  test('full purchase flow', async ({ loggedIn: page, inventory }) => {
    await inventory.addToCart(BACKPACK);
    await inventory.cartLink.click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Belal');
    await page.locator('[data-test="lastName"]').fill('Magdy');
    await page.locator('[data-test="postalCode"]').fill('12511');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
  });

  test('checkout form requires first name', async ({ loggedIn: page, inventory }) => {
    await inventory.addToCart(BACKPACK);
    await inventory.cartLink.click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });
});
