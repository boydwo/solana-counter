# Counter — Solana / Anchor

A simple Anchor program implementing an on-chain counter with two instructions:

- `initialize` — creates the counter account and sets it to `0`
- `increment` — adds 1 to the counter (`count += 1`)

Built for the **Solana Zero to Hero #2: On-chain na Prática** workshop (Web3Experts).

## Devnet deployment

| | |
|---|---|
| **Program ID** | `AUvbVmnsL3eR8Da4JVEbMHTWeQivJ7EeSGcxpLhSJ6UF` |
| **Cluster** | devnet |
| **Authority** | `6to56PxGbT9YPKd8gFF7DVinMsHcRHkxbxERMfbvGFcB` |

- Program on Explorer: <https://explorer.solana.com/address/AUvbVmnsL3eR8Da4JVEbMHTWeQivJ7EeSGcxpLhSJ6UF?cluster=devnet>
- `initialize` transaction: <https://explorer.solana.com/tx/3pdCqa4VhuTog4A2m4i7wvjfJpueB9Z6trkw3fAdUgS7nU8sR4YRUS1y6JY7KdiYesyNyWvqgEaQPW8yaoPqWAiy?cluster=devnet>
- `increment` transaction: <https://explorer.solana.com/tx/5uLZnFKaz6TTpavJEnW3EJfrTaGQ7kPD5y7mwcBAuKfUwwnBCDcNzh5FdxGSn3VAN6eFF6hC1G6UUbwUw5yvp8e1?cluster=devnet>

## Layout

```text
programs/counter/src/lib.rs   # the program (initialize + increment)
tests/counter.ts              # test for the initialize -> increment flow
app/interact.ts               # script that calls the program on devnet
target/idl/counter.json       # IDL used by the client
```

## Running

Requirements: Rust, Solana CLI and Anchor 0.30.1.

```bash
# build
anchor build

# tests (local validator)
anchor test

# interact with the program already deployed on devnet
ANCHOR_PROVIDER_URL=https://api.devnet.solana.com \
ANCHOR_WALLET=~/.config/solana/id.json \
yarn ts-node app/interact.ts
```

The test covers the flow: `initialize` leaves the counter at `0`, and `increment` takes it to `1`.
