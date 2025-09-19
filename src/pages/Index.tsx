import Header from "@/components/Header";
import TradingDashboard from "@/components/TradingDashboard";
import ContractInteraction from "@/components/ContractInteraction";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dashboard">Trading Dashboard</TabsTrigger>
            <TabsTrigger value="contract">Contract Interaction</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard" className="mt-6">
            <TradingDashboard />
          </TabsContent>
          <TabsContent value="contract" className="mt-6">
            <ContractInteraction />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
