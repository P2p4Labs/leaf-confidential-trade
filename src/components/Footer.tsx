import { Zap, Wind, Leaf } from "lucide-react";
import windTurbines from "@/assets/wind-turbines.png";

const Footer = () => {
  return (
    <footer className="relative mt-16 overflow-hidden">
      {/* Wind Turbines Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${windTurbines})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Animated Wind Turbines */}
      <div className="absolute inset-0 flex justify-center items-center space-x-16 opacity-60">
        <Wind className="w-12 h-12 text-primary wind-turbine" />
        <Wind className="w-16 h-16 text-accent wind-turbine" style={{ animationDelay: '1s' }} />
        <Wind className="w-12 h-12 text-primary wind-turbine" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative bg-gradient-to-t from-card/90 to-transparent border-t border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary flex items-center space-x-2">
                <Leaf className="w-5 h-5 floating-leaf" />
                <span>Sustainable Trading</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                Revolutionizing carbon credit markets through encrypted, 
                verifiable, and transparent trading mechanisms.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-accent flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Technology</span>
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Encrypted Trade Validation</li>
                <li>Decentralized Verifier Network</li>
                <li>Real-time Impact Tracking</li>
                <li>Wallet Integration</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Impact</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CO₂ Offset:</span>
                  <span className="font-semibold text-primary">1.2M tons</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Projects:</span>
                  <span className="font-semibold text-accent">247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Global Reach:</span>
                  <span className="font-semibold text-primary">67 countries</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Sustainable Confidential Trading. Powered by renewable energy.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;