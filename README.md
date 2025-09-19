# Leaf Confidential Trade

A confidential trading platform built with React, TypeScript, and FHE (Fully Homomorphic Encryption) technology.

## Features

- **Confidential Trading**: Secure and private trading operations using FHE encryption
- **Real-time Monitoring**: Live dashboard for tracking trading activities
- **Wallet Integration**: Support for multiple wallet providers including Rainbow, MetaMask, and WalletConnect
- **FHE-Protected Data**: All sensitive trading data is encrypted using fully homomorphic encryption
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Radix UI, Tailwind CSS
- **Wallet Integration**: RainbowKit, Wagmi, Viem
- **Blockchain**: Ethereum (Sepolia testnet)
- **Encryption**: FHE (Fully Homomorphic Encryption) via Zama's fhevm

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/P2p4Labs/leaf-confidential-trade.git
cd leaf-confidential-trade
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

## Environment Variables

Create a `.env` file with the following variables:

```env
# Network Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Infura Configuration
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Main header component
│   ├── Footer.tsx      # Footer component
│   ├── TradingDashboard.tsx
│   ├── TradeDialog.tsx
│   └── MonitorDialog.tsx
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── assets/             # Static assets
```

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details