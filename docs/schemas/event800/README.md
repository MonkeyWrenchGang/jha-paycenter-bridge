# Event 800 Schema Examples

This folder contains example JSON payloads for Event 800 (Payment Hub Activity Notifications) per rail type and payment status.

> ⚠️ **These are draft examples** based on the Early Warning Services (EWS) Zelle API and ISO 20022 messaging standards. Field names, enums, and structure **must be validated** against the official JH PayCenter EES documentation once access is provisioned. See [Appendix A](../../docs/JHA_PayCenter_Bridge_Design_Document.docx) for the list of open questions for the JH integration team.

## Zelle Schemas

| File | Status | Description |
|------|--------|-------------|
| [`zelle_completed.json`](zelle_completed.json) | `COMPLETED` | Successful P2P send, settled by EWS |
| [`zelle_failed.json`](zelle_failed.json) | `FAILED` | Rejected by EWS – closed account (`AC04`) |
| [`zelle_returned.json`](zelle_returned.json) | `RETURNED` | Return of a prior transaction – wrong amount (`AM09`) |

## RTP Schemas

*Pending JH integration team response — see Appendix A Q1–Q5*

## FedNow Schemas

*Pending JH integration team response — see Appendix A Q1–Q5*

## PII Stripping Policy

The bridge service strips the following fields before publishing to Pub/Sub. These fields are present in the raw JH EES event but must never be forwarded to downstream consumers.

| Field | Reason |
|-------|--------|
| `tokenValue` | PII — contains the sender/receiver phone number or email address, even when masked |
| `displayName` | PII — contains a person's name |
| `memo` | PII — free-text field that may contain account numbers, names, or other sensitive content |

`tokenType` is retained (it indicates `EMAIL` or `PHONE`) as it carries no PII on its own and is useful for routing logic. `accountToken` is retained as it is an opaque, institution-scoped reference with no meaning outside JH's systems.

This stripping logic should be implemented in the bridge's payload sanitiser before the Pub/Sub publish step and covered by unit tests.

## Key Zelle-Specific Fields

| Field | Retained? | Description |
|-------|-----------|-------------|
| `zelleTransactionId` | ✅ | Zelle network transaction ID (ZL- prefix) |
| `ewsTransactionId` | ✅ | Early Warning Services internal transaction ID |
| `accountToken` | ✅ | Opaque institution-scoped account reference — safe to pass downstream |
| `tokenType` | ✅ | How the receiver was addressed: `EMAIL` or `PHONE` — no PII |
| `tokenValue` | ❌ Stripped | Phone number or email address — PII, must not leave the bridge |
| `displayName` | ❌ Stripped | Person's name — PII, must not leave the bridge |
| `memo` | ❌ Stripped | Free-text memo — may contain PII or sensitive content |
| `fraudIndicators.riskScore` | ✅ | EWS Financial Crimes Defender risk score (0–100) |
| `fraudIndicators.riskBand` | ✅ | Risk band: `LOW`, `MEDIUM`, `HIGH` |
| `fraudIndicators.fdcFlags` | ✅ | Array of Financial Crimes Defender flag codes, if any |
| `returnReasonCode` | ✅ | ISO 20022 reason code on `FAILED` or `RETURNED` events |

## Common Return Reason Codes

| Code | Meaning |
|------|---------|
| `AC04` | Closed account number |
| `AC06` | Blocked account |
| `AM09` | Wrong amount |
| `DUPL` | Duplicate payment |
| `FRAD` | Fraudulent origin |
| `NOAS` | No answer from customer |
| `RUTA` | Incorrect routing |
