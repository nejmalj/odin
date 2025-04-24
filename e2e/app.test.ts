import { test, expect } from '@playwright/test';

test.describe('Par Odin - Tests E2E', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/');
    });

    test('devrait afficher le titre de l\'appli', async ({ page }) => {
        const title = await page.textContent('h1');
        expect(title).toBe('Par Odin');
    });

    test('devrait pouvoir lancer les dés', async ({ page }) => {
        const diceCountBefore = await page.locator('.dices .dice').count();
        expect(diceCountBefore).toBe(0);

        await page.click('button:text("Lancer les dés")');

        const diceCountAfter = await page.locator('.dices .dice').count();
        expect(diceCountAfter).toBeGreaterThan(0);
    });

    test('devrait afficher une solution quand le bouton de triche est cliqué', async ({ page }) => {
        await page.click('button:text("Lancer les dés")');
        await page.click('button:text("Tricher ?")');

        const solutionText = await page.locator('.solution').innerText();
        expect(solutionText).toContain('Solution pour les nuls');
    });

    test('devrait afficher un message si aucune solution n\'est trouvée', async ({ page }) => {
        await page.click('button:text("Lancer les dés")');
        await page.click('button:text("Tricher ?")');

        const noSolutionText = await page.locator('.solution p').innerText();
        expect(noSolutionText).toBe('C\'était un piège, il n\'y a pas de solution !');
    });
});
