import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  Area, Scatter
} from 'recharts';
import { 
  DollarSign, TrendingUp, Globe, AlertTriangle,
  ChevronLeft, Download, Filter, Activity
} from 'lucide-react';
import './PriceOptimizer.css';

interface PriceOptimizerProps {
  setView: (view: string) => void;
  liveData: any;
}

const PriceOptimizer: React.FC<PriceOptimizerProps> = ({ setView, liveData }) => {
  const [selectedMarket, setSelectedMarket] = useState('all');
  const [timeRange, setTimeRange] = useState('month');

  // Regional price data
  const regionalPrices = [
    { date: 'Dec 1', uganda: 4150, kenya: 4220, tanzania: 4180, rwanda: 4280, platts: 3850 },
    { date: 'Dec 5', uganda: 4180, kenya: 4250, tanzania: 4200, rwanda: 4300, platts: 3880 },
    { date: 'Dec 10', uganda: 4220, kenya: 4280, tanzania: 4240, rwanda: 4350, platts: 3920 },
    { date: 'Dec 15', uganda: 4285, kenya: 4350, tanzania: 4320, rwanda: 4400, platts: 3980 }
  ];

  const landingCosts = [
    { component: 'FOB Platts', value: 3980, percentage: 70 },
    { component: 'Freight', value: 220, percentage: 4 },
    { component: 'Insurance', value: 45, percentage: 1 },
    { component: 'Pipeline Tariff', value: 380, percentage: 7 },
    { component: 'Storage', value: 120, percentage: 2 },
    { component: 'Taxes & Duties', value: 680, percentage: 12 },
    { component: 'Margin', value: 225, percentage: 4 }
  ];

  const marginAnalysis = [
    { product: 'PMS', current: 225, optimal: 280, potential: 55 },
    { product: 'AGO', current: 210, optimal: 265, potential: 55 },
    { product: 'JET A-1', current: 195, optimal: 240, potential: 45 }
  ];

  const priceVolatility = [
    { month: 'Aug', volatility: 2.8, events: 'Stable' },
    { month: 'Sep', volatility: 4.2, events: 'OPEC Cut' },
    { month: 'Oct', volatility: 3.5, events: 'Normal' },
    { month: 'Nov', volatility: 5.8, events: 'Conflict' },
    { month: 'Dec', volatility: 3.2, events: 'Stabilizing' }
  ];

  const competitorAnalysis = [
    { omc: 'Total', price: 4350, volume: 35, margin: 3.2 },
    { omc: 'Shell', price: 4355, volume: 28, margin: 3.3 },
    { omc: 'UNOC', price: 4285, volume: 25, margin: 2.8 },
    { omc: 'Stabex', price: 4320, volume: 18, margin: 3.0 },
    { omc: 'Others', price: 4340, volume: 14, margin: 3.1 }
  ];

  const calculateLandedCost = () => {
    return landingCosts.reduce((sum, item) => sum + item.value, 0);
  };

  return (
    <div className="module-container price-optimizer">
      {/* Header */}
      <div className="module-header">
        <div className="header-left">
          <button className="back-button" onClick={() => setView('dashboard')}>
            <ChevronLeft /> Back to Dashboard
          </button>
          <h1>Price Intelligence & Optimization</h1>
        </div>
        <div className="header-actions">
          <select 
            value={selectedMarket} 
            onChange={(e) => setSelectedMarket(e.target.value)}
            className="market-selector"
          >
            <option value="all">All Markets</option>
            <option value="uganda">Uganda</option>
            <option value="kenya">Kenya</option>
            <option value="tanzania">Tanzania</option>
          </select>
          <button className="action-button">
            <Filter /> Filters
          </button>
          <button className="action-button">
            <Download /> Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-row">
        <div className="metric-card">
          <div className="metric-icon">
            <DollarSign />
          </div>
          <div className="metric-content">
            <span className="metric-label">Current PMS Price</span>
            <span className="metric-value">UGX {liveData.currentPrice}</span>
            <span className="metric-change">Kampala Retail</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">
            <Globe />
          </div>
          <div className="metric-content">
            <span className="metric-label">Platts FOB</span>
            <span className="metric-value">$94.52/bbl</span>
            <span className="metric-change positive">+$0.85 today</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">
            <TrendingUp />
          </div>
          <div className="metric-content">
            <span className="metric-label">Margin Opportunity</span>
            <span className="metric-value">+UGX 55/L</span>
            <span className="metric-change">24% improvement possible</span>
          </div>
        </div>
        <div className="metric-card success">
          <div className="metric-icon">
            <Activity />
          </div>
          <div className="metric-content">
            <span className="metric-label">Price Position</span>
            <span className="metric-value">Competitive</span>
            <span className="metric-change">Best in region</span>
          </div>
        </div>
      </div>

      {/* Regional Price Comparison */}
      <div className="chart-panel">
        <h3>Regional Price Trends (UGX/Liter)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={regionalPrices}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="uganda" stroke="#3B82F6" strokeWidth={3} />
            <Line type="monotone" dataKey="kenya" stroke="#10B981" strokeWidth={2} />
            <Line type="monotone" dataKey="tanzania" stroke="#F59E0B" strokeWidth={2} />
            <Line type="monotone" dataKey="rwanda" stroke="#8B5CF6" strokeWidth={2} />
            <Line type="monotone" dataKey="platts" stroke="#6B7280" strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Landing Cost Breakdown */}
      <div className="charts-row">
        <div className="chart-panel half">
          <h3>Landing Cost Build-Up (UGX/Liter)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={landingCosts} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="component" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
          <div className="cost-summary">
            <div className="summary-item">
              <span>Total Landed Cost:</span>
              <span className="value">UGX {calculateLandedCost()}/L</span>
            </div>
            <div className="summary-item">
              <span>Current Selling Price:</span>
              <span className="value">UGX {liveData.currentPrice}/L</span>
            </div>
            <div className="summary-item highlight">
              <span>Gross Margin:</span>
              <span className="value">UGX {liveData.currentPrice - calculateLandedCost()}/L</span>
            </div>
          </div>
        </div>

        <div className="chart-panel half">
          <h3>Margin Optimization Potential</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={marginAnalysis}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="current" fill="#6B7280" name="Current Margin" />
              <Bar dataKey="optimal" fill="#10B981" name="Optimal Margin" />
            </BarChart>
          </ResponsiveContainer>
          <div className="optimization-tips">
            <h4>Optimization Recommendations:</h4>
            <ul>
              <li>Increase PMS margin by UGX 55/L during peak hours</li>
              <li>Dynamic pricing for AGO based on demand</li>
              <li>Lock in forward contracts when Platts &lt; $92/bbl</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Price Volatility & Competitor Analysis */}
      <div className="charts-row">
        <div className="chart-panel half">
          <h3>Price Volatility Index</h3>
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={priceVolatility}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="volatility" fill="#F59E0B" />
              <Line type="monotone" dataKey="volatility" stroke="#EF4444" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-panel half">
          <h3>Competitor Price Analysis</h3>
          <div className="competitor-table">
            <table>
              <thead>
                <tr>
                  <th>OMC</th>
                  <th>Price (UGX)</th>
                  <th>Volume Share</th>
                  <th>Margin %</th>
                </tr>
              </thead>
              <tbody>
                {competitorAnalysis.map((comp, index) => (
                  <tr key={index} className={comp.omc === 'UNOC' ? 'highlight' : ''}>
                    <td>{comp.omc}</td>
                    <td>{comp.price.toLocaleString()}</td>
                    <td>{comp.volume}%</td>
                    <td>{comp.margin}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="recommendations-panel">
        <h3>AI-Powered Price Recommendations</h3>
        <div className="recommendations-grid">
          <div className="recommendation-card">
            <div className="rec-header">
              <AlertTriangle className="rec-icon warning" />
              <span className="rec-type">Immediate Action</span>
            </div>
            <p className="rec-content">
              Kenya prices increased by 70 UGX yesterday. Consider 2% margin adjustment 
              to maintain competitiveness while capturing value.
            </p>
            <div className="rec-impact">
              <span>Potential Impact:</span>
              <span className="value">+UGX 2.8M daily revenue</span>
            </div>
          </div>

          <div className="recommendation-card">
            <div className="rec-header">
              <TrendingUp className="rec-icon success" />
              <span className="rec-type">Opportunity</span>
            </div>
            <p className="rec-content">
              Platts forecast shows 3% decline next week. Lock in forward contracts 
              now for January delivery.
            </p>
            <div className="rec-impact">
              <span>Potential Savings:</span>
              <span className="value">UGX 450M on 10M liters</span>
            </div>
          </div>

          <div className="recommendation-card">
            <div className="rec-header">
              <Activity className="rec-icon info" />
              <span className="rec-type">Market Intelligence</span>
            </div>
            <p className="rec-content">
              Sentiment analysis indicates 78% probability of OPEC production cut 
              announcement. Prepare for 5-8% price increase.
            </p>
            <div className="rec-impact">
              <span>Risk Exposure:</span>
              <span className="value">UGX 1.2B if unhedged</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceOptimizer;
