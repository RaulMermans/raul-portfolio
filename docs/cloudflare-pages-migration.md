# Cloudflare Pages migration runbook

Status: staging preparation. No production DNS, domain registration, IONOS contract, or live deployment settings have been changed.

## Compatibility assessment

The site uses Next.js static export (`output: 'export'`, `trailingSlash: true`), so Pages can serve `out/` without Functions, Workers, databases, or a paid hosting plan. Image derivatives are generated before the build. The contact links do not need a server. The exported `404.html` gives Pages its custom 404 response. Canonical URLs, hreflang, sitemap, robots, and structured data remain generated for `https://www.raulmermans.com`.

Next.js 16 requires Node 20.9 or newer. This migration declares Node 22 in `.nvmrc`, `package.json`, and the existing CI and IONOS deployment workflows. The IONOS workflow remains available.

[Pages Free limits](https://developers.cloudflare.com/pages/platform/limits/) relevant here: 20,000 files per site, 25 MiB per asset, 500 Cloudflare builds per month, one concurrent Cloudflare build, and 20 minutes per Cloudflare build. Cloudflare Pages will build directly from the GitHub repository through its [Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/). `npm run verify:cloudflare-pages` enforces the file count and size limits on each export. Verify that the Cloudflare build completes within 20 minutes before relying on it for production.

`public/_redirects` replaces the Apache `/es` rules. `public/_headers` gives fingerprinted Next.js assets long browser caching and images a one-day lifetime; HTML uses Pages' revalidation behavior. [Pages recognizes a top-level `404.html`](https://developers.cloudflare.com/pages/configuration/serving-pages/) as a custom not-found response. [Preview deployments get `X-Robots-Tag: noindex` by default](https://developers.cloudflare.com/pages/configuration/preview-deployments/); confirm that header on the staging URL. The production project `*.pages.dev` hostname should be redirected to the canonical domain after cutover to avoid a duplicate indexable site.

## DNS inventory, 29 October 2026

Read-only public queries showed IONOS authoritative nameservers: `ns1018.ui-dns.biz`, `ns1019.ui-dns.com`, `ns1035.ui-dns.de`, and `ns1071.ui-dns.org`. TTL was 3600 seconds for the listed web and mail records. Record values may change; repeat the inventory immediately before cutover.

| Name / type | Observed value | Migration treatment |
| --- | --- | --- |
| `@` A | `217.160.0.74` | Current IONOS website; record for rollback, then replace only at approved cutover. |
| `@` AAAA | `2001:8d8:100f:f000::200` | Current IONOS website; replace with the Pages setup at cutover. |
| `www` A / AAAA | Same as apex | Current IONOS website; replace with Pages custom-domain CNAME at cutover. |
| `@` MX | Priority 10: `mx00.ionos.de`, `mx01.ionos.de` | Preserve unchanged; indicates IONOS mail routing. Verify actual mailbox and contract in IONOS. |
| `@` TXT | IONOS SPF includes `_spf-eu.ionos.com`; Google site verification also present | Preserve both exact values from IONOS DNS export. |
| `autodiscover` CNAME | `adsredir.ionos.info` | Preserve for IONOS mail clients. |
| `s1-ionos._domainkey`, `s2-ionos._domainkey` CNAME | `s1.dkim.ionos.com`, `s2.dkim.ionos.com` | Preserve both for IONOS DKIM. |
| `_dmarc` TXT, `@` CAA, `@` DS, `@` SRV | No answer in the queried public DNS | Recheck in IONOS and at the parent zone; absence here is not proof of a complete zone inventory. |

Public DNS cannot enumerate every subdomain, custom DKIM selector, verification record, SRV record, or private integration. Before any nameserver change, export the complete IONOS zone, review every record and service in the IONOS account, check DNSSEC/DS at the registrar, and compare the exported zone against Cloudflare's imported zone. Do not publish a partial zone. The current contact address in the site is Gmail, but the MX/SPF/DKIM records still show IONOS mail configuration; do not infer that IONOS email is unused.

## Hosting and DNS choice

[Cloudflare Pages allows an externally managed DNS CNAME for a subdomain](https://developers.cloudflare.com/pages/configuration/custom-domains/), so `www` could point to Pages while IONOS remains authoritative. That does not complete this objective: Pages requires Cloudflare nameservers for a custom **apex** domain, and keeping the apex on IONOS would retain a separate HTTPS redirect dependency. For the requested `www` site with an apex redirect and removable IONOS web hosting, the planned cutover is to keep registration at IONOS and change only authoritative nameservers to Cloudflare after a complete DNS copy and approval. No registrar transfer is needed.

## Staging and deployment setup

1. In Cloudflare, create a **Pages Git integration** project on the Free plan using `RaulMermans/raul-portfolio`. Keep repository access limited to this repository and the two already authorized repositories. Choose `main` as the production branch and enable preview deployments for the migration branch. Do not attach either production hostname yet. Record the project name and initial deployment SHA.
2. Set the build command to `npm run build && npm run verify:export && npm run verify:canonical && npm run verify:cloudflare-pages`, output directory to `out`, and environment variable `NODE_VERSION=22` for production and preview builds. The repo's `npm ci` and image generation run through its `prebuild` script. Cloudflare builds and deploys on Git pushes; GitHub Actions continues to run independent quality checks and the existing IONOS deployment. No Cloudflare API token or GitHub deployment action is needed.
3. Test the branch preview at `<branch>.<project>.pages.dev`, confirm its commit SHA in the Cloudflare deployment details, and check its `X-Robots-Tag: noindex` header. A successful Cloudflare build only proves its own build command passed; review the GitHub CI checks before merging or promoting a commit. Protect `main` with required CI checks if repository settings and plan allow it, so Cloudflare's automatic production-branch builds only follow reviewed, verified merges.
4. Keep Pages custom domains disconnected during staging. The Pages production `*.pages.dev` deployment may exist from `main`, but it does not change the live IONOS domain. Complete the staging acceptance checks before asking for the production DNS cutover.

### Staging acceptance checks

Record pass/fail and URL for each check: Spanish and English home, about, case studies and individual studies, services, apps, photography and full-resolution media, navigation and contact links, desktop/mobile rendering, animations, accessibility, responsive WebP/AVIF, fonts/icons, 404 status and custom body, `/es/` and `/es/about/` 301 redirects, `robots.txt`, `sitemap.xml`, canonical/hreflang/structured data, caching headers, and `X-Robots-Tag: noindex` on preview HTML. Compare representative pages and screenshots with the live IONOS site. Run the existing Playwright suite and visual regressions in CI. Stage must pass before domain cutover.

## Production cutover — approval required

1. Confirm staging and the IONOS website are healthy. Save an IONOS DNS export, the current nameserver list, web A/AAAA values, and the last working IONOS deployment SHA. Confirm IONOS hosting, domain, email, and any SSL product are separate or bundled before changing a contract.
2. In Cloudflare, add the zone on the Free plan. Replicate **all** IONOS records first: MX, SPF, DKIM, autodiscover, Google verification, any other TXT/CAA/SRV/subdomain records, and mail-related settings. Keep mail records DNS-only where applicable. If IONOS DNSSEC has a DS at the registrar, plan its removal or replacement for Cloudflare's keys before changing nameservers; validate DNSSEC resolution afterward. Do not copy an old DS to new nameservers.
3. Merge the reviewed migration branch only after GitHub CI and Cloudflare branch preview pass. Cloudflare then builds `main` automatically. Verify the Pages production `*.pages.dev` deployment SHA, routes, and 404 before routing the public domain to it.
4. In the Pages project, add `www.raulmermans.com` and `raulmermans.com` as custom domains. Check domain validation and HTTPS certificate status. Pages creates the required CNAMEs for an active Cloudflare zone. Review any CAA restrictions before certificate issuance.
5. Configure a Cloudflare zone [Single Redirect](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-root-to-www/) from `https://raulmermans.com/*` to `https://www.raulmermans.com/${1}` with 301 and **Preserve query string** enabled. Add the equivalent rule for `http://raulmermans.com/*`, and ensure HTTP `www` upgrades to HTTPS. Ensure the apex DNS record is proxied; redirect rules need proxied traffic. Validate both rules in the dashboard preview and avoid a redirect chain. Do not redirect `www` back to the apex. Leave `/es/*` handling to `_redirects` on Pages.
6. Obtain explicit approval for the production DNS change. At IONOS, change **nameservers only** to the Cloudflare-assigned pair. Keep domain registration, email, and hosting active during observation. Verify delegation from multiple resolvers, A and AAAA answers, DNSSEC validation, both HTTPS certificates, `www` content, apex 301, language routes, 404, mail MX/SPF/DKIM, and production fingerprint. Watch for 24–48 hours before considering cost changes.
7. After the custom domain is healthy, use Cloudflare's [Pages `pages.dev` redirect procedure](https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/) for the **production project hostname only**, preserving paths and queries. Keep `staging.<project>.pages.dev` and other preview subdomains accessible with their automatic `noindex` header. Check that the production `pages.dev` URL redirects once to `www`.

Do not rely on a nominal TTL alone for the nameserver transition; parent delegation and resolver caches may persist longer. Cloudflare DNS records may flatten CNAMEs to A/AAAA responses, so compare the target service and HTTPS behavior rather than expecting a literal CNAME in every answer.

## Rollback

Before nameserver cutover, leave the domain on IONOS if Pages fails; the live site is unaffected. After cutover, keep the IONOS hosting account and last good deployment ready. If Pages or DNS fails, restore the original IONOS nameservers in IONOS, restore the saved zone and web A/AAAA records if needed, and verify the old site and mail from independent resolvers. Account for propagation time. If only a Pages release is faulty while DNS is healthy, use the Pages [deployment rollback](https://developers.cloudflare.com/pages/configuration/rollbacks/) to return to a verified deployment, then recheck critical routes. Do not cancel IONOS hosting until this rollback path is no longer needed.

## Cost reduction after a stable cutover

Cloudflare Pages Free hosting is expected to be €0/month within its limits; domain renewal remains at IONOS. IONOS email service and any other domain-dependent products may still cost money. Actual charges and contract dependencies require the IONOS invoice and product list; no current spend is assumed.

After at least 24–48 hours of healthy site and mail service, review each IONOS line item: keep domain registration; retain email hosting if mailboxes, forwarding, or autodiscover rely on it; consider cancelling web hosting only if its cancellation cannot affect the domain, DNS management, mail, or bundled discounts; review separate SSL, site-builder, backup, and add-on products individually. Do not cancel or downgrade anything without explicit approval and verified billing consequences.
