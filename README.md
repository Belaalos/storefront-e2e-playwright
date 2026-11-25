# SauceDemo Playwright E2E

End to end tests for the practice shop [saucedemo.com](https://www.saucedemo.com), written with Playwright (JavaScript). I built this next to my Selenium + pytest project to practise the same scenarios with a different tool.

![Playwright report](docs/report.png)

## What is tested

- Login: valid user, wrong password, locked out user, empty username, logout, opening the inventory without logging in
- Inventory: product count, sort by name (Z-A), sort by price (both directions)
- Cart: item badge count, removing an item, cart page contents
- Checkout: full purchase, required first name validation

14 tests in total.

## Structure

```
pages/     page objects (login, inventory)
tests/     spec files + fixtures.js (logged in fixture)
playwright.config.js
```

## Run it

```bash
git clone https://github.com/Belaalos/saucedemo-playwright-e2e.git
cd saucedemo-playwright-e2e
npm install
npx playwright install chromium
npm test
npm run report   # open the HTML report
```

If you already have Chrome installed you can skip the browser download and run `PW_CHANNEL=chrome npm test`.

Tests also run on GitHub Actions for every push.

## Author

Belal Magdy, QA automation. [LinkedIn](https://www.linkedin.com/in/belal-magdy-23sep2001)
