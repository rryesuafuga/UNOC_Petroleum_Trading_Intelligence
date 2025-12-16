import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  ChevronLeft, Globe, TrendingUp, TrendingDown, AlertTriangle,
  MapPin, Ship, Fuel, DollarSign, Clock, Bell,
  ExternalLink, RefreshCw, Filter
} from 'lucide-react';
import './MarketIntelligence.css';

interface MarketIntelligenceProps {
  setView: (view: string) => void;
}

const MarketIntelligence: React.FC<MarketIntelligenceProps> = ({ setView }) => {
  const [activeRegion, setActiveRegion] = useState('all');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulated real-time price data
  const globalPriceData = [
    { time: '06:00', brent: 81.2, wti: 77.8, platts: 83.5 },
    { time: '08:00', brent: 81.5, wti: 78.1, platts: 83.8 },
    { time: '10:00', brent: 81.8, wti: 78.4, platts: 84.1 },
    { time: '12:00', brent: 82.1, wti: 78.6, platts: 84.3 },
    { time: '14:00', brent: 81.9, wti: 78.5, platts: 84.2 },
    { time: '16:00', brent: 82.3, wti: 78.9, platts: 84.6 },
    { time: '18:00', brent: 82.5, wti: 79.1, platts: 84.8 },
  ];

  // Global supply chain status
  const supplyChainStatus = [
    {
      route: 'Persian Gulf → Mombasa',
      status: 'Normal',
      transitTime: '14 days',
      vessels: 12,
      capacity: '2.4M MT',
      risk: 'Low'
    },
    {
      route: 'Singapore → Dar es Salaam',
      status: 'Delayed',
      transitTime: '18 days',
      vessels: 8,
      capacity: '1.8M MT',
      risk: 'Medium'
    },
    {
      route: 'Rotterdam → Mombasa',
      status: 'Normal',
      transitTime: '21 days',
      vessels: 5,
      capacity: '1.2M MT',
      risk: 'Low'
    },
    {
      route: 'India → East Africa',
      status: 'High Volume',
      transitTime: '12 days',
      vessels: 15,
      capacity: '3.1M MT',
      risk: 'Low'
    }
  ];

  // Geo-political alerts
  const geoPoliticalAlerts = [
    {
      region: 'Red Sea',
      severity: 'High',
      title: 'Shipping Disruptions Continue',
      description: 'Ongoing tensions affecting transit through Suez Canal. Some vessels rerouting via Cape of Good Hope.',
      impact: 'Transit time +7-10 days, freight rates +15%',
      date: '2 hours ago'
    },
    {
      region: 'Middle East',
      severity: 'Medium',
      title: 'OPEC+ Production Discussions',
      description: 'Member countries discussing potential production adjustments for Q1 2025.',
      impact: 'Potential price volatility expected',
      date: '6 hours ago'
    },
    {
      region: 'East Africa',
      severity: 'Low',
      title: 'Kenya Pipeline Expansion',
      description: 'KPC announces capacity expansion plans for Mombasa-Nairobi corridor.',
      impact: 'Improved regional supply capacity by 2026',
      date: '1 day ago'
    }
  ];

  // Regional market data
  const regionalMarkets = [
    { country: 'Uganda', pms: 4285, ago: 4150, jet: 3980, change: +1.2, flag: '🇺🇬' },
    { country: 'Kenya', pms: 4350, ago: 4200, jet: 4020, change: +0.8, flag: '🇰🇪' },
    { country: 'Tanzania', pms: 4320, ago: 4180, jet: 4000, change: -0.3, flag: '🇹🇿' },
    { country: 'Rwanda', pms: 4400, ago: 4250, jet: 4050, change: +1.5, flag: '🇷🇼' },
    { country: 'DRC', pms: 4500, ago: 4350, jet: 4150, change: +2.1, flag: '🇨🇩' },
    { country: 'South Sudan', pms: 4650, ago: 4500, jet: 4300, change: +0.5, flag: '🇸🇸' },
  ];

  // Product specifications trends
  const specTrends = [
    { spec: 'Sulfur Content (PMS)', current: '50 ppm', trend: 'Tightening', nextChange: 'Q2 2025', compliance: 'Compliant' },
    { spec: 'Octane Rating', current: 'RON 95', trend: 'Stable', nextChange: 'N/A', compliance: 'Compliant' },
    { spec: 'Bio-blend Requirement', current: '0%', trend: 'Increasing', nextChange: 'Q3 2025', compliance: 'Monitor' },
    { spec: 'Benzene Content', current: '<1%', trend: 'Stable', nextChange: 'N/A', compliance: 'Compliant' },
  ];

  // OPEC production data
  const opecData = [
    { month: 'Jul', production: 27.8, quota: 28.0, compliance: 99.3 },
    { month: 'Aug', production: 27.6, quota: 28.0, compliance: 98.6 },
    { month: 'Sep', production: 27.9, quota: 28.0, compliance: 99.6 },
    { month: 'Oct', production: 27.7, quota: 28.0, compliance: 98.9 },
    { month: 'Nov', production: 27.5, quota: 27.5, compliance: 100.0 },
    { month: 'Dec', production: 27.4, quota: 27.5, compliance: 99.6 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="market-intelligence">
      <header className="market-header">
        <div className="header-left">
          <button className="back-button" onClick={() => setView('landing')}>
            <ChevronLeft size={20} /> Back
          </button>
          <h1>Global Market Intelligence</h1>
          <span className="live-badge">
            <span className="pulse-dot"></span>
            Live Data
          </span>
        </div>
        <div className="header-right">
          <span className="last-update">
            <Clock size={14} />
            Updated: {lastUpdate.toLocaleTimeString()}
          </span>
          <button className="refresh-btn">
            <RefreshCw size={16} />
            Refresh
          </button>
          <button className="alerts-btn">
            <Bell size={16} />
            <span className="alert-count">3</span>
          </button>
        </div>
      </header>

      {/* Global Price Ticker */}
      <div className="price-ticker">
        <div className="ticker-item">
          <span className="ticker-label">Brent Crude</span>
          <span className="ticker-value">$82.50</span>
          <span className="ticker-change positive">+$1.30 (+1.6%)</span>
        </div>
        <div className="ticker-item">
          <span className="ticker-label">WTI</span>
          <span className="ticker-value">$79.10</span>
          <span className="ticker-change positive">+$0.85 (+1.1%)</span>
        </div>
        <div className="ticker-item">
          <span className="ticker-label">Platts FOB Singapore</span>
          <span className="ticker-value">$84.80</span>
          <span className="ticker-change positive">+$1.45 (+1.7%)</span>
        </div>
        <div className="ticker-item">
          <span className="ticker-label">USD/UGX</span>
          <span className="ticker-value">3,720</span>
          <span className="ticker-change negative">-15 (-0.4%)</span>
        </div>
        <div className="ticker-item">
          <span className="ticker-label">Freight Rate (AG-EA)</span>
          <span className="ticker-value">WS 145</span>
          <span className="ticker-change positive">+12 (+9.0%)</span>
        </div>
      </div>

      <div className="market-content">
        {/* Geo-Political Alerts */}
        <section className="alerts-section">
          <div className="section-header">
            <AlertTriangle className="section-icon warning" />
            <h2>Geo-Political & Market Alerts</h2>
          </div>
          <div className="alerts-grid">
            {geoPoliticalAlerts.map((alert, index) => (
              <div key={index} className={`alert-card ${alert.severity.toLowerCase()}`}>
                <div className="alert-header">
                  <span className="alert-region">{alert.region}</span>
                  <span className={`severity-badge ${alert.severity.toLowerCase()}`}>
                    {alert.severity}
                  </span>
                </div>
                <h4 className="alert-title">{alert.title}</h4>
                <p className="alert-description">{alert.description}</p>
                <div className="alert-impact">
                  <strong>Impact:</strong> {alert.impact}
                </div>
                <span className="alert-time">{alert.date}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="market-grid">
          {/* Global Price Chart */}
          <section className="chart-section">
            <div className="section-header">
              <TrendingUp className="section-icon" />
              <h2>Intraday Price Movement</h2>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={globalPriceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="time" tick={{ fill: '#64748B', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#64748B', fontSize: 12 }} domain={['auto', 'auto']} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="brent" stroke="#3B82F6" fill="rgba(59, 130, 246, 0.1)" name="Brent" />
                  <Area type="monotone" dataKey="wti" stroke="#10B981" fill="rgba(16, 185, 129, 0.1)" name="WTI" />
                  <Area type="monotone" dataKey="platts" stroke="#8B5CF6" fill="rgba(139, 92, 246, 0.1)" name="Platts" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Regional Markets */}
          <section className="regional-section">
            <div className="section-header">
              <Globe className="section-icon" />
              <h2>Regional Market Prices (UGX/L)</h2>
            </div>
            <div className="regional-table-wrapper">
              <table className="regional-table">
                <thead>
                  <tr>
                    <th>Country</th>
                    <th>PMS</th>
                    <th>AGO</th>
                    <th>JET A-1</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  {regionalMarkets.map((market, index) => (
                    <tr key={index} className={market.country === 'Uganda' ? 'highlight' : ''}>
                      <td>
                        <span className="country-flag">{market.flag}</span>
                        {market.country}
                      </td>
                      <td>{market.pms.toLocaleString()}</td>
                      <td>{market.ago.toLocaleString()}</td>
                      <td>{market.jet.toLocaleString()}</td>
                      <td className={market.change >= 0 ? 'positive' : 'negative'}>
                        {market.change >= 0 ? '+' : ''}{market.change}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Supply Chain Status */}
        <section className="supply-chain-section">
          <div className="section-header">
            <Ship className="section-icon" />
            <h2>Global Supply Chain Status</h2>
          </div>
          <div className="supply-routes">
            {supplyChainStatus.map((route, index) => (
              <div key={index} className="route-card">
                <div className="route-header">
                  <MapPin size={16} />
                  <span className="route-name">{route.route}</span>
                  <span className={`route-status ${route.status.toLowerCase().replace(' ', '-')}`}>
                    {route.status}
                  </span>
                </div>
                <div className="route-details">
                  <div className="route-stat">
                    <span className="stat-label">Transit Time</span>
                    <span className="stat-value">{route.transitTime}</span>
                  </div>
                  <div className="route-stat">
                    <span className="stat-label">Active Vessels</span>
                    <span className="stat-value">{route.vessels}</span>
                  </div>
                  <div className="route-stat">
                    <span className="stat-label">Monthly Capacity</span>
                    <span className="stat-value">{route.capacity}</span>
                  </div>
                  <div className="route-stat">
                    <span className="stat-label">Risk Level</span>
                    <span className={`risk-badge ${route.risk.toLowerCase()}`}>{route.risk}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="market-grid">
          {/* OPEC Production */}
          <section className="opec-section">
            <div className="section-header">
              <Fuel className="section-icon" />
              <h2>OPEC+ Production Compliance</h2>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={opecData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#64748B', fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="production" fill="#3B82F6" name="Production (mb/d)" />
                  <Bar dataKey="quota" fill="#E2E8F0" name="Quota (mb/d)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="compliance-note">
              Average Compliance: <strong>99.3%</strong> | Next Meeting: Jan 15, 2025
            </div>
          </section>

          {/* Product Specifications */}
          <section className="specs-section">
            <div className="section-header">
              <Fuel className="section-icon" />
              <h2>Product Specification Trends</h2>
            </div>
            <div className="specs-table-wrapper">
              <table className="specs-table">
                <thead>
                  <tr>
                    <th>Specification</th>
                    <th>Current</th>
                    <th>Trend</th>
                    <th>Next Change</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {specTrends.map((spec, index) => (
                    <tr key={index}>
                      <td>{spec.spec}</td>
                      <td>{spec.current}</td>
                      <td>
                        {spec.trend === 'Tightening' && <TrendingDown className="trend-icon warning" size={16} />}
                        {spec.trend === 'Increasing' && <TrendingUp className="trend-icon warning" size={16} />}
                        {spec.trend === 'Stable' && <span className="trend-stable">—</span>}
                        {spec.trend}
                      </td>
                      <td>{spec.nextChange}</td>
                      <td>
                        <span className={`compliance-badge ${spec.compliance.toLowerCase()}`}>
                          {spec.compliance}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Quick Actions */}
        <section className="quick-actions">
          <div className="action-card" onClick={() => setView('analytics')}>
            <TrendingUp className="action-icon" />
            <span>View Detailed Analytics</span>
            <ExternalLink size={16} />
          </div>
          <div className="action-card" onClick={() => setView('supply')}>
            <Ship className="action-icon" />
            <span>Supply Chain Module</span>
            <ExternalLink size={16} />
          </div>
          <div className="action-card" onClick={() => setView('pricing')}>
            <DollarSign className="action-icon" />
            <span>Pricing Strategy</span>
            <ExternalLink size={16} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default MarketIntelligence;
