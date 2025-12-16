import React, { useState } from 'react';
import { 
  BarChart, Bar, PieChart, Pie, Cell, RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ScatterChart, Scatter
} from 'recharts';
import { 
  Users, Shield, TrendingUp, AlertTriangle,
  ChevronLeft, Download, Filter, Award
} from 'lucide-react';
import './OMCPortfolio.css';

interface OMCPortfolioProps {
  setView: (view: string) => void;
  liveData: any;
}

const OMCPortfolio: React.FC<OMCPortfolioProps> = ({ setView, liveData }) => {
  const [selectedSegment, setSelectedSegment] = useState('all');

  // OMC Portfolio Data
  const omcSegmentation = [
    { segment: 'Strategic Partners', count: 5, volume: 45, revenue: 52 },
    { segment: 'Growth Targets', count: 12, volume: 28, revenue: 25 },
    { segment: 'Maintain', count: 20, volume: 22, revenue: 18 },
    { segment: 'Risk Watch', count: 10, volume: 5, revenue: 5 }
  ];

  const indigenousOMCs = [
    { name: 'Stabex Oil', volume: 18, growth: 22, payment: 95, score: 88 },
    { name: 'Mogas Uganda', volume: 12, growth: 35, payment: 92, score: 85 },
    { name: 'Hass Petroleum', volume: 8, growth: 28, payment: 88, score: 78 },
    { name: 'Petro Uganda', volume: 6, growth: 45, payment: 85, score: 82 },
    { name: 'Lake Oil', volume: 4, growth: 18, payment: 90, score: 75 }
  ];

  const creditScoring = [
    { omc: 'Total Uganda', creditLimit: 8500, utilized: 6800, risk: 'Low', score: 92 },
    { omc: 'Shell Uganda', creditLimit: 7200, utilized: 5400, risk: 'Low', score: 89 },
    { omc: 'Stabex Oil', creditLimit: 3500, utilized: 2800, risk: 'Medium', score: 78 },
    { omc: 'Mogas', creditLimit: 2800, utilized: 2100, risk: 'Medium', score: 75 },
    { omc: 'Hass', creditLimit: 2000, utilized: 1800, risk: 'High', score: 65 }
  ];

  const paymentPerformance = [
    { month: 'Aug', onTime: 85, late7: 10, late30: 4, defaulted: 1 },
    { month: 'Sep', onTime: 87, late7: 8, late30: 3, defaulted: 2 },
    { month: 'Oct', onTime: 90, late7: 7, late30: 2, defaulted: 1 },
    { month: 'Nov', onTime: 92, late7: 5, late30: 2, defaulted: 1 },
    { month: 'Dec', onTime: 95, late7: 3, late30: 1, defaulted: 1 }
  ];

  const allocationRecommendation = [
    { product: 'PMS', total: 100, strategic: 45, growth: 28, maintain: 22, risk: 5 },
    { product: 'AGO', total: 80, strategic: 40, growth: 25, maintain: 12, risk: 3 },
    { product: 'JET', total: 30, strategic: 18, growth: 8, maintain: 3, risk: 1 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="module-container omc-portfolio">
      {/* Header */}
      <div className="module-header">
        <div className="header-left">
          <button className="back-button" onClick={() => setView('dashboard')}>
            <ChevronLeft /> Back to Dashboard
          </button>
          <h1>OMC Portfolio Management</h1>
        </div>
        <div className="header-actions">
          <select 
            value={selectedSegment} 
            onChange={(e) => setSelectedSegment(e.target.value)}
            className="segment-selector"
          >
            <option value="all">All Segments</option>
            <option value="strategic">Strategic Partners</option>
            <option value="growth">Growth Targets</option>
            <option value="indigenous">Indigenous OMCs</option>
          </select>
          <button className="action-button">
            <Filter /> Filters
          </button>
          <button className="action-button">
            <Download /> Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-row">
        <div className="metric-card">
          <div className="metric-icon">
            <Users />
          </div>
          <div className="metric-content">
            <span className="metric-label">Active OMCs</span>
            <span className="metric-value">{liveData.omcCount}</span>
            <span className="metric-change">+3 this month</span>
          </div>
        </div>
        <div className="metric-card success">
          <div className="metric-icon">
            <Award />
          </div>
          <div className="metric-content">
            <span className="metric-label">Indigenous Share</span>
            <span className="metric-value">32%</span>
            <span className="metric-change positive">Target: 40% by 2025</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">
            <Shield />
          </div>
          <div className="metric-content">
            <span className="metric-label">Payment Compliance</span>
            <span className="metric-value">95%</span>
            <span className="metric-change positive">+3% vs last month</span>
          </div>
        </div>
        <div className="metric-card warning">
          <div className="metric-icon">
            <AlertTriangle />
          </div>
          <div className="metric-content">
            <span className="metric-label">At Risk</span>
            <span className="metric-value">3 OMCs</span>
            <span className="metric-change">Credit review needed</span>
          </div>
        </div>
      </div>

      {/* Segmentation Charts */}
      <div className="charts-row">
        <div className="chart-panel">
          <h3>Portfolio Segmentation</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={omcSegmentation}
                dataKey="volume"
                nameKey="segment"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {omcSegmentation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-panel">
          <h3>Payment Performance Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={paymentPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="onTime" stackId="a" fill="#10B981" />
              <Bar dataKey="late7" stackId="a" fill="#F59E0B" />
              <Bar dataKey="late30" stackId="a" fill="#EF4444" />
              <Bar dataKey="defaulted" stackId="a" fill="#991B1B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Indigenous OMCs Focus */}
      <div className="indigenous-section">
        <h3>Indigenous OMCs Performance</h3>
        <div className="indigenous-table">
          <table>
            <thead>
              <tr>
                <th>OMC Name</th>
                <th>Volume Share</th>
                <th>Growth Rate</th>
                <th>Payment Score</th>
                <th>Overall Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {indigenousOMCs.map((omc, index) => (
                <tr key={index}>
                  <td>{omc.name}</td>
                  <td>{omc.volume}%</td>
                  <td>
                    <span className={omc.growth > 30 ? 'growth-high' : 'growth-normal'}>
                      +{omc.growth}%
                    </span>
                  </td>
                  <td>{omc.payment}%</td>
                  <td>
                    <div className="score-bar">
                      <div 
                        className="score-fill"
                        style={{
                          width: `${omc.score}%`,
                          backgroundColor: omc.score > 80 ? '#10B981' : '#F59E0B'
                        }}
                      />
                      <span>{omc.score}</span>
                    </div>
                  </td>
                  <td>
                    <span className="status-badge growth">Priority Support</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Credit Management */}
      <div className="charts-row">
        <div className="chart-panel">
          <h3>Credit Utilization & Risk</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="utilized" name="Utilized" unit="M" />
              <YAxis dataKey="score" name="Score" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="OMCs" data={creditScoring} fill="#3B82F6">
                {creditScoring.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={
                      entry.risk === 'Low' ? '#10B981' : 
                      entry.risk === 'Medium' ? '#F59E0B' : '#EF4444'
                    } 
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-panel">
          <h3>Credit Limits & Utilization</h3>
          <div className="credit-table">
            <table>
              <thead>
                <tr>
                  <th>OMC</th>
                  <th>Credit Limit</th>
                  <th>Utilized</th>
                  <th>Available</th>
                  <th>Risk</th>
                </tr>
              </thead>
              <tbody>
                {creditScoring.map((item, index) => (
                  <tr key={index}>
                    <td>{item.omc}</td>
                    <td>UGX {item.creditLimit}M</td>
                    <td>UGX {item.utilized}M</td>
                    <td>UGX {item.creditLimit - item.utilized}M</td>
                    <td>
                      <span className={`risk-badge ${item.risk.toLowerCase()}`}>
                        {item.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Allocation Algorithm */}
      <div className="allocation-section">
        <h3>Smart Allocation During Shortage</h3>
        <div className="allocation-scenario">
          <div className="scenario-header">
            <h4>Scenario: 20% Supply Shortage</h4>
            <p>Algorithm-based allocation to maintain strategic objectives</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={allocationRecommendation}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="strategic" stackId="a" fill="#3B82F6" />
              <Bar dataKey="growth" stackId="a" fill="#10B981" />
              <Bar dataKey="maintain" stackId="a" fill="#F59E0B" />
              <Bar dataKey="risk" stackId="a" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
          <div className="allocation-rules">
            <h4>Allocation Rules:</h4>
            <ul>
              <li>✓ Indigenous OMCs minimum 20% guarantee</li>
              <li>✓ Strategic partners priority (45% allocation)</li>
              <li>✓ Payment history weight: 30%</li>
              <li>✓ Volume commitment weight: 25%</li>
              <li>✓ Growth potential weight: 20%</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="action-items">
        <h3>Recommended Actions</h3>
        <div className="actions-grid">
          <div className="action-card">
            <TrendingUp className="action-icon" />
            <h4>Grow Indigenous Share</h4>
            <p>Increase credit limits for top 3 indigenous OMCs by 25%</p>
            <button className="action-btn">Review Proposals</button>
          </div>
          <div className="action-card">
            <Shield className="action-icon" />
            <h4>Risk Mitigation</h4>
            <p>3 OMCs require immediate credit review and collateral update</p>
            <button className="action-btn">Start Review</button>
          </div>
          <div className="action-card">
            <Users className="action-icon" />
            <h4>Onboard New OMCs</h4>
            <p>5 applications pending from indigenous operators</p>
            <button className="action-btn">Process Applications</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OMCPortfolio;
