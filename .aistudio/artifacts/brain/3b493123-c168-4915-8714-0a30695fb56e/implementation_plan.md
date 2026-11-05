# Web3Forms Live Email Dispatch Integration (`peacerifat2005@gmail.com`)

## Overview
Replace the unactivated FormSubmit relay with **Web3Forms (`https://api.web3forms.com/submit`)** using your verified Access Key (`cebe92a8-f264-4825-a74d-e963537163cc`) so every project brief submission arrives automatically in **`peacerifat2005@gmail.com`** with zero client friction.

## Key Changes

### 1. Direct Web3Forms Submission in `InquiryModal` (`/src/components/Modals.tsx`)
- Configure `WEB3FORMS_ACCESS_KEY = 'cebe92a8-f264-4825-a74d-e963537163cc'`.
- When a client clicks **SEND DISPATCH ↗**:
  - Send a `POST` request to `https://api.web3forms.com/submit` with:
    - `access_key`: `'cebe92a8-f264-4825-a74d-e963537163cc'`
    - `subject`: `Vixa Corp Project Dispatch — [Selected Discipline] ([Client Name])`
    - `from_name`: `'Vixa Corp Portfolio Dispatch'`
    - `name`: client's name
    - `email`: client's email (sets `Reply-To` automatically so you can hit Reply in Gmail)
    - `discipline`: selected primary discipline
    - `message`: project goals & timeline
  - Also log the dispatch to `/api/dispatch` on the local server as a backup ledger (`dispatches.json`), and if a client's browser has a strict adblocker blocking direct calls to `api.web3forms.com`, `/api/dispatch` automatically relays the payload to `https://api.web3forms.com/submit` from the server.
- Remove the old FormSubmit hidden iframe and activation warning banner.

### 2. Server-Side Web3Forms Backup Relay (`/server.ts`)
- Update `POST /api/dispatch` in `/server.ts` to use `https://api.web3forms.com/submit` with `access_key: 'cebe92a8-f264-4825-a74d-e963537163cc'` whenever the client delegates delivery to the server, while persisting a local backup copy in `dispatches.json`.
