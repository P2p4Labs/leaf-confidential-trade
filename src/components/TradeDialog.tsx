import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, Lock, Wallet } from "lucide-react";

interface TradeDialogProps {
  credit: {
    id: string;
    project: string;
    credits: number;
    price: number;
    status: string;
  };
  children: React.ReactNode;
}

const TradeDialog = ({ credit, children }: TradeDialogProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const totalPrice = quantity * credit.price;

  const handleTrade = () => {
    toast({
      title: "Trade Executed Successfully",
      description: `Purchased ${quantity} CCT from ${credit.project} for $${totalPrice.toFixed(2)}`,
    });
    setIsOpen(false);
    setQuantity(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Execute Trade</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Credit Info */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Project</span>
              <span className="text-sm text-muted-foreground">{credit.project}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Credit ID</span>
              <Badge variant="outline">{credit.id}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Available</span>
              <span className="text-sm text-muted-foreground">{credit.credits} CCT</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Price per Credit</span>
              <span className="text-sm font-semibold">${credit.price}</span>
            </div>
          </div>

          <Separator />

          {/* Trade Input */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity to Purchase</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max={credit.credits}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(credit.credits, parseInt(e.target.value) || 1)))}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="font-medium">Total Cost</span>
              <span className="text-lg font-bold text-primary">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button className="flex-1 pulse-glow" onClick={handleTrade}>
              <Wallet className="w-4 h-4 mr-2" />
              Execute Trade
            </Button>
          </div>

          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Lock className="w-3 h-3" />
            <span>Trade will be encrypted until blockchain validation</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TradeDialog;