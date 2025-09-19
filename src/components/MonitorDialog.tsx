import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Monitor, Bell, Clock, Lock, CheckCircle, AlertCircle } from "lucide-react";

interface MonitorDialogProps {
  credit: {
    id: string;
    project: string;
    credits: number;
    price: number;
    status: string;
    verifier: string;
  };
  children: React.ReactNode;
}

const MonitorDialog = ({ credit, children }: MonitorDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWatching, setIsWatching] = useState(false);
  const { toast } = useToast();

  const validationProgress = credit.status === "encrypted" ? 25 : credit.status === "pending" ? 75 : 100;

  const handleStartMonitoring = () => {
    setIsWatching(true);
    toast({
      title: "Monitoring Started",
      description: `Now watching ${credit.id} for validation updates`,
    });
  };

  const handleStopMonitoring = () => {
    setIsWatching(false);
    toast({
      title: "Monitoring Stopped",
      description: `Stopped watching ${credit.id}`,
    });
  };

  const getStatusDetails = () => {
    switch (credit.status) {
      case "encrypted":
        return {
          icon: <Lock className="w-4 h-4" />,
          message: "Credit is encrypted and awaiting initial verification",
          color: "text-muted-foreground"
        };
      case "pending":
        return {
          icon: <Clock className="w-4 h-4" />,
          message: "Under review by verifier node",
          color: "text-accent"
        };
      case "validated":
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          message: "Credit validated and ready for trading",
          color: "text-primary"
        };
      default:
        return {
          icon: <AlertCircle className="w-4 h-4" />,
          message: "Unknown status",
          color: "text-muted-foreground"
        };
    }
  };

  const statusDetails = getStatusDetails();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Monitor className="w-5 h-5 text-primary" />
            <span>Monitor Credit Status</span>
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
              <span className="text-sm font-medium">Verifier Node</span>
              <Badge variant="secondary">{credit.verifier}</Badge>
            </div>
          </div>

          <Separator />

          {/* Status Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className={`${statusDetails.color}`}>
                {statusDetails.icon}
              </span>
              <span className="text-sm font-medium">Current Status</span>
              <Badge className="capitalize">{credit.status}</Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Validation Progress</span>
                <span>{validationProgress}%</span>
              </div>
              <Progress value={validationProgress} className="h-2" />
            </div>

            <p className="text-xs text-muted-foreground">
              {statusDetails.message}
            </p>
          </div>

          <Separator />

          {/* Monitoring Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Real-time Monitoring</span>
              <Badge variant={isWatching ? "default" : "outline"}>
                {isWatching ? "Active" : "Inactive"}
              </Badge>
            </div>

            <div className="flex space-x-3">
              {!isWatching ? (
                <Button className="flex-1" onClick={handleStartMonitoring}>
                  <Bell className="w-4 h-4 mr-2" />
                  Start Monitoring
                </Button>
              ) : (
                <Button variant="outline" className="flex-1" onClick={handleStopMonitoring}>
                  <Bell className="w-4 h-4 mr-2" />
                  Stop Monitoring
                </Button>
              )}
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Lock className="w-3 h-3" />
            <span>Monitoring uses encrypted channels for privacy</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MonitorDialog;