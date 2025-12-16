import React, { useState } from 'react';
import {
  ArrowLeft, Users, Building, Truck, Ship, Phone, Mail,
  Calendar, TrendingUp, AlertTriangle, CheckCircle, Clock,
  Star, MessageSquare, FileText, BarChart3, Globe, Award,
  ChevronRight, Filter, Search, Plus, RefreshCw
} from 'lucide-react';
import './StakeholderManagement.css';

interface StakeholderManagementProps {
  setView: (view: string) => void;
}

const StakeholderManagement: React.FC<StakeholderManagementProps> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // KPC Partnership Data
  const kpcMetrics = {
    throughput: '2.4M',
    reliability: 98.5,
    avgDelay: 2.3,
    activePipelines: 3,
    lastMeeting: '2024-01-10',
    nextMeeting: '2024-01-24',
    contractStatus: 'Active',
    contractExpiry: '2025-12-31'
  };

  // Terminal Operators
  const terminalOperators = [
    {
      name: 'Jinja Storage Terminal',
      location: 'Jinja, Uganda',
      capacity: '60,000 MT',
      utilization: 78,
      status: 'operational',
      contact: 'John Mukasa',
      lastInspection: '2024-01-05',
      rating: 4.5
    },
    {
      name: 'Kampala Oil Terminal',
      location: 'Kampala, Uganda',
      capacity: '45,000 MT',
      utilization: 85,
      status: 'operational',
      contact: 'Sarah Nambi',
      lastInspection: '2024-01-08',
      rating: 4.8
    },
    {
      name: 'Eldoret Pipeline Terminal',
      location: 'Eldoret, Kenya',
      capacity: '80,000 MT',
      utilization: 72,
      status: 'maintenance',
      contact: 'David Kipchoge',
      lastInspection: '2024-01-02',
      rating: 4.2
    }
  ];

  // OMC Partners with detailed tracking
  const omcPartners = [
    {
      name: 'Total Energies Uganda',
      type: 'International',
      creditScore: 92,
      allocation: '25%',
      volume: '45,000 MT',
      paymentStatus: 'current',
      relationship: 'Strategic',
      stations: 156,
      performance: 95
    },
    {
      name: 'Vivo Energy Uganda',
      type: 'International',
      creditScore: 89,
      allocation: '22%',
      volume: '39,600 MT',
      paymentStatus: 'current',
      relationship: 'Strategic',
      stations: 142,
      performance: 93
    },
    {
      name: 'Stabex International',
      type: 'Indigenous',
      creditScore: 85,
      allocation: '18%',
      volume: '32,400 MT',
      paymentStatus: 'current',
      relationship: 'Priority',
      stations: 98,
      performance: 88
    },
    {
      name: 'Hass Petroleum',
      type: 'Indigenous',
      creditScore: 82,
      allocation: '15%',
      volume: '27,000 MT',
      paymentStatus: 'current',
      relationship: 'Priority',
      stations: 76,
      performance: 86
    },
    {
      name: 'Oryx Energies',
      type: 'Regional',
      creditScore: 78,
      allocation: '12%',
      volume: '21,600 MT',
      paymentStatus: 'delayed',
      relationship: 'Standard',
      stations: 54,
      performance: 81
    },
    {
      name: 'Mogas Uganda',
      type: 'Indigenous',
      creditScore: 75,
      allocation: '8%',
      volume: '14,400 MT',
      paymentStatus: 'current',
      relationship: 'Priority',
      stations: 42,
      performance: 79
    }
  ];

  // Supply Partners
  const supplyPartners = [
    {
      name: 'ADNOC Trading',
      country: 'UAE',
      products: ['Crude', 'PMS', 'AGO'],
      contractValue: '$45M',
      reliability: 97,
      leadTime: '14 days',
      status: 'active'
    },
    {
      name: 'Vitol Group',
      country: 'Netherlands',
      products: ['PMS', 'AGO', 'JET-A1'],
      contractValue: '$38M',
      reliability: 95,
      leadTime: '18 days',
      status: 'active'
    },
    {
      name: 'Trafigura',
      country: 'Singapore',
      products: ['AGO', 'FO'],
      contractValue: '$28M',
      reliability: 94,
      leadTime: '21 days',
      status: 'active'
    },
    {
      name: 'Glencore',
      country: 'Switzerland',
      products: ['Crude', 'PMS'],
      contractValue: '$52M',
      reliability: 96,
      leadTime: '16 days',
      status: 'negotiating'
    }
  ];

  // Communication Log
  const recentCommunications = [
    {
      stakeholder: 'KPC Operations',
      type: 'Meeting',
      subject: 'Q1 Throughput Planning',
      date: '2024-01-10',
      status: 'completed',
      followUp: 'Send revised allocation schedule'
    },
    {
      stakeholder: 'Total Energies',
      type: 'Email',
      subject: 'Credit Facility Review',
      date: '2024-01-09',
      status: 'pending',
      followUp: 'Await CFO approval'
    },
    {
      stakeholder: 'Jinja Terminal',
      type: 'Inspection',
      subject: 'Joint Stock Verification',
      date: '2024-01-05',
      status: 'completed',
      followUp: 'Submit inspection report'
    },
    {
      stakeholder: 'ADNOC Trading',
      type: 'Call',
      subject: 'Cargo MT Blessed scheduled',
      date: '2024-01-08',
      status: 'completed',
      followUp: 'None'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'operational':
      case 'active':
      case 'current':
      case 'completed':
        return 'success';
      case 'maintenance':
      case 'delayed':
      case 'pending':
      case 'negotiating':
        return 'warning';
      case 'offline':
      case 'overdue':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <div className="stakeholder-management">
      {/* Header */}
      <header className="stakeholder-header">
        <div className="header-left">
          <button className="back-button" onClick={() => setView('dashboard')}>
            <ArrowLeft size={18} />
            Back
          </button>
          <h1>Stakeholder Management</h1>
          <span className="header-badge">
            <Users size={14} />
            {omcPartners.length + supplyPartners.length + terminalOperators.length} Partners
          </span>
        </div>
        <div className="header-right">
          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search stakeholders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="icon-btn">
            <Filter size={18} />
          </button>
          <button className="primary-btn">
            <Plus size={18} />
            Add Stakeholder
          </button>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart3 size={16} />
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'kpc' ? 'active' : ''}`}
          onClick={() => setActiveTab('kpc')}
        >
          <Building size={16} />
          KPC Partnership
        </button>
        <button
          className={`tab-btn ${activeTab === 'terminals' ? 'active' : ''}`}
          onClick={() => setActiveTab('terminals')}
        >
          <Truck size={16} />
          Terminals
        </button>
        <button
          className={`tab-btn ${activeTab === 'omcs' ? 'active' : ''}`}
          onClick={() => setActiveTab('omcs')}
        >
          <Users size={16} />
          OMC Partners
        </button>
        <button
          className={`tab-btn ${activeTab === 'suppliers' ? 'active' : ''}`}
          onClick={() => setActiveTab('suppliers')}
        >
          <Ship size={16} />
          Supply Partners
        </button>
        <button
          className={`tab-btn ${activeTab === 'communications' ? 'active' : ''}`}
          onClick={() => setActiveTab('communications')}
        >
          <MessageSquare size={16} />
          Communications
        </button>
      </div>

      {/* Content */}
      <div className="stakeholder-content">
        {activeTab === 'overview' && (
          <>
            {/* Summary Cards */}
            <div className="summary-grid">
              <div className="summary-card">
                <div className="summary-icon kpc">
                  <Building size={24} />
                </div>
                <div className="summary-info">
                  <span className="summary-label">KPC Throughput</span>
                  <span className="summary-value">{kpcMetrics.throughput} bbl</span>
                  <span className="summary-change positive">
                    <TrendingUp size={14} /> {kpcMetrics.reliability}% reliability
                  </span>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon terminals">
                  <Truck size={24} />
                </div>
                <div className="summary-info">
                  <span className="summary-label">Active Terminals</span>
                  <span className="summary-value">{terminalOperators.length}</span>
                  <span className="summary-change">
                    {terminalOperators.filter(t => t.status === 'operational').length} operational
                  </span>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon omcs">
                  <Users size={24} />
                </div>
                <div className="summary-info">
                  <span className="summary-label">OMC Partners</span>
                  <span className="summary-value">{omcPartners.length}</span>
                  <span className="summary-change">
                    {omcPartners.filter(o => o.type === 'Indigenous').length} Indigenous priority
                  </span>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon suppliers">
                  <Globe size={24} />
                </div>
                <div className="summary-info">
                  <span className="summary-label">Supply Partners</span>
                  <span className="summary-value">{supplyPartners.length}</span>
                  <span className="summary-change">
                    ${supplyPartners.reduce((sum, s) => sum + parseInt(s.contractValue.replace(/[^0-9]/g, '')), 0)}M contracts
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity and Communications */}
            <div className="overview-grid">
              <div className="activity-section">
                <div className="section-header">
                  <h2><Clock size={20} /> Recent Communications</h2>
                  <button className="view-all-btn">View All <ChevronRight size={16} /></button>
                </div>
                <div className="activity-list">
                  {recentCommunications.map((comm, index) => (
                    <div key={index} className="activity-item">
                      <div className={`activity-type ${comm.type.toLowerCase()}`}>
                        {comm.type === 'Meeting' && <Users size={16} />}
                        {comm.type === 'Email' && <Mail size={16} />}
                        {comm.type === 'Call' && <Phone size={16} />}
                        {comm.type === 'Inspection' && <FileText size={16} />}
                      </div>
                      <div className="activity-content">
                        <span className="activity-stakeholder">{comm.stakeholder}</span>
                        <span className="activity-subject">{comm.subject}</span>
                        <span className="activity-date">{comm.date}</span>
                      </div>
                      <span className={`activity-status ${getStatusColor(comm.status)}`}>
                        {comm.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="performance-section">
                <div className="section-header">
                  <h2><Award size={20} /> Top Performers</h2>
                </div>
                <div className="performer-list">
                  {omcPartners
                    .sort((a, b) => b.performance - a.performance)
                    .slice(0, 4)
                    .map((omc, index) => (
                      <div key={index} className="performer-item">
                        <span className="performer-rank">#{index + 1}</span>
                        <div className="performer-info">
                          <span className="performer-name">{omc.name}</span>
                          <span className="performer-type">{omc.type}</span>
                        </div>
                        <div className="performer-score">
                          <div className="score-bar">
                            <div
                              className="score-fill"
                              style={{width: `${omc.performance}%`}}
                            ></div>
                          </div>
                          <span>{omc.performance}%</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'kpc' && (
          <div className="kpc-section">
            <div className="kpc-header-card">
              <div className="kpc-logo">
                <Building size={48} />
              </div>
              <div className="kpc-info">
                <h2>Kenya Pipeline Company</h2>
                <p>Strategic Pipeline Partner for East African Oil Products</p>
                <div className="kpc-badges">
                  <span className="badge success">
                    <CheckCircle size={14} /> Contract Active
                  </span>
                  <span className="badge info">
                    <Calendar size={14} /> Expires: {kpcMetrics.contractExpiry}
                  </span>
                </div>
              </div>
              <div className="kpc-actions">
                <button className="action-btn">
                  <Phone size={16} /> Contact
                </button>
                <button className="action-btn">
                  <FileText size={16} /> View Contract
                </button>
              </div>
            </div>

            <div className="kpc-metrics-grid">
              <div className="kpc-metric">
                <span className="metric-label">Monthly Throughput</span>
                <span className="metric-value">{kpcMetrics.throughput}</span>
                <span className="metric-unit">barrels</span>
              </div>
              <div className="kpc-metric">
                <span className="metric-label">Reliability Score</span>
                <span className="metric-value">{kpcMetrics.reliability}%</span>
                <div className="metric-bar">
                  <div className="bar-fill" style={{width: `${kpcMetrics.reliability}%`}}></div>
                </div>
              </div>
              <div className="kpc-metric">
                <span className="metric-label">Avg Delay Time</span>
                <span className="metric-value">{kpcMetrics.avgDelay}</span>
                <span className="metric-unit">hours</span>
              </div>
              <div className="kpc-metric">
                <span className="metric-label">Active Pipelines</span>
                <span className="metric-value">{kpcMetrics.activePipelines}</span>
                <span className="metric-unit">segments</span>
              </div>
            </div>

            <div className="kpc-schedule">
              <h3>Meeting Schedule</h3>
              <div className="schedule-items">
                <div className="schedule-item past">
                  <Calendar size={18} />
                  <div className="schedule-info">
                    <span className="schedule-date">Last Meeting: {kpcMetrics.lastMeeting}</span>
                    <span className="schedule-topic">Q1 Throughput Planning</span>
                  </div>
                  <span className="schedule-status completed">Completed</span>
                </div>
                <div className="schedule-item upcoming">
                  <Calendar size={18} />
                  <div className="schedule-info">
                    <span className="schedule-date">Next Meeting: {kpcMetrics.nextMeeting}</span>
                    <span className="schedule-topic">Monthly Performance Review</span>
                  </div>
                  <span className="schedule-status scheduled">Scheduled</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'terminals' && (
          <div className="terminals-section">
            <div className="terminals-grid">
              {terminalOperators.map((terminal, index) => (
                <div key={index} className="terminal-card">
                  <div className="terminal-header">
                    <div className="terminal-name">
                      <Truck size={20} />
                      <h3>{terminal.name}</h3>
                    </div>
                    <span className={`terminal-status ${getStatusColor(terminal.status)}`}>
                      {terminal.status}
                    </span>
                  </div>
                  <div className="terminal-location">
                    <Globe size={14} /> {terminal.location}
                  </div>
                  <div className="terminal-metrics">
                    <div className="terminal-metric">
                      <span className="label">Capacity</span>
                      <span className="value">{terminal.capacity}</span>
                    </div>
                    <div className="terminal-metric">
                      <span className="label">Utilization</span>
                      <div className="utilization-bar">
                        <div
                          className="utilization-fill"
                          style={{width: `${terminal.utilization}%`}}
                        ></div>
                      </div>
                      <span className="value">{terminal.utilization}%</span>
                    </div>
                    <div className="terminal-metric">
                      <span className="label">Rating</span>
                      <div className="rating">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < Math.floor(terminal.rating) ? 'filled' : ''}
                          />
                        ))}
                        <span>{terminal.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="terminal-footer">
                    <div className="contact-info">
                      <Users size={14} /> {terminal.contact}
                    </div>
                    <div className="inspection-info">
                      <FileText size={14} /> Last inspection: {terminal.lastInspection}
                    </div>
                  </div>
                  <button className="terminal-action">
                    Schedule Inspection <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'omcs' && (
          <div className="omcs-section">
            <div className="omcs-filters">
              <button className="filter-btn active">All</button>
              <button className="filter-btn">Indigenous</button>
              <button className="filter-btn">International</button>
              <button className="filter-btn">Regional</button>
            </div>
            <div className="omcs-table-wrapper">
              <table className="omcs-table">
                <thead>
                  <tr>
                    <th>OMC Partner</th>
                    <th>Type</th>
                    <th>Credit Score</th>
                    <th>Allocation</th>
                    <th>Volume</th>
                    <th>Payment Status</th>
                    <th>Performance</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {omcPartners.map((omc, index) => (
                    <tr key={index} className={omc.type === 'Indigenous' ? 'priority' : ''}>
                      <td>
                        <div className="omc-name">
                          <span className="name">{omc.name}</span>
                          <span className="stations">{omc.stations} stations</span>
                        </div>
                      </td>
                      <td>
                        <span className={`type-badge ${omc.type.toLowerCase()}`}>
                          {omc.type}
                        </span>
                      </td>
                      <td>
                        <div className="credit-score">
                          <div className="score-circle">
                            <span>{omc.creditScore}</span>
                          </div>
                        </div>
                      </td>
                      <td>{omc.allocation}</td>
                      <td>{omc.volume}</td>
                      <td>
                        <span className={`payment-status ${getStatusColor(omc.paymentStatus)}`}>
                          {omc.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <div className="performance-cell">
                          <div className="perf-bar">
                            <div
                              className="perf-fill"
                              style={{width: `${omc.performance}%`}}
                            ></div>
                          </div>
                          <span>{omc.performance}%</span>
                        </div>
                      </td>
                      <td>
                        <button className="table-action-btn">
                          <ChevronRight size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'suppliers' && (
          <div className="suppliers-section">
            <div className="suppliers-grid">
              {supplyPartners.map((supplier, index) => (
                <div key={index} className="supplier-card">
                  <div className="supplier-header">
                    <div className="supplier-info">
                      <h3>{supplier.name}</h3>
                      <span className="supplier-country">
                        <Globe size={14} /> {supplier.country}
                      </span>
                    </div>
                    <span className={`supplier-status ${getStatusColor(supplier.status)}`}>
                      {supplier.status}
                    </span>
                  </div>
                  <div className="supplier-products">
                    {supplier.products.map((product, idx) => (
                      <span key={idx} className="product-tag">{product}</span>
                    ))}
                  </div>
                  <div className="supplier-metrics">
                    <div className="supplier-metric">
                      <span className="label">Contract Value</span>
                      <span className="value">{supplier.contractValue}</span>
                    </div>
                    <div className="supplier-metric">
                      <span className="label">Reliability</span>
                      <span className="value">{supplier.reliability}%</span>
                    </div>
                    <div className="supplier-metric">
                      <span className="label">Lead Time</span>
                      <span className="value">{supplier.leadTime}</span>
                    </div>
                  </div>
                  <div className="supplier-actions">
                    <button className="supplier-btn">
                      <Mail size={14} /> Contact
                    </button>
                    <button className="supplier-btn primary">
                      <FileText size={14} /> View Contract
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'communications' && (
          <div className="communications-section">
            <div className="comm-header">
              <h2>Communication Log</h2>
              <button className="primary-btn">
                <Plus size={16} /> Log Communication
              </button>
            </div>
            <div className="comm-table-wrapper">
              <table className="comm-table">
                <thead>
                  <tr>
                    <th>Stakeholder</th>
                    <th>Type</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Follow-up</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCommunications.map((comm, index) => (
                    <tr key={index}>
                      <td>{comm.stakeholder}</td>
                      <td>
                        <span className={`comm-type ${comm.type.toLowerCase()}`}>
                          {comm.type === 'Meeting' && <Users size={14} />}
                          {comm.type === 'Email' && <Mail size={14} />}
                          {comm.type === 'Call' && <Phone size={14} />}
                          {comm.type === 'Inspection' && <FileText size={14} />}
                          {comm.type}
                        </span>
                      </td>
                      <td>{comm.subject}</td>
                      <td>{comm.date}</td>
                      <td>
                        <span className={`comm-status ${getStatusColor(comm.status)}`}>
                          {comm.status === 'completed' && <CheckCircle size={14} />}
                          {comm.status === 'pending' && <Clock size={14} />}
                          {comm.status}
                        </span>
                      </td>
                      <td>{comm.followUp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StakeholderManagement;
