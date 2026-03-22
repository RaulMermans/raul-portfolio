import { defineConfig, devices } from '@playwright/test'

const PORT = Number(process.env.PORT ?? 3000)
const HOST = '127.0.0.1'
const baseURL = `http://${HOST}:${PORT}`

export default defineConfig({
  testDir: './tests/playwright',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    colorScheme: 'light',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'iphone-13',
      use: {
        ...devices['iPhone 13'],
      },
    },
    {
      name: 'pixel-5',
      use: {
        ...devices['Pixel 5'],
      },
    },
  ],
  webServer: {
    command: `npm run dev -- --hostname ${HOST} --port ${PORT}`,
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
})
