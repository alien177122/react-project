# Security Policy

## Supported Versions

| Version   | Supported          |
| --------- | ------------------ |
| `latest`  | :white_check_mark: |
| `< 1.0.0` | :x:                |

## Reporting a Vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

1. Email the maintainer via GitHub profile contact or open a **private security advisory** on the repository.
2. Include steps to reproduce, impact, and affected endpoints (API, auth, file workspace).
3. Expect an acknowledgment within **48 hours**.
4. Coordinated disclosure after a fix is available.

## Scope

- REST API (`server/`) — auth, JWT, rate limits, SQLite access
- File workspace uploads and paths
- Client-side token storage (web PWA, mobile shells)
- CORS and deployment misconfiguration

## Out of Scope

- Third-party hosting (Vercel, Cloudflare) configuration outside this repository
- Social engineering, physical access, denial-of-service at network edge

## Secure Development

Before opening a pull request:

```bash
npm run secrets:scan          # or: bunx gitleaks detect --source . --verbose
npm run quality:quick         # typecheck + unit (Uncle Bob tier B)
npm run audit:prod:critical   # fail only on critical in production tree
# Tier A domain: npm run quality
```

Auth interim (Phase 2): access JWT default **24h** (`JWT_EXPIRES_IN`); logout bumps `token_version` (server revoke). Existing tokens without `tv` need re-login once.

Never commit `.env*`, `gym.db`, API keys, or JWT secrets.

Phased hardening plan: `audit/hardening-plan-2026-08.md`  
Constitution articles: `memory-bank/constitution/articles/`
