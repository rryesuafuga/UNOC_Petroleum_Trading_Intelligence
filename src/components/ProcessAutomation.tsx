import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { 
  Shield, Clock, CheckCircle, Link,
  ChevronLeft, Download, Activity, Zap
} from 'lucide-react';
import './ProcessAutomation.css';

interface ProcessAutomationProps {
  setView: (view: string) => void;
  liveData: any;
}

const ProcessAutomation: React.FC<ProcessAutomationProps> = ({ setView, liveData }) => {
  const [selectedProcess, setSelectedProcess] = useState('all');

  // Blockchain transaction data
  const blockchainTransactions = [
    { id: 'TX001', type: 'Bill of Lading', vessel: 'MT Kampala', timestamp: '10:23:45', status: 'Verified' },
    { id: 'TX002', type: 'Quality Certificate', product: 'PMS', timestamp: '10:45:12', status: 'Verified' },
    { id: 'TX003', type: 'KPC Receipt', volume: '8M Liters', timestamp: '11:05:33', status: 'Pending' },
    { id: 'TX004', type: 'Demurrage Calc', amount: '$12,450', timestamp: '11:15:20', status: 'Executed' },
    { id: 'TX005', type: 'Payment Settlement', omc: 'Total Uganda', timestamp: '11:30:15', status: 'Completed' }
  ];

  const automationMetrics = [
    { process: 'Document Validation', manual: 240, automated: 5, savings: 98 },
    { process: 'Demurrage Calculation', manual: 180, automated: 1, savings: 99.4 },
    { process: 'Invoice Processing', manual: 120, automated: 2, savings: 98.3 },
    { process: 'Quality Verification', manual: 90, automated: 10, savings: 88.9 }
  ];

  const timeSavings = [
    { month: 'Aug', manual: 820, automated: 180 },
    { month: 'Sep', manual: 680, automated: 320 },
    { month: 'Oct', manual: 520, automated: 480 },
    { month: 'Nov', manual: 340, automated: 660 },
    { month: 'Dec', manual: 180, automated: 820 }
  ];

  const smartContractPerformance = [
    { contract: 'Demurrage', executions: 45, accuracy: 99.7, avgTime: 1.2 },
    { contract: 'Quality Check', executions: 128, accuracy: 99.9, avgTime: 0.8 },
    { contract: 'Payment', executions: 89, accuracy: 100, avgTime: 2.1 },
    { contract: 'Allocation', executions: 23, accuracy: 98.5, avgTime: 3.5 }
  ];

  const processEfficiency = [
    { name: 'Error Rate', value: 0.3, target: 1 },
    { name: 'Processing Speed', value: 95, target: 80 },
    { name: 'Automation Level', value: 82, target: 70 },
    { name: 'Cost Savings', value: 78, target: 60 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

  return (
    <div className="module-container process-automation">
      {/* Header */}
      <div className="module-header">
        <div className="header-left">
          <button className="back-button" onClick={() => setView('dashboard')}>
            <ChevronLeft /> Back to Dashboard
          </button>
          <h1>Process Automation & Blockchain</h1>
        </div>
        <div className="header-actions">
          <select 
            value={selectedProcess} 
            onChange={(e) => setSelectedProcess(e.target.value)}
            className="process-selector"
          >
            <option value="all">All Processes</option>
            <option value="blockchain">Blockchain Only</option>
            <option value="automation">Automation Only</option>
          </select>
          <button className="action-button">
            <Activity /> Live Monitor
          </button>
          <button className="action-button">
            <Download /> Export Logs
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-row">
        <div className="metric-card success">
          <div className="metric-icon">
            <CheckCircle />
          </div>
          <div className="metric-content">
            <span className="metric-label">Documents Processed</span>
            <span className="metric-value">1,247</span>
            <span className="metric-change positive">99.7% accuracy</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">
            <Clock />
          </div>
          <div className="metric-content">
            <span className="metric-label">Time Saved</span>
            <span className="metric-value">640 hrs</span>
            <span className="metric-change">This month</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">
            <Link />
          </div>
          <div className="metric-content">
            <span className="metric-label">Blockchain TXs</span>
            <span className="metric-value">285</span>
            <span className="metric-change">Today: 12</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">
            <Zap />
          </div>
          <div className="metric-content">
            <span className="metric-label">Automation Rate</span>
            <span className="metric-value">82%</span>
            <span className="metric-change positive">+15% vs last month</span>
          </div>
        </div>
      </div>

      {/* Blockchain Live Feed */}
      <div className="blockchain-section">
        <h3>Blockchain Transaction Feed</h3>
        <div className="blockchain-feed">
          <div className="feed-header">
            <span className="live-badge">
              <span className="pulse-dot"></span>
              LIVE
            </span>
            <span className="chain-info">Hyperledger Fabric - UNOC Private Chain</span>
          </div>
          <div className="transactions-list">
            {blockchainTransactions.map((tx, index) => (
              <div key={index} className={`transaction-item ${tx.status.toLowerCase()}`}>
                <div className="tx-icon">
                  <Shield />
                </div>
                <div className="tx-details">
                  <div className="tx-main">
                    <span className="tx-id">{tx.id}</span>
                    <span className="tx-type">{tx.type}</span>
                  </div>
                  <div className="tx-meta">
                    <span>{tx.vessel || tx.product || tx.volume || tx.amount || tx.omc}</span>
                    <span className="tx-time">{tx.timestamp}</span>
                  </div>
                </div>
                <div className={`tx-status ${tx.status.toLowerCase()}`}>
                  {tx.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Automation Performance Charts */}
      <div className="charts-row">
        <div className="chart-panel">
          <h3>Process Time Reduction (Minutes)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={automationMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="process" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="manual" fill="#EF4444" name="Manual Process" />
              <Bar dataKey="automated" fill="#10B981" name="Automated" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-panel">
          <h3>Automation Adoption Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={timeSavings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="manual" stroke="#EF4444" strokeWidth={2} />
              <Line type="monotone" dataKey="automated" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Smart Contracts Performance */}
      <div className="smart-contracts-section">
        <h3>Smart Contract Performance</h3>
        <div className="contracts-grid">
          {smartContractPerformance.map((contract, index) => (
            <div key={index} className="contract-card">
              <h4>{contract.contract}</h4>
              <div className="contract-stats">
                <div className="stat">
                  <span className="label">Executions</span>
                  <span className="value">{contract.executions}</span>
                </div>
                <div className="stat">
                  <span className="label">Accuracy</span>
                  <span className="value">{contract.accuracy}%</span>
                </div>
                <div className="stat">
                  <span className="label">Avg Time</span>
                  <span className="value">{contract.avgTime}s</span>
                </div>
              </div>
              <div className="contract-bar">
                <div 
                  className="bar-fill"
                  style={{
                    width: `${contract.accuracy}%`,
                    backgroundColor: contract.accuracy > 99 ? '#10B981' : '#F59E0B'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process Efficiency Metrics */}
      <div className="charts-row">
        <div className="chart-panel">
          <h3>Process Efficiency KPIs</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={processEfficiency} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
              <Bar dataKey="target" fill="#E5E7EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-panel">
          <h3>Cost Savings Analysis</h3>
          <div className="savings-summary">
            <div className="savings-card">
              <h4>Monthly Savings</h4>
              <div className="amount">UGX 450M</div>
              <div className="breakdown">
                <div className="item">
                  <span>Labor Cost Reduction</span>
                  <span>280M</span>
                </div>
                <div className="item">
                  <span>Error Prevention</span>
                  <span>95M</span>
                </div>
                <div className="item">
                  <span>Speed Improvement</span>
                  <span>75M</span>
                </div>
              </div>
            </div>
            <div className="roi-indicator">
              <div className="roi-value">312%</div>
              <div className="roi-label">ROI on Automation</div>
              <div className="payback">2.4 months payback</div>
            </div>
          </div>
        </div>
      </div>

      {/* Automation Pipeline */}
      <div className="automation-pipeline">
        <h3>Automated Workflow Example: KPC Terminal Receipt</h3>
        <div className="workflow-stages">
          <div className="stage completed">
            <div className="stage-icon">
              <CheckCircle />
            </div>
            <h4>Document Receipt</h4>
            <p>Email received from KPC</p>
            <span className="time">0.5 sec</span>
          </div>
          <div className="stage-arrow">→</div>
          <div className="stage completed">
            <div className="stage-icon">
              <CheckCircle />
            </div>
            <h4>Data Extraction</h4>
            <p>OCR & parsing complete</p>
            <span className="time">2.1 sec</span>
          </div>
          <div className="stage-arrow">→</div>
          <div className="stage completed">
            <div className="stage-icon">
              <CheckCircle />
            </div>
            <h4>Validation</h4>
            <p>Checked against orders</p>
            <span className="time">1.3 sec</span>
          </div>
          <div className="stage-arrow">→</div>
          <div className="stage completed">
            <div className="stage-icon">
              <Shield />
            </div>
            <h4>Blockchain</h4>
            <p>Immutable record created</p>
            <span className="time">0.8 sec</span>
          </div>
          <div className="stage-arrow">→</div>
          <div className="stage active">
            <div className="stage-icon">
              <Zap />
            </div>
            <h4>Action Triggered</h4>
            <p>Payment initiated</p>
            <span className="time">Processing...</span>
          </div>
        </div>
        <div className="workflow-summary">
          <span className="total-time">Total Time: 4.7 seconds</span>
          <span className="vs">vs Manual: 45 minutes</span>
          <span className="improvement">99.8% faster</span>
        </div>
      </div>
    </div>
  );
};

export default ProcessAutomation;
