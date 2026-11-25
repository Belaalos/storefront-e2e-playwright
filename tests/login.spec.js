const { test, expect } = require('./fixtures');

test.describe('Login', () => {
  test('valid user lands on the products page', async ({ page, loginPage }) => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('wrong password shows an error', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('standard_user', 'wrong_password');
    await expect(loginPage.error).toContainText('Username and password do not match');
  });

  test('locked out user is blocked', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.error).toContainText('locked out');
  });

  test('empty username is rejected', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('', 'secret_sauce');
    await expect(loginPage.error).toContainText('Username is required');
  });

  test('logout returns to the login page', async ({ loggedIn: page }) => {
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

  test('inventory cannot be opened without logging in', async ({ page }) => {
    await page.goto('/inventory.html');
    await expect(page.locator('[data-test="error"]')).toContainText("only access '/inventory.html' when you are logged in");
  });
});
