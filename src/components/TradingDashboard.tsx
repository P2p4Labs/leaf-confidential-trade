import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf, Lock, CheckCircle, Clock, TrendingUp, Globe } from "lucide-react";
import holographicLeaf from "@/assets/holographic-leaf.png";
import TradeDialog from "@/components/TradeDialog";
import MonitorDialog from "@/components/MonitorDialog";
import { useAccount } from 'wagmi';

const TradingDashboard = () => {
  const { isConnected } = useAccount();
  
  const carbonCredits = [
    {
      id: "CCT-001",
      project: "Amazon Reforestation",
      credits: 150,
      price: 25.50,
      status: "encrypted",
      verifier: "Node #47",
    },
    {
      id: "CCT-002", 
      project: "Solar Farm Mexico",
      credits: 300,
      price: 28.75,
      status: "validated",
      verifier: "Node #23",
    },
    {
      id: "CCT-003",
      project: "Wind Energy Denmark", 
      credits: 75,
      price: 31.20,
      status: "pending",
      verifier: "Node #91",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "encrypted": return <Lock className="w-4 h-4" />;
      case "validated": return <CheckCircle className="w-4 h-4" />;
      case "pending": return <Clock className="w-4 h-4" />;
      default: return <Lock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "encrypted": return "bg-muted text-muted-foreground";
      case "validated": return "bg-primary text-primary-foreground";
      case "pending": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="trading-card trading-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            <Leaf className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">525 CCT</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Price</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">$28.42</div>
            <p className="text-xs text-muted-foreground">+5.2% today</p>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trades</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Encrypted pending</p>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Global Impact</CardTitle>
            <Globe className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">1.2M</div>
            <p className="text-xs text-muted-foreground">Tons CO₂ offset</p>
          </CardContent>
        </Card>
      </div>

      {/* Trading Table */}
      <Card className="trading-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <img src={holographicLeaf} alt="" className="w-6 h-6 floating-leaf" />
            <span>Carbon Credit Marketplace</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {carbonCredits.map((credit) => (
              <div 
                key={credit.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg holographic"
              >
                <div className="flex items-center space-x-4">
                  <Badge className={getStatusColor(credit.status)}>
                    {getStatusIcon(credit.status)}
                    <span className="ml-1 capitalize">{credit.status}</span>
                  </Badge>
                  <div>
                    <p className="font-semibold">{credit.project}</p>
                    <p className="text-sm text-muted-foreground">
                      {credit.id} • Verifier: {credit.verifier}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="font-semibold">{credit.credits} CCT</p>
                    <p className="text-sm text-muted-foreground">${credit.price}/credit</p>
                  </div>
                  {credit.status === "validated" ? (
                    <TradeDialog credit={credit}>
                      <Button size="sm" className="pulse-glow">
                        Trade
                      </Button>
                    </TradeDialog>
                  ) : (
                    <MonitorDialog credit={credit}>
                      <Button size="sm" variant="outline">
                        Monitor
                      </Button>
                    </MonitorDialog>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TradingDashboard;