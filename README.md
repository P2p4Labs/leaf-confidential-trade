# 🌿 Leaf Confidential Trade

> **Next-Generation FHE Trading Platform**  
> *Where Privacy Meets Performance*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

## 🚀 Overview

Leaf Confidential Trade is a cutting-edge trading platform that leverages **Fully Homomorphic Encryption (FHE)** to ensure complete privacy in financial transactions. Built on modern web technologies, it provides a secure, scalable, and user-friendly environment for confidential trading operations.

### ✨ Key Features

- **🔐 FHE Encryption**: All sensitive data encrypted using Zama's fhevm
- **🌐 Multi-Wallet Support**: Rainbow, MetaMask, WalletConnect integration
- **⚡ Real-time Trading**: Live order book and market data
- **🛡️ Privacy-First**: Zero-knowledge trading operations
- **📱 Responsive Design**: Optimized for all devices
- **🔗 Blockchain Integration**: Ethereum Sepolia testnet support

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Smart         │    │   FHE           │
│   (React/Vite)  │◄──►│   Contracts     │◄──►│   Encryption    │
│                 │    │   (Solidity)    │    │   (Zama)        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Wallet        │    │   Order Book    │    │   Privacy       │
│   Integration   │    │   Management    │    │   Protection    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query

### Blockchain
- **Network**: Ethereum Sepolia Testnet
- **Wallet Integration**: RainbowKit + Wagmi + Viem
- **Encryption**: FHE via Zama's fhevm
- **Smart Contracts**: Solidity ^0.8.24

### Development
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Version Control**: Git

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/P2p4Labs/leaf-confidential-trade.git
   cd leaf-confidential-trade
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:8080
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
# Network Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID

# Optional: Custom RPC
VITE_RPC_URL=https://1rpc.io/sepolia
```

### Wallet Setup

The platform supports multiple wallet providers:
- **Rainbow Wallet**: Mobile-first crypto wallet
- **MetaMask**: Browser extension wallet
- **WalletConnect**: Universal wallet connector

## 📁 Project Structure

```
leaf-confidential-trade/
├── 📁 contracts/              # Smart contracts
│   └── LeafConfidentialTrade.sol
├── 📁 src/
│   ├── 📁 components/          # React components
│   │   ├── 📁 ui/             # shadcn/ui components
│   │   ├── Header.tsx         # Main header
│   │   ├── TradingDashboard.tsx
│   │   └── TradeDialog.tsx
│   ├── 📁 lib/                # Utilities
│   │   ├── wallet.ts          # Wallet configuration
│   │   └── utils.ts           # Helper functions
│   ├── 📁 hooks/              # Custom hooks
│   └── 📁 assets/             # Static assets
├── 📄 package.json            # Dependencies
├── 📄 vite.config.ts          # Vite configuration
└── 📄 tailwind.config.ts      # Tailwind CSS config
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Testing
npm run test         # Run tests (when implemented)
```

### Code Quality

- **ESLint**: Code linting and formatting
- **TypeScript**: Type safety and IntelliSense
- **Prettier**: Code formatting (recommended)
- **Husky**: Git hooks (optional)

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Import project from GitHub
   - Configure build settings

2. **Set Environment Variables**
   - Add all required environment variables
   - Configure network settings

3. **Deploy**
   - Automatic deployment on push
   - Manual deployment available

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to your hosting provider
# Upload the 'dist' folder
```

## 🔐 Security Features

- **FHE Encryption**: All trading data encrypted
- **Zero-Knowledge**: No sensitive data exposure
- **Wallet Security**: Multiple provider support
- **Network Security**: Testnet for safe development
- **Code Security**: No direct transfer functions

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Add tests if applicable**
5. **Submit a pull request**

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Zama**: FHE encryption technology
- **Rainbow**: Wallet integration
- **Vercel**: Deployment platform
- **shadcn/ui**: UI component library

## 📞 Support

- **Documentation**: Check the docs folder
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions

---

**Built with ❤️ by the P2p4Labs team**

*Empowering the future of confidential trading*