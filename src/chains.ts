export interface Chain {
  id: number;
  name: string;
  short: string;
  currency: string;
  explorer: string;
  rpc: string;
}

export const CHAINS: Chain[] = [
  { id: 1, name: "Ethereum", short: "eth", currency: "ETH", explorer: "https://etherscan.io", rpc: "https://ethereum-rpc.publicnode.com" },
  { id: 10, name: "OP Mainnet", short: "op", currency: "ETH", explorer: "https://optimistic.etherscan.io", rpc: "https://mainnet.optimism.io" },
  { id: 56, name: "BNB Smart Chain", short: "bsc", currency: "BNB", explorer: "https://bscscan.com", rpc: "https://bsc-dataseed.bnbchain.org" },
  { id: 100, name: "Gnosis", short: "gno", currency: "xDAI", explorer: "https://gnosisscan.io", rpc: "https://rpc.gnosischain.com" },
  { id: 130, name: "Unichain", short: "uni", currency: "ETH", explorer: "https://uniscan.xyz", rpc: "https://mainnet.unichain.org" },
  { id: 137, name: "Polygon PoS", short: "pol", currency: "POL", explorer: "https://polygonscan.com", rpc: "https://polygon.drpc.org" },
  { id: 146, name: "Sonic", short: "sonic", currency: "S", explorer: "https://sonicscan.org", rpc: "https://rpc.soniclabs.com" },
  { id: 324, name: "ZKsync Era", short: "zksync", currency: "ETH", explorer: "https://explorer.zksync.io", rpc: "https://mainnet.era.zksync.io" },
  { id: 999, name: "HyperEVM", short: "hyperevm", currency: "HYPE", explorer: "https://hyperevmscan.io", rpc: "https://rpc.hyperliquid.xyz/evm" },
  { id: 5000, name: "Mantle", short: "mantle", currency: "MNT", explorer: "https://mantlescan.xyz", rpc: "https://rpc.mantle.xyz" },
  { id: 8453, name: "Base", short: "base", currency: "ETH", explorer: "https://basescan.org", rpc: "https://mainnet.base.org" },
  { id: 42161, name: "Arbitrum One", short: "arb", currency: "ETH", explorer: "https://arbiscan.io", rpc: "https://arb1.arbitrum.io/rpc" },
  { id: 43114, name: "Avalanche C-Chain", short: "avax", currency: "AVAX", explorer: "https://snowtrace.io", rpc: "https://api.avax.network/ext/bc/C/rpc" },
  { id: 59144, name: "Linea", short: "linea", currency: "ETH", explorer: "https://lineascan.build", rpc: "https://rpc.linea.build" },
  { id: 80094, name: "Berachain", short: "bera", currency: "BERA", explorer: "https://berascan.com", rpc: "https://rpc.berachain.com" },
  { id: 81457, name: "Blast", short: "blast", currency: "ETH", explorer: "https://blastscan.io", rpc: "https://rpc.blast.io" },
  { id: 534352, name: "Scroll", short: "scroll", currency: "ETH", explorer: "https://scrollscan.com", rpc: "https://rpc.scroll.io" },
  { id: 11155111, name: "Sepolia", short: "sep", currency: "ETH", explorer: "https://sepolia.etherscan.io", rpc: "https://ethereum-sepolia-rpc.publicnode.com" },
];

export function find(query: string): Chain[] {
  const q = query.trim().toLowerCase();
  const asNum = q.startsWith("0x") ? parseInt(q, 16) : Number(q);
  if (Number.isInteger(asNum) && asNum > 0) return CHAINS.filter((c) => c.id === asNum);
  return CHAINS.filter((c) => c.name.toLowerCase().includes(q) || c.short === q);
}
