import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ComposedChart, Scatter
} from 'recharts';
import {
  ChevronLeft, TrendingUp, Globe, FileText,
  AlertCircle, Target, BarChart2, Activity,
  Download, RefreshCw, Calendar, Filter
} from 'lucide-react';
import './TradingAnalytics.css';

interface TradingAnalyticsProps {
  setView: (view: string) => void;
}

const TradingAnalytics: React.FC<TradingAnalyticsProps> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState('forecasting');
  const [timeRange, setTimeRange] = useState('14d');

  // Demand Forecasting Data (14-day horizon as per job requirement)
  const forecastData = [
    { day: 'Day 1', actual: 8.5, forecast: 8.7, lower: 8.2, upper: 9.2, confidence: 95 },
    { day: 'Day 2', actual: 9.2, forecast: 9.0, lower: 8.5, upper: 9.5, confidence: 94 },
    { day: 'Day 3', actual: 8.8, forecast: 8.9, lower: 8.4, upper: 9.4, confidence: 93 },
    { day: 'Day 4', actual: 9.5, forecast: 9.3, lower: 8.8, upper: 9.8, confidence: 92 },
    { day: 'Day 5', actual: 10.2, forecast: 10.0, lower: 9.5, upper: 10.5, confidence: 91 },
    { day: 'Day 6', actual: 11.5, forecast: 11.2, lower: 10.7, upper: 11.7, confidence: 90 },
    { day: 'Day 7', actual: 10.8, forecast: 10.5, lower: 10.0, upper: 11.0, confidence: 89 },
    { day: 'Day 8', actual: null, forecast: 10.2, lower: 9.6, upper: 10.8, confidence: 88 },
    { day: 'Day 9', actual: null, forecast: 9.8, lower: 9.2, upper: 10.4, confidence: 87 },
    { day: 'Day 10', actual: null, forecast: 10.5, lower: 9.8, upper: 11.2, confidence: 85 },
    { day: 'Day 11', actual: null, forecast: 11.0, lower: 10.2, upper: 11.8, confidence: 83 },
    { day: 'Day 12', actual: null, forecast: 11.5, lower: 10.6, upper: 12.4, confidence: 81 },
    { day: 'Day 13', actual: null, forecast: 10.8, lower: 9.8, upper: 11.8, confidence: 79 },
    { day: 'Day 14', actual: null, forecast: 10.2, lower: 9.1, upper: 11.3, confidence: 77 },
  ];

  // Price Trend Analysis Data
  const priceTrendData = [
    { month: 'Jul', brent: 82.5, platts: 84.2, uganda: 4285, margin: 2.1 },
    { month: 'Aug', brent: 84.1, platts: 86.0, uganda: 4320, margin: 2.2 },
    { month: 'Sep', brent: 86.3, platts: 88.1, uganda: 4380, margin: 2.0 },
    { month: 'Oct', brent: 83.7, platts: 85.5, uganda: 4350, margin: 2.3 },
    { month: 'Nov', brent: 81.2, platts: 83.0, uganda: 4290, margin: 2.5 },
    { month: 'Dec', brent: 79.8, platts: 81.5, uganda: 4250, margin: 2.4 },
  ];

  // Value at Risk Data
  const varData = [
    { scenario: 'Base Case', probability: 60, impact: 0, var95: 2.1, var99: 3.2 },
    { scenario: 'Price Spike', probability: 15, impact: -850000, var95: 4.5, var99: 6.8 },
    { scenario: 'Supply Disruption', probability: 10, impact: -1200000, var95: 5.2, var99: 7.9 },
    { scenario: 'Demand Surge', probability: 10, impact: 450000, var95: 2.8, var99: 4.1 },
    { scenario: 'FX Volatility', probability: 5, impact: -320000, var95: 3.1, var99: 4.7 },
  ];

  // Market Correlation Data
  const correlationData = [
    { pair: 'Brent-PMS', correlation: 0.94, significance: 'High', trend: 'Stable' },
    { pair: 'USD/UGX-Margin', correlation: -0.67, significance: 'Medium', trend: 'Increasing' },
    { pair: 'Demand-Season', correlation: 0.82, significance: 'High', trend: 'Cyclical' },
    { pair: 'Stock-Price', correlation: -0.45, significance: 'Low', trend: 'Decreasing' },
    { pair: 'Kenya-Uganda Price', correlation: 0.91, significance: 'High', trend: 'Stable' },
  ];

  // KPI Metrics
  const kpiMetrics = [
    { label: 'Forecast Accuracy', value: '92.3%', change: '+1.2%', trend: 'up', target: '90%' },
    { label: 'Price Deviation', value: '$0.45/bbl', change: '-$0.12', trend: 'up', target: '<$0.50' },
    { label: 'VaR (95%)', value: '$2.1M', change: '+$0.3M', trend: 'down', target: '<$2.5M' },
    { label: 'Model Confidence', value: '88%', change: '+2%', trend: 'up', target: '>85%' },
  ];

  const renderForecastingTab = () => (
    <div className="analytics-content">
      <div className="analytics-section">
        <div className="section-title">
          <TrendingUp className="section-icon" />
          <h3>14-Day Demand Forecast</h3>
          <span className="model-badge">LSTM + Prophet Ensemble</span>
        </div>
        <div className="chart-large">
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="day" tick={{ fill: '#64748B', fontSize: 12 }} />
              <YAxis tick={{ fill: '#64748B', fontSize: 12 }} label={{ value: 'Million Liters', angle: -90, position: 'insideLeft', fill: '#64748B' }} />
              <Tooltip
                contentStyle={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '8px' }}
                formatter={(value: any, name: string) => [value?.toFixed(2) + 'M L', name]}
              />
              <Legend />
              <Area type="monotone" dataKey="upper" stackId="1" stroke="none" fill="rgba(59, 130, 246, 0.1)" name="Upper Bound" />
              <Area type="monotone" dataKey="lower" stackId="2" stroke="none" fill="white" name="Lower Bound" />
              <Line type="monotone" dataKey="forecast" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 5" name="Forecast" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="actual" stroke="#10B981" strokeWidth={3} name="Actual" dot={{ r: 5 }} />
              <Scatter dataKey="confidence" fill="#8B5CF6" name="Confidence %" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="forecast-insights">
          <div className="insight-card">
            <span className="insight-label">Next 7-Day Avg</span>
            <span className="insight-value">10.4M L/day</span>
            <span className="insight-change positive">+8.3% vs last week</span>
          </div>
          <div className="insight-card">
            <span className="insight-label">Peak Demand Day</span>
            <span className="insight-value">Day 12 (Sat)</span>
            <span className="insight-change">11.5M Liters</span>
          </div>
          <div className="insight-card">
            <span className="insight-label">Stockout Risk</span>
            <span className="insight-value warning">Medium</span>
            <span className="insight-change">AGO: Day 9-11</span>
          </div>
          <div className="insight-card">
            <span className="insight-label">Confidence Avg</span>
            <span className="insight-value">86.2%</span>
            <span className="insight-change">Within target range</span>
          </div>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h4>Model Performance</h4>
          <div className="model-metrics">
            <div className="model-metric">
              <span className="metric-name">MAPE</span>
              <span className="metric-val">4.2%</span>
            </div>
            <div className="model-metric">
              <span className="metric-name">RMSE</span>
              <span className="metric-val">0.38</span>
            </div>
            <div className="model-metric">
              <span className="metric-name">R-squared</span>
              <span className="metric-val">0.94</span>
            </div>
            <div className="model-metric">
              <span className="metric-name">MAE</span>
              <span className="metric-val">0.31</span>
            </div>
          </div>
        </div>
        <div className="analytics-card">
          <h4>Demand Drivers</h4>
          <div className="drivers-list">
            <div className="driver-item">
              <span className="driver-name">Seasonal Pattern</span>
              <div className="driver-bar">
                <div className="driver-fill" style={{ width: '78%' }}></div>
              </div>
              <span className="driver-val">78%</span>
            </div>
            <div className="driver-item">
              <span className="driver-name">Economic Activity</span>
              <div className="driver-bar">
                <div className="driver-fill" style={{ width: '62%' }}></div>
              </div>
              <span className="driver-val">62%</span>
            </div>
            <div className="driver-item">
              <span className="driver-name">Price Elasticity</span>
              <div className="driver-bar">
                <div className="driver-fill" style={{ width: '45%' }}></div>
              </div>
              <span className="driver-val">45%</span>
            </div>
            <div className="driver-item">
              <span className="driver-name">Weather Impact</span>
              <div className="driver-bar">
                <div className="driver-fill" style={{ width: '23%' }}></div>
              </div>
              <span className="driver-val">23%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPricingTab = () => (
    <div className="analytics-content">
      <div className="analytics-section">
        <div className="section-title">
          <Globe className="section-icon" />
          <h3>Global Price Trend Analysis</h3>
          <span className="model-badge">Platts + Brent Correlation</span>
        </div>
        <div className="chart-large">
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={priceTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fill: '#64748B', fontSize: 12 }} label={{ value: 'USD/bbl', angle: -90, position: 'insideLeft', fill: '#64748B' }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#64748B', fontSize: 12 }} label={{ value: 'UGX/L', angle: 90, position: 'insideRight', fill: '#64748B' }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="brent" stroke="#3B82F6" strokeWidth={2} name="Brent Crude" />
              <Line yAxisId="left" type="monotone" dataKey="platts" stroke="#10B981" strokeWidth={2} name="Platts FOB" />
              <Bar yAxisId="right" dataKey="uganda" fill="rgba(139, 92, 246, 0.3)" name="Uganda Retail" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="pricing-grid">
        <div className="pricing-card">
          <h4>Regional Price Comparison (UGX/Liter)</h4>
          <table className="pricing-table">
            <thead>
              <tr>
                <th>Market</th>
                <th>PMS</th>
                <th>AGO</th>
                <th>JET A-1</th>
                <th>vs Uganda</th>
              </tr>
            </thead>
            <tbody>
              <tr className="highlight-row">
                <td><strong>Uganda</strong></td>
                <td>4,285</td>
                <td>4,150</td>
                <td>3,980</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Kenya</td>
                <td>4,350</td>
                <td>4,200</td>
                <td>4,020</td>
                <td className="text-success">+1.5%</td>
              </tr>
              <tr>
                <td>Tanzania</td>
                <td>4,320</td>
                <td>4,180</td>
                <td>4,000</td>
                <td className="text-success">+0.8%</td>
              </tr>
              <tr>
                <td>Rwanda</td>
                <td>4,400</td>
                <td>4,250</td>
                <td>4,050</td>
                <td className="text-success">+2.7%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="pricing-card">
          <h4>Margin Optimization</h4>
          <div className="margin-metrics">
            <div className="margin-item">
              <span className="margin-label">Current Margin</span>
              <span className="margin-value">$2.45/bbl</span>
            </div>
            <div className="margin-item">
              <span className="margin-label">Optimized Target</span>
              <span className="margin-value text-success">$2.69/bbl</span>
            </div>
            <div className="margin-item">
              <span className="margin-label">Potential Gain</span>
              <span className="margin-value text-accent">+9.8%</span>
            </div>
            <div className="margin-item">
              <span className="margin-label">Annual Impact</span>
              <span className="margin-value">$4.2M</span>
            </div>
          </div>
          <div className="recommendation-box">
            <AlertCircle className="rec-icon" />
            <div className="rec-content">
              <strong>Pricing Recommendation:</strong>
              <p>Increase PMS by UGX 45/L effective next Monday to align with regional benchmarks while maintaining competitiveness.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRiskTab = () => (
    <div className="analytics-content">
      <div className="analytics-section">
        <div className="section-title">
          <Target className="section-icon" />
          <h3>Value at Risk Analysis</h3>
          <span className="model-badge">Monte Carlo Simulation</span>
        </div>
        <div className="risk-overview">
          <div className="risk-metric-card">
            <span className="risk-label">VaR (95%)</span>
            <span className="risk-value">$2.1M</span>
            <span className="risk-period">1-Day Horizon</span>
          </div>
          <div className="risk-metric-card">
            <span className="risk-label">VaR (99%)</span>
            <span className="risk-value">$3.2M</span>
            <span className="risk-period">1-Day Horizon</span>
          </div>
          <div className="risk-metric-card">
            <span className="risk-label">Expected Shortfall</span>
            <span className="risk-value">$3.8M</span>
            <span className="risk-period">Tail Risk</span>
          </div>
          <div className="risk-metric-card">
            <span className="risk-label">Stress Test Loss</span>
            <span className="risk-value warning">$5.2M</span>
            <span className="risk-period">Worst Case</span>
          </div>
        </div>
      </div>

      <div className="risk-scenarios">
        <h4>Scenario Analysis</h4>
        <table className="scenario-table">
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Probability</th>
              <th>Impact</th>
              <th>VaR 95%</th>
              <th>VaR 99%</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {varData.map((scenario, index) => (
              <tr key={index}>
                <td><strong>{scenario.scenario}</strong></td>
                <td>{scenario.probability}%</td>
                <td className={scenario.impact >= 0 ? 'text-success' : 'text-danger'}>
                  {scenario.impact >= 0 ? '+' : ''}{(scenario.impact / 1000000).toFixed(2)}M
                </td>
                <td>${scenario.var95}M</td>
                <td>${scenario.var99}M</td>
                <td>
                  <button className="action-btn-sm">Hedge</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="analytics-section">
        <div className="section-title">
          <BarChart2 className="section-icon" />
          <h3>Market Correlation Matrix</h3>
        </div>
        <div className="correlation-grid">
          {correlationData.map((item, index) => (
            <div key={index} className="correlation-card">
              <div className="corr-header">
                <span className="corr-pair">{item.pair}</span>
                <span className={`corr-significance ${item.significance.toLowerCase()}`}>
                  {item.significance}
                </span>
              </div>
              <div className="corr-value" style={{
                color: item.correlation > 0 ? '#10B981' : '#EF4444'
              }}>
                {item.correlation > 0 ? '+' : ''}{item.correlation.toFixed(2)}
              </div>
              <div className="corr-trend">Trend: {item.trend}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReportsTab = () => (
    <div className="analytics-content">
      <div className="reports-section">
        <div className="section-title">
          <FileText className="section-icon" />
          <h3>Automated Reports</h3>
        </div>
        <div className="reports-grid">
          <div className="report-card">
            <div className="report-icon">
              <Activity />
            </div>
            <div className="report-info">
              <h4>Daily Trading Summary</h4>
              <p>Comprehensive daily analysis of trading activities, volumes, and performance metrics</p>
              <div className="report-meta">
                <span className="report-schedule">Daily at 18:00 EAT</span>
                <span className="report-format">PDF, Excel</span>
              </div>
            </div>
            <button className="report-download">
              <Download size={16} />
              Generate
            </button>
          </div>

          <div className="report-card">
            <div className="report-icon">
              <TrendingUp />
            </div>
            <div className="report-info">
              <h4>Weekly Market Analysis</h4>
              <p>Regional price comparison, demand trends, and market intelligence insights</p>
              <div className="report-meta">
                <span className="report-schedule">Every Monday</span>
                <span className="report-format">PDF, PowerPoint</span>
              </div>
            </div>
            <button className="report-download">
              <Download size={16} />
              Generate
            </button>
          </div>

          <div className="report-card">
            <div className="report-icon">
              <Target />
            </div>
            <div className="report-info">
              <h4>Risk Assessment Report</h4>
              <p>VaR calculations, stress testing results, and hedging recommendations</p>
              <div className="report-meta">
                <span className="report-schedule">Monthly</span>
                <span className="report-format">PDF</span>
              </div>
            </div>
            <button className="report-download">
              <Download size={16} />
              Generate
            </button>
          </div>

          <div className="report-card">
            <div className="report-icon">
              <Globe />
            </div>
            <div className="report-info">
              <h4>Stakeholder Performance</h4>
              <p>OMC portfolio analysis, credit scores, and indigenous company metrics</p>
              <div className="report-meta">
                <span className="report-schedule">Bi-weekly</span>
                <span className="report-format">Excel, Dashboard</span>
              </div>
            </div>
            <button className="report-download">
              <Download size={16} />
              Generate
            </button>
          </div>
        </div>
      </div>

      <div className="export-section">
        <h4>Export Data</h4>
        <div className="export-options">
          <button className="export-btn">
            <FileText size={18} />
            Export to Excel
          </button>
          <button className="export-btn">
            <FileText size={18} />
            Export to PDF
          </button>
          <button className="export-btn">
            <RefreshCw size={18} />
            API Integration
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="trading-analytics">
      <header className="analytics-header">
        <div className="header-left">
          <button className="back-button" onClick={() => setView('landing')}>
            <ChevronLeft size={20} /> Back
          </button>
          <h1>Trading Intelligence Analytics</h1>
          <span className="analytics-badge">
            <Activity size={14} />
            Advanced Analytics
          </span>
        </div>
        <div className="header-right">
          <div className="time-selector">
            <Calendar size={16} />
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
              <option value="7d">Last 7 Days</option>
              <option value="14d">Last 14 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last Quarter</option>
            </select>
          </div>
          <button className="refresh-btn">
            <RefreshCw size={16} />
            Refresh
          </button>
          <button className="filter-btn">
            <Filter size={16} />
            Filters
          </button>
        </div>
      </header>

      {/* KPI Summary */}
      <div className="kpi-summary">
        {kpiMetrics.map((kpi, index) => (
          <div key={index} className="kpi-card">
            <div className="kpi-label">{kpi.label}</div>
            <div className="kpi-value">{kpi.value}</div>
            <div className={`kpi-change ${kpi.trend}`}>
              {kpi.change}
              <span className="kpi-target">Target: {kpi.target}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="analytics-tabs">
        <button
          className={`tab-btn ${activeTab === 'forecasting' ? 'active' : ''}`}
          onClick={() => setActiveTab('forecasting')}
        >
          <TrendingUp size={18} />
          Demand Forecasting
        </button>
        <button
          className={`tab-btn ${activeTab === 'pricing' ? 'active' : ''}`}
          onClick={() => setActiveTab('pricing')}
        >
          <Globe size={18} />
          Price Analysis
        </button>
        <button
          className={`tab-btn ${activeTab === 'risk' ? 'active' : ''}`}
          onClick={() => setActiveTab('risk')}
        >
          <Target size={18} />
          Risk Assessment
        </button>
        <button
          className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          <FileText size={18} />
          Reports
        </button>
      </div>

      {/* Tab Content */}
      <div className="analytics-main">
        {activeTab === 'forecasting' && renderForecastingTab()}
        {activeTab === 'pricing' && renderPricingTab()}
        {activeTab === 'risk' && renderRiskTab()}
        {activeTab === 'reports' && renderReportsTab()}
      </div>
    </div>
  );
};

export default TradingAnalytics;
