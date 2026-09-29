# Visual baseline ownership

Playwright screenshots are stored beneath each spec's snapshot directory in a platform folder (`darwin` or `linux`). The 2026 positioning sprint exposed differing Chromium font metrics and rasterization between macOS and Ubuntu; a shared image produced 36 screenshot failures while the other 220 browser checks passed. Keep desktop, mobile, tablet, and locale names distinct.

CI serves the built static export through Python’s local HTTP server, avoiding the changing Next.js development indicator. Normal CI compares committed Linux snapshots. It must never refresh them as part of the deployment gate. Local macOS tests compare the preserved macOS snapshots at the same strict thresholds.

To refresh Linux baselines after an intentional visual change:

1. Push a `codex/` repair branch.
2. Run the CI workflow on that branch with `refresh_all_visual_baselines=true`. Capture mode runs quality gates, generates image derivatives, captures both visual specs, then compares those captures with updates disabled. Capture mode is blocked on `main` to prevent deployment of a capture-only run.
3. Download the `linux-visual-baselines` artifact. Inspect the relevant routes, locales, desktop/mobile/tablet captures, image dimensions, and evidence sections before adopting the files.
4. Copy its two `*-snapshots/linux/` folders into `tests/playwright/`, commit them, and push normally. Full CI must pass with no snapshot refresh before deployment.

The older case-study-only capture input remains available on repair branches. Failed browser runs upload `browser-failure-diagnostics` with screenshots, traces, and the HTML report.

Local verification uses the existing scripts:

```sh
npm run type-check
npm run lint
npm run test:e2e -- tests/playwright/positioning-parity.spec.ts --workers=1
```

Rollback is a revert of the CI repair commits. No application, dependency, or production configuration changes are needed for this baseline ownership fix.
