const { test, expect } = require('./fixtures');

test.describe('Inventory', () => {
  test('shows 6 products', async ({ loggedIn, inventory }) => {
    await expect(inventory.items).toHaveCount(6);
  });

  test('sort by name Z to A', async ({ loggedIn, inventory }) => {
    await inventory.sort.selectOption('za');
    const names = await inventory.names.allTextContents();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('sort by price low to high', async ({ loggedIn, inventory }) => {
    await inventory.sort.selectOption('lohi');
    const prices = await inventory.priceValues();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('sort by price high to low', async ({ loggedIn, inventory }) => {
    await inventory.sort.selectOption('hilo');
    const prices = await inventory.priceValues();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });
});
