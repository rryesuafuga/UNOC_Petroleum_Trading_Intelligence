import React from 'react';
import {
  TrendingUp, BarChart, Shield, Globe,
  Truck, DollarSign, AlertCircle, ChevronRight,
  Database, Clock, Users, Activity, Ship, LineChart,
  Building, MapPin
} from 'lucide-react';
import './LandingPage.css';

interface LandingPageProps {
  setView: (view: string) => void;
  liveData: any;
}

const LandingPage: React.FC<LandingPageProps> = ({ setView, liveData }) => {
  const stats = [
    { label: 'Current PMS Price', value: `UGX ${liveData.currentPrice.toFixed(0)}/L`, icon: DollarSign },
    { label: 'Vessels in Transit', value: liveData.vesselCount, icon: Truck },
    { label: 'National Stock Level', value: `${liveData.stockLevel.toFixed(0)}%`, icon: Database },
    { label: 'Active OMCs', value: liveData.omcCount, icon: Users }
  ];

  const features = [
    {
      title: 'Supply & Demand Analytics',
      description: 'AI-powered forecasting predicts demand 14 days ahead with 92% accuracy',
      icon: TrendingUp,
      color: '#3B82F6',
      metrics: ['Prevent stockouts', '40% faster decisions', 'Real-time vessel tracking'],
      view: 'supply'
    },
    {
      title: 'Price Intelligence',
      description: 'Optimize pricing with regional market analysis and ML predictions',
      icon: DollarSign,
      color: '#10B981',
      metrics: ['$0.45/barrel accuracy', '10% margin improvement', 'Automated pricing'],
      view: 'pricing'
    },
    {
      title: 'OMC Portfolio Management',
      description: 'Smart allocation algorithm prioritizes indigenous OMCs and manages risk',
      icon: Users,
      color: '#F59E0B',
      metrics: ['Credit scoring', 'Automated allocation', '30% risk reduction'],
      view: 'portfolio'
    },
    {
      title: 'Process Automation',
      description: 'Blockchain-enabled documentation and smart contracts for efficiency',
      icon: Shield,
      color: '#8B5CF6',
      metrics: ['99.6% time reduction', 'Zero-touch validation', 'Instant settlements'],
      view: 'automation'
    },
    {
      title: 'Trading Analytics',
      description: 'Advanced demand forecasting with LSTM + Prophet ML models and risk analysis',
      icon: LineChart,
      color: '#EF4444',
      metrics: ['14-day forecasting', 'VaR analysis', 'Automated reports'],
      view: 'analytics'
    },
    {
      title: 'Market Intelligence',
      description: 'Global market monitoring with geo-political risk alerts and OPEC tracking',
      icon: Globe,
      color: '#06B6D4',
      metrics: ['Live price feeds', 'Geo-political alerts', 'Supply chain status'],
      view: 'market'
    },
    {
      title: 'Stakeholder Management',
      description: 'KPC partnership tracking, terminal operators, and OMC relationship management',
      icon: Building,
      color: '#EC4899',
      metrics: ['KPC metrics', 'Terminal tracking', 'Communication logs'],
      view: 'stakeholders'
    },
    {
      title: 'Vessel Tracking',
      description: 'Real-time AIS vessel tracking with interactive maps and cargo monitoring',
      icon: Ship,
      color: '#14B8A6',
      metrics: ['Live AIS data', 'ETA tracking', 'Cargo monitoring'],
      view: 'vessels'
    }
  ];

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-text">UPTIP</span>
            <span className="logo-subtitle">UNOC PetroTrade Intelligence Platform</span>
          </div>
          <div className="nav-links">
            <a onClick={() => setView('dashboard')}>Dashboard</a>
            <a onClick={() => setView('analytics')}>Analytics</a>
            <a onClick={() => setView('market')}>Market Intel</a>
            <a onClick={() => setView('vessels')}>Vessel Tracking</a>
            <a onClick={() => setView('stakeholders')}>Stakeholders</a>
            <button className="cta-button" onClick={() => setView('dashboard')}>
              View Demo
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          {/* Live Badge */}
          <div className="hero-badge">
            <div className="live-dot"></div>
            <span className="hero-badge-text">LIVE DATA STREAMING</span>
          </div>

          <h1 className="hero-title">
            Enterprise Petroleum
            <span className="gradient-text">Trading Intelligence</span>
          </h1>
          <p className="hero-subtitle">
            Comprehensive trading intelligence platform for Uganda's emerging petroleum sector.
            Supporting UNOC's mandate as Uganda transitions from 6.5 billion barrels of discovered reserves
            to active production through Tilenga, Kingfisher, and EACOP projects.
          </p>

          {/* Live Stats Bar */}
          <div className="stats-bar">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="stat-card">
                  <IconComponent className="stat-icon" />
                  <div className="stat-content">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hero-actions">
            <button className="primary-button" onClick={() => setView('dashboard')}>
              <Activity className="icon" />
              View Live Dashboard
            </button>
            <button className="secondary-button" onClick={() => setView('supply')}>
              Explore Features
              <ChevronRight className="icon" />
            </button>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="value-prop">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">CAPABILITIES</span>
            <h2>Integrated Intelligence Modules</h2>
            <p>Comprehensive platform addressing all 12 essential duties of the Products Trading Analyst role</p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="feature-card" onClick={() => setView(feature.view)}>
                  <div className="feature-icon" style={{backgroundColor: feature.color + '20'}}>
                    <IconComponent style={{color: feature.color}} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <div className="feature-metrics">
                    {feature.metrics.map((metric, idx) => (
                      <span key={idx} className="metric-badge">{metric}</span>
                    ))}
                  </div>
                  <div className="feature-link">
                    Explore Module <ChevronRight className="inline-icon" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="roi-section">
        <div className="container">
          <div className="roi-content">
            <div className="roi-text">
              <h2>Proven Return on Investment</h2>
              <div className="roi-metrics">
                <div className="roi-card">
                  <div className="roi-value">$7.2M</div>
                  <div className="roi-label">Annual Savings</div>
                </div>
                <div className="roi-card">
                  <div className="roi-value">146x</div>
                  <div className="roi-label">ROI Year 1</div>
                </div>
                <div className="roi-card">
                  <div className="roi-value">6 weeks</div>
                  <div className="roi-label">Implementation</div>
                </div>
              </div>
              <ul className="roi-benefits">
                <li>15% reduction in stockouts = $2M saved</li>
                <li>10% pricing optimization = $5M additional margin</li>
                <li>30% operational efficiency = 4 FTEs worth $200k</li>
                <li>90% reduction in demurrage disputes</li>
              </ul>
            </div>
            <div className="roi-visual">
              <div className="growth-chart">
                <div className="chart-bar" style={{height: '20%'}}>
                  <span>Month 1</span>
                </div>
                <div className="chart-bar" style={{height: '40%'}}>
                  <span>Month 3</span>
                </div>
                <div className="chart-bar" style={{height: '70%'}}>
                  <span>Month 6</span>
                </div>
                <div className="chart-bar active" style={{height: '100%'}}>
                  <span>Month 12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform UNOC's Trading Operations?</h2>
            <p>Join Uganda's digital petroleum revolution with cutting-edge technology</p>
            <div className="cta-buttons">
              <button className="primary-button large" onClick={() => setView('dashboard')}>
                <Activity className="icon" />
                Start Live Demo
              </button>
              <button className="secondary-button large">
                <Clock className="icon" />
                Schedule Presentation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
