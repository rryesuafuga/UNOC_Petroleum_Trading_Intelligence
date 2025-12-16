import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, Ship, MapPin, Navigation, Clock, Anchor,
  AlertTriangle, CheckCircle, Info, RefreshCw, Filter,
  Search, ChevronRight, Fuel, Calendar, Package,
  TrendingUp, Globe, Wind, Thermometer
} from 'lucide-react';
import './VesselTracking.css';

interface VesselTrackingProps {
  setView: (view: string) => void;
}

const VesselTracking: React.FC<VesselTrackingProps> = ({ setView }) => {
  const [selectedVessel, setSelectedVessel] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Vessel data
  const vessels = [
    {
      id: 'MT-BLESSED',
      name: 'MT Blessed',
      imo: '9876543',
      flag: '🇱🇷',
      type: 'Oil/Chemical Tanker',
      status: 'In Transit',
      cargo: 'PMS - 35,000 MT',
      origin: 'Fujairah, UAE',
      destination: 'Mombasa, Kenya',
      eta: '2024-01-18 14:30',
      position: { lat: 5.2, lng: 58.4 },
      speed: 12.5,
      heading: 245,
      lastUpdate: '2 min ago',
      progress: 65,
      charter: 'Time Charter',
      owner: 'SeaTraders Ltd'
    },
    {
      id: 'MT-GLORY',
      name: 'MT Glory Star',
      imo: '9765432',
      flag: '🇵🇦',
      type: 'Product Tanker',
      status: 'Loading',
      cargo: 'AGO - 28,000 MT',
      origin: 'Rotterdam, Netherlands',
      destination: 'Mombasa, Kenya',
      eta: '2024-01-25 08:00',
      position: { lat: 51.9, lng: 4.5 },
      speed: 0,
      heading: 180,
      lastUpdate: '5 min ago',
      progress: 15,
      charter: 'Voyage Charter',
      owner: 'Global Shipping Co'
    },
    {
      id: 'MT-HORIZON',
      name: 'MT Sea Horizon',
      imo: '9654321',
      flag: '🇸🇬',
      type: 'Oil Tanker',
      status: 'At Anchor',
      cargo: 'JET-A1 - 22,000 MT',
      origin: 'Singapore',
      destination: 'Mombasa, Kenya',
      eta: '2024-01-15 16:00',
      position: { lat: -3.8, lng: 39.6 },
      speed: 0,
      heading: 90,
      lastUpdate: '1 min ago',
      progress: 98,
      charter: 'Spot Charter',
      owner: 'Asia Maritime'
    },
    {
      id: 'MT-PIONEER',
      name: 'MT Pioneer',
      imo: '9543210',
      flag: '🇲🇹',
      type: 'Chemical Tanker',
      status: 'Discharging',
      cargo: 'PMS - 40,000 MT',
      origin: 'Jeddah, Saudi Arabia',
      destination: 'Mombasa, Kenya',
      eta: 'Arrived',
      position: { lat: -4.05, lng: 39.67 },
      speed: 0,
      heading: 270,
      lastUpdate: '30 sec ago',
      progress: 100,
      charter: 'COA',
      owner: 'Mediterranean Tankers'
    }
  ];

  // Port coordinates for map reference
  const ports = [
    { name: 'Mombasa', lat: -4.05, lng: 39.67, type: 'destination' },
    { name: 'Fujairah', lat: 25.12, lng: 56.34, type: 'origin' },
    { name: 'Rotterdam', lat: 51.9, lng: 4.5, type: 'origin' },
    { name: 'Singapore', lat: 1.35, lng: 103.82, type: 'origin' },
    { name: 'Jeddah', lat: 21.49, lng: 39.19, type: 'origin' }
  ];

  // Weather conditions
  const weatherConditions = {
    arabianSea: { wind: '15 knots NE', sea: 'Moderate', temp: '28°C' },
    indianOcean: { wind: '12 knots SE', sea: 'Calm', temp: '30°C' },
    redSea: { wind: '18 knots N', sea: 'Slight', temp: '26°C' }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in transit':
        return 'transit';
      case 'loading':
        return 'loading';
      case 'at anchor':
        return 'anchor';
      case 'discharging':
        return 'discharging';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in transit':
        return <Navigation size={14} />;
      case 'loading':
        return <Package size={14} />;
      case 'at anchor':
        return <Anchor size={14} />;
      case 'discharging':
        return <Fuel size={14} />;
      default:
        return <Ship size={14} />;
    }
  };

  const selectedVesselData = vessels.find(v => v.id === selectedVessel);

  return (
    <div className="vessel-tracking">
      {/* Header */}
      <header className="vessel-header">
        <div className="header-left">
          <button className="back-button" onClick={() => setView('dashboard')}>
            <ArrowLeft size={18} />
            Back
          </button>
          <h1>Vessel Tracking</h1>
          <span className="live-badge">
            <span className="pulse-dot"></span>
            LIVE AIS DATA
          </span>
        </div>
        <div className="header-right">
          <div className="search-box">
            <Search size={16} />
            <input type="text" placeholder="Search vessels..." />
          </div>
          <button className="icon-btn">
            <Filter size={18} />
          </button>
          <button className="refresh-btn">
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="tracking-content">
        {/* Map Area */}
        <div className="map-container">
          <div className="map-placeholder">
            <div className="map-overlay">
              <Globe size={48} />
              <h3>Interactive Vessel Map</h3>
              <p>Real-time AIS tracking visualization</p>
              <div className="map-legend">
                <div className="legend-item">
                  <span className="legend-dot transit"></span>
                  In Transit
                </div>
                <div className="legend-item">
                  <span className="legend-dot loading"></span>
                  Loading
                </div>
                <div className="legend-item">
                  <span className="legend-dot anchor"></span>
                  At Anchor
                </div>
                <div className="legend-item">
                  <span className="legend-dot discharging"></span>
                  Discharging
                </div>
              </div>
            </div>

            {/* Simulated vessel positions on map */}
            <div className="vessel-markers">
              {vessels.map((vessel) => (
                <div
                  key={vessel.id}
                  className={`vessel-marker ${getStatusColor(vessel.status)} ${selectedVessel === vessel.id ? 'selected' : ''}`}
                  style={{
                    left: `${((vessel.position.lng + 180) / 360) * 100}%`,
                    top: `${((90 - vessel.position.lat) / 180) * 100}%`
                  }}
                  onClick={() => setSelectedVessel(vessel.id)}
                  title={vessel.name}
                >
                  <Ship size={16} />
                </div>
              ))}

              {/* Port markers */}
              {ports.map((port, index) => (
                <div
                  key={index}
                  className={`port-marker ${port.type}`}
                  style={{
                    left: `${((port.lng + 180) / 360) * 100}%`,
                    top: `${((90 - port.lat) / 180) * 100}%`
                  }}
                  title={port.name}
                >
                  <MapPin size={12} />
                </div>
              ))}
            </div>
          </div>

          {/* Weather Panel */}
          <div className="weather-panel">
            <h4><Wind size={16} /> Weather Conditions</h4>
            <div className="weather-items">
              <div className="weather-item">
                <span className="weather-region">Arabian Sea</span>
                <span className="weather-data">{weatherConditions.arabianSea.wind}</span>
                <span className="weather-sea">{weatherConditions.arabianSea.sea}</span>
              </div>
              <div className="weather-item">
                <span className="weather-region">Indian Ocean</span>
                <span className="weather-data">{weatherConditions.indianOcean.wind}</span>
                <span className="weather-sea">{weatherConditions.indianOcean.sea}</span>
              </div>
              <div className="weather-item">
                <span className="weather-region">Red Sea</span>
                <span className="weather-data">{weatherConditions.redSea.wind}</span>
                <span className="weather-sea">{weatherConditions.redSea.sea}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="tracking-sidebar">
          {/* Fleet Summary */}
          <div className="fleet-summary">
            <h3>Fleet Overview</h3>
            <div className="summary-stats">
              <div className="stat-item">
                <span className="stat-value">{vessels.length}</span>
                <span className="stat-label">Total Vessels</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">
                  {vessels.filter(v => v.status === 'In Transit').length}
                </span>
                <span className="stat-label">In Transit</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">
                  {vessels.reduce((sum, v) => sum + parseInt(v.cargo.split(' - ')[1]?.replace(/[^0-9]/g, '') || '0'), 0).toLocaleString()}
                </span>
                <span className="stat-label">Total MT</span>
              </div>
            </div>
          </div>

          {/* Vessel List */}
          <div className="vessel-list">
            <h3>Active Vessels</h3>
            {vessels.map((vessel) => (
              <div
                key={vessel.id}
                className={`vessel-card ${selectedVessel === vessel.id ? 'selected' : ''}`}
                onClick={() => setSelectedVessel(vessel.id)}
              >
                <div className="vessel-card-header">
                  <div className="vessel-name">
                    <span className="flag">{vessel.flag}</span>
                    <span>{vessel.name}</span>
                  </div>
                  <span className={`status-badge ${getStatusColor(vessel.status)}`}>
                    {getStatusIcon(vessel.status)}
                    {vessel.status}
                  </span>
                </div>
                <div className="vessel-card-body">
                  <div className="vessel-route">
                    <span className="origin">{vessel.origin.split(',')[0]}</span>
                    <span className="arrow">→</span>
                    <span className="destination">{vessel.destination.split(',')[0]}</span>
                  </div>
                  <div className="vessel-cargo">
                    <Fuel size={14} />
                    {vessel.cargo}
                  </div>
                  <div className="vessel-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${vessel.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{vessel.progress}%</span>
                  </div>
                </div>
                <div className="vessel-card-footer">
                  <span className="eta">
                    <Clock size={12} />
                    ETA: {vessel.eta}
                  </span>
                  <span className="update-time">{vessel.lastUpdate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vessel Detail Panel */}
      {selectedVesselData && (
        <div className="vessel-detail-panel">
          <div className="detail-header">
            <div className="detail-title">
              <Ship size={24} />
              <div>
                <h2>{selectedVesselData.flag} {selectedVesselData.name}</h2>
                <span className="imo">IMO: {selectedVesselData.imo}</span>
              </div>
            </div>
            <button className="close-btn" onClick={() => setSelectedVessel(null)}>×</button>
          </div>

          <div className="detail-content">
            <div className="detail-grid">
              <div className="detail-section">
                <h4>Voyage Information</h4>
                <div className="detail-items">
                  <div className="detail-item">
                    <span className="label">Origin</span>
                    <span className="value">{selectedVesselData.origin}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Destination</span>
                    <span className="value">{selectedVesselData.destination}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">ETA</span>
                    <span className="value">{selectedVesselData.eta}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Charter Type</span>
                    <span className="value">{selectedVesselData.charter}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Cargo Details</h4>
                <div className="detail-items">
                  <div className="detail-item">
                    <span className="label">Cargo</span>
                    <span className="value">{selectedVesselData.cargo}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Vessel Type</span>
                    <span className="value">{selectedVesselData.type}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Owner</span>
                    <span className="value">{selectedVesselData.owner}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Navigation Data</h4>
                <div className="detail-items">
                  <div className="detail-item">
                    <span className="label">Position</span>
                    <span className="value">
                      {selectedVesselData.position.lat.toFixed(4)}°, {selectedVesselData.position.lng.toFixed(4)}°
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Speed</span>
                    <span className="value">{selectedVesselData.speed} knots</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Heading</span>
                    <span className="value">{selectedVesselData.heading}°</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Last Update</span>
                    <span className="value">{selectedVesselData.lastUpdate}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-actions">
              <button className="action-btn">
                <Calendar size={16} />
                Schedule Update
              </button>
              <button className="action-btn">
                <AlertTriangle size={16} />
                Report Issue
              </button>
              <button className="action-btn primary">
                <Navigation size={16} />
                Track History
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VesselTracking;
