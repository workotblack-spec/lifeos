# G-Fondation — Security Baseline

## Scope
- Public Next.js frontend today.
- User data and authentication will use Supabase only after the database project is healthy.
- Switzerland-first privacy posture.

## Rules
- Never commit secrets or service-role/secret Supabase keys.
- Browser code may only use the Supabase publishable key with RLS protecting user data.
- Server authorization must validate Supabase claims; never trust `getSession()` data for authorization.
- Every user-owned table must enable Row Level Security with least-privilege policies.
- Keep sensitive health/financial data out of the MVP unless the product need and compliance controls are defined.
- Treat all client input as untrusted and validate before persistence.

## Current state
- Supabase security advisor: no notices returned.
- Supabase performance advisor: no notices returned.
- Database connectivity could not be fully verified because the current project connection timed out.
- No Supabase schema changes have been applied by this task.
