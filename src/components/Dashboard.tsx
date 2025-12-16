import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  RadialBarChart, RadialBar, AreaChart, Area
} from 'recharts';
import { 
  AlertTriangle, TrendingUp, TrendingDown, Activity, 
  Truck, Users, Globe, Shield, ChevronLeft, RefreshCw,
  Download, Bell, Calendar, DollarSign
} from 'lucide-react';
import './Dashboard.css';

interface DashboardProps {
  setView: (view: string) => void;
  liveData: any;
}

const Dashboard: React.FC<DashboardProps> = ({ setView, liveData }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [alerts, setAlerts] = useState<any[]>([]);
  
  // Simulated data for Uganda's petroleum market
  const demandForecast = [
    { day: 'Mon', actual: 8.5, forecast: 8.7, date: '16-Dec' },
    { day: 'Tue', actual: 9.2, forecast: 9.0, date: '17-Dec' },
    { day: 'Wed', actual: 8.8, forecast: 8.9, date: '18-Dec' },
    { day: 'Thu', actual: 9.5, forecast: 9.3, date: '19-Dec' },
    { day: 'Fri', actual: 10.2, forecast: 10.0, date: '20-Dec' },
    { day: 'Sat', actual: 11.5, forecast: 11.2, date: '21-Dec' },
    { day: 'Sun', actual: 10.8, forecast: 10.5, date: '22-Dec' }
  ];

  const vesselStatus = [
    { vessel: 'MT Kampala', cargo: 'PMS', volume: '8M Liters', eta: '2 days', port: 'Mombasa', status: 'In Transit' },
    { vessel: 'MT Victoria', cargo: 'AGO', volume: '6M Liters', eta: '5 days', port: 'Dar es Salaam', status: 'Loading' },
    { vessel: 'MT Nile', cargo: 'JET A-1', volume: '3M Liters', eta: '7 days', port: 'Mombasa', status: 'Scheduled' }
  ];

  const depotLevels = [
    { depot: 'Kampala', pms: 78, ago: 65, jet: 82 },
    { depot: 'Jinja', pms: 45, ago: 52, jet: 71 },
    { depot: 'Mbarara', pms: 62, ago: 58, jet: 55 },
    { depot: 'Gulu', pms: 38, ago: 41, jet: 48 }
  ];

  const priceComparison = [
    { market: 'Uganda', pms: 4285, ago: 4150, jet: 3980 },
    { market: 'Kenya', pms: 4350, ago: 4200, jet: 4020 },
    { market: 'Tanzania', pms: 4320, ago: 4180, jet: 4000 },
    { market: 'Rwanda', pms: 4400, ago: 4250, jet: 4050 }
  ];

  const omcPerformance = [
    { name: 'Total Uganda', volume: 35, payment: 98, indigenous: false },
    { name: 'Shell Uganda', volume: 28, payment: 97, indigenous: false },
    { name: 'Stabex', volume: 18, payment: 95, indigenous: true },
    { name: 'Mogas', volume: 12, payment: 92, indigenous: true },
    { name: 'Others', volume: 7, payment: 88, indigenous: true }
  ];

  const stockoutRisk = [
    { product: 'PMS', risk: 15, days: 8 },
    { product: 'AGO', risk: 35, days: 5 },
    { product: 'JET A-1', risk: 10, days: 12 }
  ];

  // Generate alerts
  useEffect(() => {
    const newAlerts = [];
    if (liveData.stockLevel < 40) {
      newAlerts.push({
        type: 'critical',
        message: 'National stock level below 40% - Immediate action required',
        time: 'Now'
      });
    }
    if (vesselStatus.some(v => v.eta === '2 days')) {
      newAlerts.push({
        type: 'warning',
        message: 'MT Kampala arriving in 2 days - Prepare discharge operations',
        time: '5 mins ago'
      });
    }
    newAlerts.push({
      type: 'info',
      message: 'Price optimization algorithm suggests 2% margin adjustment',
      time: '1 hour ago'
    });
    setAlerts(newAlerts);
  }, [liveData]);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <button className="back-button" onClick={() => setView('landing')}>
            <ChevronLeft /> Back
          </button>
          <h1>UPTIP Command Center</h1>
          <span className="live-indicator">
            <span className="pulse"></span>
            LIVE
          </span>
        </div>
        <div className="header-right">
          <div className="period-selector">
            <button className={selectedPeriod === 'day' ? 'active' : ''} 
                    onClick={() => setSelectedPeriod('day')}>Day</button>
            <button className={selectedPeriod === 'week' ? 'active' : ''} 
                    onClick={() => setSelectedPeriod('week')}>Week</button>
            <button className={selectedPeriod === 'month' ? 'active' : ''} 
                    onClick={() => setSelectedPeriod('month')}>Month</button>
          </div>
          <button className="icon-button">
            <RefreshCw />
          </button>
          <button className="icon-button">
            <Download />
          </button>
          <button className="icon-button notification">
            <Bell />
            <span className="badge">{alerts.length}</span>
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header">
            <DollarSign className="kpi-icon" />
            <span className="kpi-label">Today's Revenue</span>
          </div>
          <div className="kpi-value">UGX 8.2B</div>
          <div className="kpi-change positive">
            <TrendingUp /> +12% vs yesterday
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header">
            <Truck className="kpi-icon" />
            <span className="kpi-label">Active Deliveries</span>
          </div>
          <div className="kpi-value">47</div>
          <div className="kpi-change">
            <Activity /> 14 completed today
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header">
            <Users className="kpi-icon" />
            <span className="kpi-label">OMCs Served</span>
          </div>
          <div className="kpi-value">38/47</div>
          <div className="kpi-change">
            <Shield /> 95% payment compliance
          </div>
        </div>
        <div className="kpi-card alert">
          <div className="kpi-header">
            <AlertTriangle className="kpi-icon" />
            <span className="kpi-label">Stock Alert</span>
          </div>
          <div className="kpi-value">AGO Low</div>
          <div className="kpi-change negative">
            <TrendingDown /> 5 days supply remaining
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="charts-grid">
        {/* Demand Forecast Chart */}
        <div className="chart-card">
          <h3>7-Day Demand Forecast (Million Liters)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={demandForecast}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="forecast" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stock Levels by Depot */}
        <div className="chart-card">
          <h3>Depot Stock Levels (%)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={depotLevels}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="depot" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pms" fill="#3B82F6" />
              <Bar dataKey="ago" fill="#10B981" />
              <Bar dataKey="jet" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stockout Risk Gauge */}
        <div className="chart-card">
          <h3>Stockout Risk Assessment</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="90%" data={stockoutRisk}>
              <RadialBar dataKey="risk" cornerRadius={10} fill="#8884d8">
                {stockoutRisk.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </RadialBar>
              <Tooltip />
              <Legend />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="risk-labels">
            {stockoutRisk.map((item, index) => (
              <div key={index} className="risk-item">
                <span className="risk-product" style={{color: COLORS[index]}}>{item.product}</span>
                <span className="risk-value">{item.risk}% risk in {item.days} days</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="tables-grid">
        {/* Vessel Status */}
        <div className="table-card">
          <h3>Incoming Vessels</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Vessel</th>
                  <th>Cargo</th>
                  <th>Volume</th>
                  <th>ETA</th>
                  <th>Port</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {vesselStatus.map((vessel, index) => (
                  <tr key={index}>
                    <td>{vessel.vessel}</td>
                    <td><span className="badge">{vessel.cargo}</span></td>
                    <td>{vessel.volume}</td>
                    <td className={vessel.eta === '2 days' ? 'urgent' : ''}>{vessel.eta}</td>
                    <td>{vessel.port}</td>
                    <td>
                      <span className={`status ${vessel.status.toLowerCase().replace(' ', '-')}`}>
                        {vessel.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="table-action" onClick={() => setView('supply')}>
            View Supply Module →
          </button>
        </div>

        {/* Price Comparison */}
        <div className="table-card">
          <h3>Regional Price Comparison (UGX/Liter)</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Market</th>
                  <th>PMS</th>
                  <th>AGO</th>
                  <th>JET A-1</th>
                </tr>
              </thead>
              <tbody>
                {priceComparison.map((market, index) => (
                  <tr key={index} className={market.market === 'Uganda' ? 'highlight' : ''}>
                    <td>{market.market}</td>
                    <td>{market.pms.toLocaleString()}</td>
                    <td>{market.ago.toLocaleString()}</td>
                    <td>{market.jet.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="table-action" onClick={() => setView('pricing')}>
            View Pricing Module →
          </button>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="alerts-section">
        <h3>System Alerts</h3>
        <div className="alerts-list">
          {alerts.map((alert, index) => (
            <div key={index} className={`alert-item ${alert.type}`}>
              <AlertTriangle className="alert-icon" />
              <div className="alert-content">
                <p>{alert.message}</p>
                <span className="alert-time">{alert.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
