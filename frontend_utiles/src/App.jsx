import React, { useState } from 'react';
import {
  LayoutDashboard,
  Video,
  Users,
  Settings,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  Zap,
  Bell,
  Search,
  Flag,
  Calendar,
  CheckCircle2,
  Clock
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Lun', engagement: 4000 },
  { name: 'Mar', engagement: 3000 },
  { name: 'Mer', engagement: 2000 },
  { name: 'Jeu', engagement: 2780 },
  { name: 'Ven', engagement: 1890 },
  { name: 'Sam', engagement: 2390 },
  { name: 'Dim', engagement: 3490 },
];

const campaigns = [
  {
    id: 1,
    title: "Élections Municipales Robert 2026",
    status: "En cours",
    progress: 65,
    sentinelles: 2,
    priority: "Haute"
  },
  {
    id: 2,
    title: "Campagne Vie Chère - Mobilisation",
    status: "Planifié",
    progress: 10,
    sentinelles: 1,
    priority: "Urgente"
  },
  {
    id: 3,
    title: "Protection Littoral Martinique",
    status: "Terminé",
    progress: 100,
    sentinelles: 0,
    priority: "Moyenne"
  }
];

const analyticsData = [
  { name: 'Jan', followers: 400, clips: 24, engagement: 2400 },
  { name: 'Fév', followers: 1200, clips: 45, engagement: 3600 },
  { name: 'Mar', followers: 2100, clips: 78, engagement: 4800 },
  { name: 'Avr', followers: 3400, clips: 110, engagement: 6200 },
];

const agentsData = [
  {
    id: 1,
    name: "Sentinelle Madinina",
    role: "Veille & Création",
    status: "En ligne",
    specialty: "Analyse presse & TikTok",
    lastAction: "Analyse : Transports à Fort-de-France",
    color: "#008751"
  },
  {
    id: 2,
    name: "Conseiller Rebelle",
    role: "Stratégie & Risques",
    status: "Veille",
    specialty: "Arguments politiques",
    lastAction: "Revue : Script Vie Chère",
    color: "#f87171"
  },
  {
    id: 3,
    name: "Diplomate",
    role: "Modération & Réponse",
    status: "En ligne",
    specialty: "Engagement citoyen",
    lastAction: "Réponse : Commentaire sur l'Écologie",
    color: "#60a5fa"
  }
];

