import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Lock, Database, Zap, TrendingUp } from "lucide-react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';

// Contract ABI for LeafConfidentialTrade
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "uint32", "name": "amount", "type": "uint32"},
      {"internalType": "uint32", "name": "price", "type": "uint32"},
      {"internalType": "uint8", "name": "tradeType", "type": "uint8"},
      {"internalType": "string", "name": "assetSymbol", "type": "string"}
    ],
    "name": "createTrade",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tradeId", "type": "uint256"}],
    "name": "executeTrade",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

const CONTRACT_ADDRESS = "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"; // Replace with actual deployed contract

interface TradeFormData {
  amount: string;
  price: string;
  tradeType: string;
  assetSymbol: string;
}

const ContractInteraction = () => {
  const { address, isConnected } = useAccount();
  const [formData, setFormData] = useState<TradeFormData>({
    amount: '',
    price: '',
    tradeType: '',
    assetSymbol: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const { writeContract, data: hash, error, isPending } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleInputChange = (field: keyof TradeFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateTrade = async () => {
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    if (!formData.amount || !formData.price || !formData.tradeType || !formData.assetSymbol) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'createTrade',
        args: [
          BigInt(formData.amount),
          BigInt(formData.price),
          parseInt(formData.tradeType),
          formData.assetSymbol
        ],
      });
    } catch (err) {
      console.error('Error creating trade:', err);
      alert('Failed to create trade. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExecuteTrade = async (tradeId: string) => {
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    setIsLoading(true);

    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'executeTrade',
        args: [BigInt(tradeId)],
      });
    } catch (err) {
      console.error('Error executing trade:', err);
      alert('Failed to execute trade. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Contract Interaction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Lock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Please connect your wallet to interact with the contract
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Create Trade Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Create Encrypted Trade
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="price">Price (ETH)</Label>
              <Input
                id="price"
                type="number"
                step="0.001"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tradeType">Trade Type</Label>
              <Select value={formData.tradeType} onValueChange={(value) => handleInputChange('tradeType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select trade type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Buy</SelectItem>
                  <SelectItem value="1">Sell</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="assetSymbol">Asset Symbol</Label>
              <Input
                id="assetSymbol"
                placeholder="e.g., LCT, ETH, BTC"
                value={formData.assetSymbol}
                onChange={(e) => handleInputChange('assetSymbol', e.target.value)}
              />
            </div>
          </div>

          <Button 
            onClick={handleCreateTrade}
            disabled={isPending || isLoading}
            className="w-full"
          >
            {isPending ? 'Creating Trade...' : 'Create Encrypted Trade'}
          </Button>

          {hash && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm">
                <strong>Transaction Hash:</strong> {hash}
              </p>
              {isConfirming && <p className="text-sm text-blue-600">Confirming transaction...</p>}
              {isSuccess && <p className="text-sm text-green-600">Transaction confirmed!</p>}
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">
                <strong>Error:</strong> {error.message}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Trade Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Trade Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label htmlFor="tradeId">Trade ID</Label>
              <Input
                id="tradeId"
                placeholder="Enter trade ID to execute"
              />
            </div>
            <Button 
              onClick={() => {
                const tradeId = (document.getElementById('tradeId') as HTMLInputElement)?.value;
                if (tradeId) handleExecuteTrade(tradeId);
              }}
              disabled={isPending || isLoading}
              variant="outline"
            >
              Execute Trade
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Lock className="w-3 h-3" />
              FHE Encrypted
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Database className="w-3 h-3" />
              On-Chain
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Real-time
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractInteraction;
