import Header from "@/components/Header";
import TradingDashboard from "@/components/TradingDashboard";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TradingDashboard />
      <Footer />
    </div>
  );
};

export default Index;