const App = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [generating, setGenerating] = useState(false);

  const API_URL = "http://localhost:8000/api";

  const handleLaunchProduction = async (campTitle) => {
    setGenerating(true);
    try {
      const response = await fetch(`${API_URL}/launch-production`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json.stringify({
          topic: `Campagne ${campTitle} UTILES Martinique`,
          camp_title: campTitle
        }),
      });
      const data = await response.json();
      alert(`Backend: ${data.message}. Moteur CrewAI en cours d'exécution.`);
    } catch (err) {
      console.error("Erreur Backend:", err);
      alert("Erreur: Impossible de joindre le backend FastAPI sur le port 8000.");
    }
    setTimeout(() => setGenerating(false), 3000);
  };

  const renderOverview = () => (
    <>
      {/* KPI Grid */}
      <section className="kpi-grid">
        <div className="card">
          <div className="card-header">
            <span>Portée Totale</span>
            <Users size={16} />
          </div>
          <div className="card-value">128.4k</div>
          <div className="card-delta delta-up">↑ 12.5% vs semaine dernière</div>
        </div>
        <div className="card">
          <div className="card-header">
            <span>Sentinelles Actives</span>
            <ShieldCheck size={16} color="#008751" />
          </div>
          <div className="card-value">3 / 3</div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <div className="agent-node"></div>
            <div className="agent-node"></div>
            <div className="agent-node"></div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <span>Clips Générés</span>
            <Video size={16} />
          </div>
          <div className="card-value">42</div>
          <div className="card-delta delta-up">↑ 8 nouveaux clips</div>
        </div>
        <div className="card">
          <div className="card-header">
            <span>Taux d'Engagement</span>
            <TrendingUp size={16} />
          </div>
          <div className="card-value">5.8%</div>
          <div className="card-delta delta-down">↓ 0.2% vs hier</div>
        </div>
      </section>

      {/* Charts & Feed */}
      <div className="sections-grid">
        <section className="chart-section">
          <div className="section-title">
            <TrendingUp size={20} color="#008751" />
            <span>Engagement des Citoyens</span>
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorEngage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#008751" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#008751" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" vertical={false} />
                <XAxis dataKey="name" stroke="#a0a0a0" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a2a', border: '1px solid #2a2a3a', borderRadius: '8px' }}
                  itemStyle={{ color: '#008751' }}
                />
                <Area
                  type="monotone"
                  dataKey="engagement"
                  stroke="#008751"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorEngage)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="feed-section">
          <div className="section-title">
            <MessageSquare size={20} color="#FFD700" />
            <span>Dernières Tendances Martinique</span>
          </div>
          <div className="feed-list">
            <div className="feed-item">
              <div className="item-time">Il y a 10 min</div>
              <div className="item-text">Hausse du prix du carburant au Robert : mobilisations citoyennes signalées.</div>
            </div>
            <div className="feed-item" style={{ borderColor: '#FFD700' }}>
              <div className="item-time">Il y a 45 min</div>
              <div className="item-text">Débat sur l'autonomie collégiale : forte hausse des mentions sur Facebook.</div>
            </div>
            <div className="feed-item">
              <div className="item-time">Il y a 2h</div>
              <div className="item-text">Projet de centre commercial à Ducos : les militants UTILES partagent la pétition.</div>
            </div>
          </div>
        </section>
      </div>
    </>
  );

  const renderCampaigns = () => (
    <div className="campaign-view" style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div className="section-title">
          <Flag size={24} color="#FFD700" />
          <span>Stratégie de Campagnes UTILES</span>
        </div>
      </header>

      <div className="campaign-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {campaigns.map(camp => (
          <div key={camp.id} className="card" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', alignItems: 'center', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{camp.title}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Priorité: {camp.priority}</p>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>{camp.progress}%</div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
                <div style={{ width: `${camp.progress}%`, height: '100%', background: '#008751' }}></div>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Agents</span>
              <div style={{ fontWeight: '700' }}>{camp.sentinelles}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.7rem', background: 'rgba(0,135,81,0.1)', color: '#008751' }}>{camp.status}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <button
                onClick={() => handleLaunchProduction(camp.title)}
                className="nav-item active"
                style={{ border: 'none', padding: '0.5rem 1rem', fontSize: '0.8rem', cursor: 'pointer' }}
              >
                Lancer Prod
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAgents = () => (
    <div className="agents-view" style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <header className="section-title" style={{ marginBottom: '2rem' }}>
        <ShieldCheck size={24} color="#008751" />
        <span>État des Sentinelles AI</span>
      </header>
      <div className="kpi-grid">
        {agentsData.map(agent => (
          <div key={agent.id} className="card">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{agent.name}</h3>
            <p style={{ fontSize: '0.9rem', color: '#008751', fontWeight: 'bold' }}>{agent.role}</p>
            <p style={{ fontSize: '0.8rem', marginTop: '1rem', color: 'var(--text-muted)' }}>Dernière action : {agent.lastAction}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const [studioStatus, setStudioStatus] = useState('idle');
  const [imageProgress, setImageProgress] = useState(0);

  const startStudioProduction = () => {
    setStudioStatus('generating_scripts');
    setTimeout(() => {
      setStudioStatus('generating_images');
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        setImageProgress(count);
        if (count === 7) {
          clearInterval(interval);
          setStudioStatus('tiktok_workflow');
          setTimeout(() => { setStudioStatus('idle'); setImageProgress(0); }, 2000);
        }
      }, 800);
    }, 1500);
  };

  const renderStudio = () => (
    <div className="studio-view" style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <header className="section-title" style={{ marginBottom: '2rem' }}>
        <Video size={24} color="#008751" />
        <span>Studio Clip UTILES</span>
      </header>
      <div className="sections-grid" style={{ gridTemplateColumns: 'minmax(300px, 350px) 1fr' }}>
        <div className="card">
          <h3>Éditeur de Vidéo</h3>
          <textarea style={{ width: '100%', minHeight: '100px', margin: '1rem 0', background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid #333', padding: '1rem', borderRadius: '8px' }} placeholder="Sujet du clip..."></textarea>
          <button onClick={startStudioProduction} style={{ width: '100%', padding: '1rem', background: '#008751', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            {studioStatus === 'idle' ? 'Générer Script & 7 Visuels' : 'Traitement...'}
          </button>
          {studioStatus !== 'idle' && (
            <div style={{ marginTop: '1rem', fontSize: '0.8rem' }}>
              {studioStatus === 'generating_scripts' && "🤖 CrewAI : Analyse et écriture..."}
              {studioStatus === 'generating_images' && `📸 Flux King : Image ${imageProgress}/7...`}
              {studioStatus === 'tiktok_workflow' && "🎬 Lancement Workflow TikTok..."}
            </div>
          )}
        </div>
        <div className="card" style={{ background: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '250px', height: '450px', border: '2px solid #333', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1rem', color: '#666' }}>
            Aperçu Vertical TikTok
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="analytics-view" style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <header className="section-title" style={{ marginBottom: '2rem' }}>
        <TrendingUp size={24} color="#008751" />
        <span>Performances Digitales</span>
      </header>
      <div className="kpi-grid">
        <div className="card">
          <div className="card-header">Croissance Abonnés</div>
          <div className="card-value">+1,240</div>
          <div style={{ height: '100px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData}>
                <Area type="monotone" dataKey="followers" stroke="#008751" fill="#008751" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Clips Publiés</div>
          <div className="card-value">114</div>
          <div style={{ height: '100px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData}>
                <Area type="monotone" dataKey="clips" stroke="#FFD700" fill="#FFD700" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'campaigns': return renderCampaigns();
      case 'sentinelles': return renderAgents();
      case 'studio': return renderStudio();
      case 'analytics': return renderAnalytics();
      default: return renderOverview();
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <Zap size={32} fill="#FFD700" color="#FFD700" />
          <span>UTILES</span>
        </div>
        <nav className="nav-links">
          <button className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <LayoutDashboard size={20} /><span>Vue d'ensemble</span>
          </button>
          <button className={`nav-item ${activeTab === 'campaigns' ? 'active' : ''}`} onClick={() => setActiveTab('campaigns')}>
            <Flag size={20} /><span>Campagnes</span>
          </button>
          <button className={`nav-item ${activeTab === 'sentinelles' ? 'active' : ''}`} onClick={() => setActiveTab('sentinelles')}>
            <ShieldCheck size={20} /><span>Sentinelles AI</span>
          </button>
          <button className={`nav-item ${activeTab === 'studio' ? 'active' : ''}`} onClick={() => setActiveTab('studio')}>
            <Video size={20} /><span>Studio Clip</span>
          </button>
          <button className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
            <TrendingUp size={20} /><span>Analyses</span>
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <div className="header-title">
            <h1>{activeTab.toUpperCase()}</h1>
            <p>Tableau de bord UTILES Martinique</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="card" style={{ padding: '0.5rem 1rem' }}><Search size={16} /></div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#008751' }}></div>
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
