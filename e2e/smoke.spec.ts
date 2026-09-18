import {expect, test} from '@playwright/test';

test.describe('web smoke contracts', () => {
  test('app loads root shell', async ({page}) => {
    await page.goto('/?eruda=0');
    await expect(page).toHaveTitle('Периодизация 8 недель');
    await expect(page.locator('#root')).toBeVisible();
  });

  test('auth or calculator shell is reachable', async ({page}) => {
    await page.goto('/?tab=calculator&eruda=0');
    const auth = page.getByRole('main', {name: /вход/i});
    const calcNav = page.getByRole('navigation', {name: /разделы приложения/i});
    await expect(auth.or(calcNav)).toBeVisible({timeout: 15_000});
  });

  test('lazy theory URL loads without crashing', async ({page}) => {
    await page.goto('/?tab=theory&eruda=0');
    await expect(page.locator('#root')).toBeVisible();
    // Either guest auth canvas or logged-in theory shell / nav
    const shell = page.locator('.app-root, .auth-screen, .ta-shell, nav[aria-label]');
    await expect(shell.first()).toBeVisible({timeout: 15_000});
  });

  test('lazy split and journal URLs resolve', async ({page}) => {
    for (const tab of ['split', 'journal', 'training'] as const) {
      await page.goto(`/?tab=${tab}&eruda=0`);
      await expect(page.locator('#root')).toBeVisible();
      await expect(page.locator('.app-root')).toBeVisible({timeout: 15_000});
    }
  });
});
