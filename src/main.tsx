import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/toaster";
import App from "./App.tsx";
import "./index.css";
import '@rainbow-me/rainbowkit/styles.css';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from './lib/wallet';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <App />
        <Toaster />
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);
