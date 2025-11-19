import { test, expect } from '@playwright/test'

test.describe('Zero-FAF-Builder E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load the homepage with Big Orange logo', async ({ page }) => {
    await expect(page).toHaveTitle(/Zero-FAF-Builder/)
    const logo = page.getByTestId('big-orange-logo')
    await expect(logo).toBeVisible()
  })

  test('should open local folder modal and copy command', async ({ page }) => {
    await page.getByTestId('btn-local-folder').click()
    const modal = page.getByTestId('modal-local')
    await expect(modal).toBeVisible()
    
    const input = modal.locator('input#command')
    await expect(input).toHaveValue(/npx faf-cli@latest/)
  })

  test('should show commands for valid GitHub URL', async ({ page }) => {
    await page.getByTestId('btn-github-repo').click()
    const modal = page.getByTestId('modal-github')
    await expect(modal).toBeVisible()

    const input = page.getByTestId('input-github-url')

    // Test valid URL shows commands
    await input.fill('https://github.com/vercel/next.js')

    // Should show the generated commands
    await expect(page.getByText('git clone https://github.com/vercel/next.js')).toBeVisible()
    await expect(page.getByText('npx grok-faf-mcp init')).toBeVisible()

    // Should have copy button
    const copyBtn = page.getByTestId('btn-copy-github')
    await expect(copyBtn).toBeVisible()
  })

  test('should have working start fresh link', async ({ page }) => {
    const link = page.getByTestId('btn-start-fresh')
    await expect(link).toHaveAttribute('href', /vercel\.com\/new\/clone/)
    await expect(link).toHaveAttribute('target', '_blank')
  })
})
