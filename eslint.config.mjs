import nextVitals from 'eslint-config-next/core-web-vitals'

const config = [
  ...nextVitals,
  {
    ignores: ['.codex-linux-closure/**', '.next/**', 'out/**', 'playwright-report/**', 'test-results/**'],
  },
]

export default config
