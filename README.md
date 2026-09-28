# evm-chain-directory

A local list of EVM chains with chain id, native currency, explorer and a public RPC, plus a check
that the RPCs really serve the chain they are listed for.

```bash
node src/index.ts base                 # search by name, short name or id
node src/index.ts 42161
node src/index.ts --list
node src/index.ts --check              # verify every listed RPC returns its expected chain id
node src/index.ts --check https://rpc.example.com 8453
```

The list is a TypeScript array in `src/chains.ts`, so lookups work without network access and
don't depend on a remote registry. Each entry has the chain id in decimal and hex.

`--check` calls `eth_chainId` on every RPC in parallel and reports mismatches. That catches config
mistakes such as a mainnet URL where a testnet was meant. Public endpoints also start timing out or
asking for API keys now and then (polygon-rpc.com answers 401 at the moment), and the check shows
that too.

```bash
npm test
```
