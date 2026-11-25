const base = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { InventoryPage } = require('../pages/inventoryPage');

const test = base.test.extend({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventory: async ({ page }, use) => use(new InventoryPage(page)),
  // a page that is already logged in as standard_user
  loggedIn: async ({ page, loginPage }, use) => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForURL('**/inventory.html');
    await use(page);
  },
});

module.exports = { test, expect: base.expect };
