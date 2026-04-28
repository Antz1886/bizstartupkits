# Firebase Security Specification - AutoMind

## Data Invariants
1. Leads can be created by anyone (public write) but MUST follow a strict schema.
2. Leads are immutable after creation - they can only be read by admins.
3. No one can read leads without being in the `admins` collection.
4. Admin IDs must match their `auth.uid`.
5. Creation of a lead requires a server timestamp for `createdAt`.
6. Email addresses must be strings and size-limited.

## The Dirty Dozen (Potential Attack Payloads)
| # | Attack Type | Payload Description | Expected Result |
|---|-------------|---------------------|-----------------|
| 1 | Identity Spoofing | Public user trying to read `/leads/123`. | `PERMISSION_DENIED` |
| 2 | Shadow Writing | Adding `status: 'qualified'` on initial create. | `PERMISSION_DENIED` (if schema enforces 'new') |
| 3 | Admin Escalation | Public user trying to write to `/admins/me`. | `PERMISSION_DENIED` |
| 4 | Data Poisoning | `name` string > 2KB. | `PERMISSION_DENIED` |
| 5 | Update Gap | Modifying a lead's `email` after submission. | `PERMISSION_DENIED` |
| 6 | Ghost Fields | Adding `source: 'internal-leak'` to a lead. | `PERMISSION_DENIED` |
| 7 | ID Poisoning | Document ID as a 2KB junk string. | `PERMISSION_DENIED` |
| 8 | Timestamp Spoofing | Setting `createdAt` to a date in 2030. | `PERMISSION_DENIED` |
| 9 | List Scraping | Authenticated user running `getDocs(collection('leads'))`. | `PERMISSION_DENIED` |
| 10 | Delete Attempt | Public user trying to delete a lead. | `PERMISSION_DENIED` |
| 11 | Malformed Enum | `type: 'Free Money'` (not in enum). | `PERMISSION_DENIED` |
| 12 | PII Leak | Public user trying to query `/leads` where `email == 'user@test.com'`. | `PERMISSION_DENIED` |

## Security Rules Implementation Strategy
- Root catch-all deny.
- `isValidLead()` helper for creation.
- Only allow `create` on `/leads`.
- Only allow `get`, `list` on `/leads` if `isAdmin()`.
- `isAdmin()` checks if `exists(/databases/$(database)/documents/admins/$(request.auth.uid))`.
