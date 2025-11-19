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

  test('should validate GitHub URL input', async ({ page }) => {
    await page.getByTestId('btn-github-repo').click()
    const modal = page.getByTestId('modal-github')
    await expect(modal).toBeVisible()

    const input = page.getByTestId('input-github-url')
    const submitBtn = page.getByTestId('btn-download-github')

    // Test invalid URL
    await input.fill('not-a-url')
    await submitBtn.click()
    // Expect toast error (checking for text presence usually works in e2e)
    await expect(page.getByText('Invalid URL format')).toBeVisible()

    // Test non-github URL
    await input.fill('https://google.com')
    await submitBtn.click()
    await expect(page.getByText('Please enter a valid GitHub URL')).toBeVisible()

    // Test valid URL
    await input.fill('https://github.com/vercel/next.js')
    await submitBtn.click()
    
    // Should show loading state
    await expect(page.getByText('Injecting FAF...')).toBeVisible()
    
    // Should close modal (we don't show a success message currently, just close)
    await expect(modal).not.toBeVisible()
  })

  test('should have working start fresh link', async ({ page }) => {
    const link = page.getByTestId('btn-start-fresh')
    await expect(link).toHaveAttribute('href', /vercel\.com\/new\/clone/)
    await expect(link).toHaveAttribute('target', '_blank')
  })
})
