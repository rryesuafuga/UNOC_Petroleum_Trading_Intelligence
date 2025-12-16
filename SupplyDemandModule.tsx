import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ScatterChart, Scatter, ComposedChart
} from 'recharts';
import { 
  TrendingUp, AlertCircle, Truck, Package, 
  ChevronLeft, Map, Calendar, Download, Filter
} from 'lucide-react';
import './SupplyDemandModule.css';

interface SupplyDemandProps {
  setView: (view: string) => void;
  liveData: any;
}

const SupplyDemandModule: React.FC<SupplyDemandProps> = ({ setView, liveData }) => {
  const [selectedProduct, setSelectedProduct] = useState('PMS');
  const [forecastDays, setForecastDays] = useState(14);

  // Uganda-specific supply chain data
  const supplyChainData = [
    { date: 'Dec 1', mombasa: 45, dar: 32, kampala: 38, demand: 42 },
    { date: 'Dec 3', mombasa: 48, dar: 35, kampala: 41, demand: 44 },
    { date: 'Dec 5', mombasa: 52, dar: 38, kampala: 45, demand: 46 },
    { date: 'Dec 7', mombasa: 50, dar: 40, kampala: 48, demand: 45 },
    { date: 'Dec 9', mombasa: 55, dar: 42, kampala: 52, demand: 48 },
    { date: 'Dec 11', mombasa: 58, dar: 45, kampala: 55, demand: 52 },
    { date: 'Dec 13', mombasa: 60, dar: 48, kampala: 58, demand: 55 },
    { date: 'Dec 15', mombasa: 62, dar: 50, kampala: 60, demand: 58 }
  ];

  const demandPattern = [
    { hour: '00:00', weekday: 2.5, weekend: 1.8 },
    { hour: '04:00', weekday: 1.8, weekend: 1.2 },
    { hour: '06:00', weekday: 4.5, weekend: 2.8 },
    { hour: '08:00', weekday: 8.2, weekend: 5.5 },
    { hour: '10:00', weekday: 7.5, weekend: 6.8 },
    { hour: '12:00', weekday: 6.8, weekend: 7.2 },
    { hour: '14:00', weekday: 6.2, weekend: 6.5 },
    { hour: '16:00', weekday: 7.8, weekend: 5.8 },
    { hour: '18:00', weekday: 9.2, weekend: 6.2 },
    { hour: '20:00', weekday: 5.5, weekend: 4.8 },
    { hour: '22:00', weekday: 3.8, weekend: 3.2 }
  ];

  const omcDemandData = [
    { omc: 'Total', demand: 28, forecast: 32, variance: 14 },
    { omc: 'Shell', demand: 22, forecast: 24, variance: 9 },
    { omc: 'Stabex', demand: 15, forecast: 18, variance: 20 },
    { omc: 'Mogas', demand: 10, forecast: 12, variance: 20 },
    { omc: 'Hass', demand: 8, forecast: 9, variance: 12 },
    { omc: 'Others', demand: 17, forecast: 20, variance: 18 }
  ];

  const transportRoutes = [
    { route: 'Mombasa-Kampala', distance: 1152, transitTime: 48, cost: 180, utilization: 78 },
    { route: 'Dar-Kampala', distance: 1420, transitTime: 60, cost: 220, utilization: 65 },
    { route: 'Kampala-Gulu', distance: 332, transitTime: 8, cost: 45, utilization: 82 },
    { route: 'Kampala-Mbarara', distance: 268, transitTime: 6, cost: 35, utilization: 90 }
  ];

  const forecast = Array.from({ length: forecastDays }, (_, i) => ({
    day: `Day ${i + 1}`,
    predicted: 42 + Math.sin(i / 3) * 8 + Math.random() * 5,
    upperBound: 50 + Math.sin(i / 3) * 8 + Math.random() * 3,
    lowerBound: 35 + Math.sin(i / 3) * 8 - Math.random() * 3,
    actual: i < 7 ? 40 + Math.sin(i / 3) * 10 + Math.random() * 5 : null
  }));

  const inventoryOptimization = {
    currentStock: 125,
    safetyStock: 45,
    reorderPoint: 72,
    economicOrderQty: 95,
    leadTime: 5,
    coverageDays: Math.floor(125 / (280 / 7))
  };

  return (
    <div className="module-container supply-demand">
      {/* Header */}
      <div className="module-header">
        <div className="header-left">
          <button className="back-button" onClick={() => setView('dashboard')}>
            <ChevronLeft /> Back to Dashboard
          </button>
          <h1>Supply & Demand Analytics</h1>
        </div>
        <div className="header-actions">
          <select 
            value={selectedProduct} 
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="product-selector"
          >
            <option value="PMS">PMS (Petrol)</option>
            <option value="AGO">AGO (Diesel)</option>
            <option value="JET">JET A-1</option>
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
        <div className="metric-card primary">
          <div className="metric-icon">
            <TrendingUp />
          </div>
          <div className="metric-content">
            <span className="metric-label">Forecast Accuracy</span>
            <span className="metric-value">92.3%</span>
            <span className="metric-change positive">+2.1% vs last month</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">
            <Package />
          </div>
          <div className="metric-content">
            <span className="metric-label">Current Inventory</span>
            <span className="metric-value">125M Liters</span>
            <span className="metric-change">{inventoryOptimization.coverageDays} days coverage</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">
            <Truck />
          </div>
          <div className="metric-content">
            <span className="metric-label">In Transit</span>
            <span className="metric-value">47M Liters</span>
            <span className="metric-change">3 vessels, 12 trucks</span>
          </div>
        </div>
        <div className="metric-card warning">
          <div className="metric-icon">
            <AlertCircle />
          </div>
          <div className="metric-content">
            <span className="metric-label">Supply Risk</span>
            <span className="metric-value">Medium</span>
            <span className="metric-change">AGO below safety stock</span>
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="charts-layout">
        {/* 14-Day Demand Forecast */}
        <div className="chart-panel large">
          <div className="panel-header">
            <h3>{forecastDays}-Day Demand Forecast</h3>
            <div className="forecast-controls">
              <button 
                className={forecastDays === 7 ? 'active' : ''} 
                onClick={() => setForecastDays(7)}
              >7 Days</button>
              <button 
                className={forecastDays === 14 ? 'active' : ''} 
                onClick={() => setForecastDays(14)}
              >14 Days</button>
              <button 
                className={forecastDays === 30 ? 'active' : ''} 
                onClick={() => setForecastDays(30)}
              >30 Days</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={forecast}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis label={{ value: 'Million Liters', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="upperBound" stroke="#E5E7EB" fill="#F3F4F6" />
              <Area type="monotone" dataKey="lowerBound" stroke="#E5E7EB" fill="#FFFFFF" />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Hourly Demand Pattern */}
        <div className="chart-panel">
          <div className="panel-header">
            <h3>Daily Demand Pattern</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={demandPattern}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="weekday" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
              <Area type="monotone" dataKey="weekend" stackId="2" stroke="#10B981" fill="#10B981" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* OMC Demand Analysis */}
        <div className="chart-panel">
          <div className="panel-header">
            <h3>OMC Demand vs Forecast</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={omcDemandData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="omc" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="demand" fill="#3B82F6" />
              <Bar dataKey="forecast" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Supply Chain Flow */}
      <div className="supply-chain-section">
        <h3>Supply Chain Flow Analysis</h3>
        <div className="flow-visualization">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={supplyChainData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="mombasa" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="dar" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="kampala" stroke="#F59E0B" strokeWidth={2} />
              <Line type="monotone" dataKey="demand" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transport Routes Table */}
      <div className="routes-section">
        <h3>Transport Route Optimization</h3>
        <div className="routes-table">
          <table>
            <thead>
              <tr>
                <th>Route</th>
                <th>Distance (km)</th>
                <th>Transit Time (hrs)</th>
                <th>Cost (USD/MT)</th>
                <th>Utilization</th>
              </tr>
            </thead>
            <tbody>
              {transportRoutes.map((route, index) => (
                <tr key={index}>
                  <td>{route.route}</td>
                  <td>{route.distance.toLocaleString()}</td>
                  <td>{route.transitTime}</td>
                  <td>${route.cost}</td>
                  <td>
                    <div className="utilization-bar">
                      <div 
                        className="utilization-fill" 
                        style={{
                          width: `${route.utilization}%`,
                          backgroundColor: route.utilization > 80 ? '#EF4444' : '#10B981'
                        }}
                      ></div>
                      <span>{route.utilization}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inventory Optimization */}
      <div className="inventory-section">
        <h3>Inventory Optimization Model</h3>
        <div className="inventory-metrics">
          <div className="inventory-card">
            <span className="label">Current Stock</span>
            <span className="value">{inventoryOptimization.currentStock}M L</span>
          </div>
          <div className="inventory-card">
            <span className="label">Safety Stock</span>
            <span className="value">{inventoryOptimization.safetyStock}M L</span>
          </div>
          <div className="inventory-card">
            <span className="label">Reorder Point</span>
            <span className="value">{inventoryOptimization.reorderPoint}M L</span>
          </div>
          <div className="inventory-card">
            <span className="label">EOQ</span>
            <span className="value">{inventoryOptimization.economicOrderQty}M L</span>
          </div>
          <div className="inventory-card">
            <span className="label">Lead Time</span>
            <span className="value">{inventoryOptimization.leadTime} days</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyDemandModule;
