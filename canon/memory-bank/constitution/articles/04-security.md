# 04 — Security

## Sources

- `SECURITY.md` — reporting + secure PR checklist
- `audit/security-vulnerability-audit-2026-07.md` — app findings
- `audit/hardening-plan-2026-08.md` — phased fix plan
- OpenSSF Scorecard practices (branch protection, code review, secret scan)

## Rules

1. Never commit `.env*`, `gym.db`, JWT secrets, API keys.
2. Run secret scan before PR (`npm run secrets:scan` or gitleaks action in CI).
3. Public deploy: CORS allowlist, no default JWT, file workspace off unless flagged.
4. Auth changes are Tier A-adjacent: tests + manual login/save smoke; prefer short access TTL over 30d localStorage long-term.
5. `npm run audit:prod` — fail on high/critical in **production** tree; do not `audit fix --force` Expo/Electron in the same PR as auth.

## Trust boundary

Client is hostile. Server `normalize*` + authz (`req.user.name === params.name`) are mandatory; never trust client-only validation for persistence.
