import { Button } from "@/components/ui/button";
import { Wallet, Leaf, Lock } from "lucide-react";
import carbonLogo from "@/assets/carbon-logo.png";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const Header = () => {
  const { isConnected } = useAccount();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={carbonLogo} alt="Leaf Trade Logo" className="w-10 h-10" />
            <div>
              <h1 className="text-2xl font-bold text-gradient">
                Leaf Confidential Trade
              </h1>
              <p className="text-sm text-muted-foreground">
                Advanced FHE Trading Platform
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4 text-primary" />
              <span>Encrypted</span>
            </div>
            <ConnectButton 
              chainStatus="icon"
              accountStatus={{
                smallScreen: 'avatar',
                largeScreen: 'full',
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;