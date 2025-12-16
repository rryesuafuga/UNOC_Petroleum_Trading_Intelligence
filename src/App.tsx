import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import SupplyDemandModule from './components/SupplyDemandModule';
import PriceOptimizer from './components/PriceOptimizer';
import OMCPortfolio from './components/OMCPortfolio';
import ProcessAutomation from './components/ProcessAutomation';
import TradingAnalytics from './components/TradingAnalytics';
import MarketIntelligence from './components/MarketIntelligence';
import StakeholderManagement from './components/StakeholderManagement';
import VesselTracking from './components/VesselTracking';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [liveData, setLiveData] = useState({
    currentPrice: 4285,
    vesselCount: 3,
    stockLevel: 78,
    omcCount: 47
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData((prev: any) => ({
        currentPrice: prev.currentPrice + (Math.random() - 0.5) * 10,
        vesselCount: Math.max(1, prev.vesselCount + Math.floor(Math.random() * 3 - 1)),
        stockLevel: Math.min(100, Math.max(20, prev.stockLevel + (Math.random() - 0.5) * 5)),
        omcCount: prev.omcCount
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const renderView = () => {
    switch(currentView) {
      case 'landing':
        return <LandingPage setView={setCurrentView} liveData={liveData} />;
      case 'dashboard':
        return <Dashboard setView={setCurrentView} liveData={liveData} />;
      case 'supply':
        return <SupplyDemandModule setView={setCurrentView} liveData={liveData} />;
      case 'pricing':
        return <PriceOptimizer setView={setCurrentView} liveData={liveData} />;
      case 'portfolio':
        return <OMCPortfolio setView={setCurrentView} liveData={liveData} />;
      case 'automation':
        return <ProcessAutomation setView={setCurrentView} liveData={liveData} />;
      case 'analytics':
        return <TradingAnalytics setView={setCurrentView} />;
      case 'market':
        return <MarketIntelligence setView={setCurrentView} />;
      case 'stakeholders':
        return <StakeholderManagement setView={setCurrentView} />;
      case 'vessels':
        return <VesselTracking setView={setCurrentView} />;
      default:
        return <LandingPage setView={setCurrentView} liveData={liveData} />;
    }
  };

  return (
    <div className="App">
      {renderView()}
    </div>
  );
}

export default App;
