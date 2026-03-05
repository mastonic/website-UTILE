import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, User, Eye, Target, Zap, Rocket, Plus } from 'lucide-react';
import CandidateModal from './CandidateModal';

const getAssetPath = (path: string) => `${(import.meta as any).env.BASE_URL}${path.startsWith('/') ? path.slice(1) : path}`;

const candidates = [
  {
    name: 'Emmanuel Granier',
    commune: 'Fort-de-France',
    role: 'Tête de liste - Mouvement Citoyen Foyalais',
    vision: 'An nou rilévé Foyal',
    bio: 'Chef d\'entreprise engagé, Emmanuel prône une capitale vivante et fière. Son projet "An nou rilévé Foyal" met l\'accent sur la sécurité, la propreté et le rayonnement culturel de Fort-de-France.',
    priorities: [
      'Priorité aux administrés : Accueil et services renforcés',
      'Gestion durable des déchets : Plan "Ville Propre"',
      'Soutien aux commerçants : Redynamisation du centre-ville',
      'Consultation régulière des habitants sur les grands projets',
      'Simplification administrative locale pour les entrepreneurs'
    ],
    image: getAssetPath('assets/candidates/emmanuel-granier.png'),
    isPlaceholder: false,
    program: [
      {
        title: "Vision Municipale",
        icon: <Eye size={24} />,
        content: (
          <div className="space-y-4">
            <p>Fort-de-France doit redevenir le poumon économique et culturel de la Martinique. Ma vision est celle d'une ville qui respire, où chaque quartier se sent intégré au projet communal par une autonomie de décision réelle.</p>
            <p className="font-bold text-utiles-blue">"Une capitale digne, sûre et attractive, gérée par et pour les Foyalais."</p>
          </div>
        )
      },
      {
        title: "3 Priorités Locales",
        icon: <Target size={24} />,
        content: (
          <ul className="space-y-3">
            <li className="flex gap-2 items-start"><CheckCircle2 size={16} className="text-utiles-green mt-1" /> <strong>Priorité aux administrés :</strong> Transparence budgétaire totale et services publics de proximité.</li>
            <li className="flex gap-2 items-start"><CheckCircle2 size={16} className="text-utiles-green mt-1" /> <strong>Gestion durable :</strong> Protection de notre littoral urbain et plan radical de propreté.</li>
            <li className="flex gap-2 items-start"><CheckCircle2 size={16} className="text-utiles-green mt-1" /> <strong>Soutien aux commerçants :</strong> Allègement des contraintes locales et aide à l'installation.</li>
          </ul>
        )
      },
      {
        title: "Mesures Concrètes",
        icon: <Zap size={24} />,
        content: (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-utiles-accent">
              <p className="text-sm font-bold text-utiles-blue mb-1">Audit Citoyen</p>
              <p className="text-xs">Publication mensuelle simplifiée de l'état des finances de la ville.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-utiles-green">
              <p className="text-sm font-bold text-utiles-blue mb-1">Brigade Verte</p>
              <p className="text-xs">Une équipe dédiée 24h/24 au signalement et au traitement des dépôts sauvages.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-utiles-blue">
              <p className="text-sm font-bold text-utiles-blue mb-1">Pass Commerces</p>
              <p className="text-xs">Exonération partielle de taxes locales pour les nouveaux commerces de proximité.</p>
            </div>
          </div>
        )
      },
      {
        title: "Plan 100 Jours",
        icon: <Rocket size={24} />,
        content: (
          <div className="space-y-2">
            <p className="text-sm font-bold">Jour 1-30 :</p>
            <p className="text-xs mb-2">Lancement de l'audit financier et première rencontre avec les associations de commerçants.</p>
            <p className="text-sm font-bold">Jour 31-60 :</p>
            <p className="text-xs mb-2">Déploiement de la première phase du plan "Ville Propre" dans les quartiers prioritaires.</p>
            <p className="text-sm font-bold">Jour 61-100 :</p>
            <p className="text-xs">Mise en place du Conseil Citoyen Permanent pour la validation des projets d'urbanisme.</p>
          </div>
        )
      },
      {
        title: "Appel à Mobilisation",
        icon: <CheckCircle2 size={24} />,
        content: (
          <div className="text-center py-4">
            <p className="mb-6">Le 15 mars, votre voix est le moteur du changement. Rejoignez-nous pour relever Fort-de-France et reprendre le contrôle de notre destin communal.</p>
            <a href="#adherer" className="btn-accent inline-block">Je soutiens Emmanuel</a>
          </div>
        )
      }
    ]
  },
  {
    name: 'Philippe Jean-Marie Alphonsine',
    commune: 'Le Robert',
    role: 'Candidat - An lot vizion ba Wobè',
    vision: 'Le Robert, terre d\'avenir et d\'innovation',
    bio: 'Gérant de structure et ancien fonctionnaire, Philippe s\'engage pour un Robert propre, sûr et innovant. Il porte une vision forte pour le développement économique et la protection du littoral robertin.',
    priorities: [
      'Décisions budgétaires transparentes pour le Robert',
      'Protection du littoral et gestion des sargasses',
      'Soutien à l\'agriculture locale et à la pêche',
      'Consultation régulière des habitants du Robert',
      'Simplification administrative pour nos entrepreneurs'
    ],
    image: getAssetPath('assets/candidates/philippe-jean-marie-alphonsine.png'),
    isPlaceholder: false,
    program: [
      {
        title: "Vision Municipale",
        icon: <Eye size={24} />,
        content: (
          <div className="space-y-4">
            <p>Le Robert doit exploiter son potentiel maritime tout en protégeant son environnement. Ma vision allie tradition et modernité pour un Robert prospère et autonome dans ses choix de développement.</p>
            <p className="font-bold text-utiles-blue">"Protéger notre baie, financer notre avenir par une gestion locale rigoureuse."</p>
          </div>
        )
      },
      {
        title: "3 Priorités Locales",
        icon: <Target size={24} />,
        content: (
          <ul className="space-y-3">
            <li className="flex gap-2 items-start"><CheckCircle2 size={16} className="text-utiles-green mt-1" /> <strong>Priorité aux administrés :</strong> Un conseil municipal à l'écoute et des finances saines.</li>
            <li className="flex gap-2 items-start"><CheckCircle2 size={16} className="text-utiles-green mt-1" /> <strong>Protection du littoral :</strong> Lutte active contre les sargasses et corps-morts écologiques.</li>
            <li className="flex gap-2 items-start"><CheckCircle2 size={16} className="text-utiles-green mt-1" /> <strong>Agriculture locale :</strong> Soutien direct aux producteurs pour l'autonomie alimentaire.</li>
          </ul>
        )
      },
      {
        title: "Mesures Concrètes",
        icon: <Zap size={24} />,
        content: (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-utiles-accent">
              <p className="text-sm font-bold text-utiles-blue mb-1">Corps-morts écologiques</p>
              <p className="text-xs">Générer des revenus pour la commune tout en protégeant les fonds marins.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-utiles-green">
              <p className="text-sm font-bold text-utiles-blue mb-1">Marché Local Renforcé</p>
              <p className="text-xs">Aménagement d'un pôle de vente directe pour les agriculteurs et pêcheurs robertins.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-utiles-blue">
              <p className="text-sm font-bold text-utiles-blue mb-1">Guichet Unique Entrepreneur</p>
              <p className="text-xs">Un interlocuteur dédié en mairie pour faciliter toutes les démarches locales.</p>
            </div>
          </div>
        )
      },
      {
        title: "Plan 100 Jours",
        icon: <Rocket size={24} />,
        content: (
          <div className="space-y-2">
            <p className="text-sm font-bold">Jour 1-30 :</p>
            <p className="text-xs mb-2">Lancement du plan d'urgence propreté du littoral et audit des services.</p>
            <p className="text-sm font-bold">Jour 31-60 :</p>
            <p className="text-xs mb-2">Première assise de l'agriculture locale pour définir les aides directes.</p>
            <p className="text-sm font-bold">Jour 61-100 :</p>
            <p className="text-xs">Mise en place des budgets participatifs par quartier.</p>
          </div>
        )
      },
      {
        title: "Appel à Mobilisation",
        icon: <CheckCircle2 size={24} />,
        content: (
          <div className="text-center py-4">
            <p className="mb-6">Le Robert a besoin d'une nouvelle énergie, d'une vision d'avenir portée par ses habitants. Le 15 mars, votez pour le changement utile.</p>
            <a href="#adherer" className="btn-accent inline-block">Je soutiens Philippe</a>
          </div>
        )
      }
    ]
  },
  {
    name: 'À venir',
    commune: 'Martinique',
    role: 'Candidat UTILES',
    vision: 'L\'action locale partout en Martinique',
    bio: 'Un nouveau visage pour une gestion communale transparente et autonome. Bientôt dévoilé pour porter nos couleurs dans votre commune.',
    priorities: [
      'Priorité aux administrés',
      'Protection de l\'environnement local',
      'Soutien à l\'économie de proximité'
    ],
    image: '',
    program: []
  }
];

const supportedCandidates = [
  {
    name: 'Louis Marie-Sainte',
    commune: 'Ducos',
    role: 'Candidat Soutenu',
    vision: 'Ducos, cœur battant de la Martinique',
    bio: 'Un engagement fort pour le développement économique et social de Ducos. Louis Marie-Sainte incarne la rigueur et la proximité nécessaires pour relever les défis de la commune.',
    priorities: [
      'Développement économique local',
      'Sécurité et prévention',
      'Animation culturelle et sportive'
    ],
    image: '',
    program: []
  },
  {
    name: 'Alain-Claude Lagier',
    commune: 'Le François',
    role: 'Candidat Soutenu',
    vision: 'Le François, terre de traditions et d\'avenir',
    bio: 'Pour une gestion transparente et participative au François. Alain-Claude Lagier porte un projet ambitieux pour valoriser le patrimoine franciscain et moderniser les services publics.',
    priorities: [
      'Protection du littoral et des fonds marins',
      'Soutien aux marins-pêcheurs',
      'Modernisation des services municipaux'
    ],
    image: '',
    program: []
  }
];

const CandidateCard: React.FC<{ candidate: any; index: number; onOpenModal: (c: any) => void }> = ({ candidate, index, onOpenModal }) => (
    <div 
      className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-utiles-blue/5 flex flex-col h-full hover:shadow-2xl hover:border-utiles-accent/50 transition-all duration-300 group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-utiles-accent/5 rounded-bl-[100px] -z-0 transition-all duration-500 group-hover:scale-150 group-hover:bg-utiles-accent/10"></div>
      <div className="relative rounded-[2rem] overflow-hidden mb-8 aspect-[3/4] shadow-lg bg-gradient-to-br from-utiles-blue-deep to-utiles-blue group-hover:shadow-2xl transition-all duration-700">
        <div className="absolute inset-0 flex items-center justify-center text-white/10 group-hover:scale-110 transition-transform duration-700">
            <User size={120} />
        </div>
        {candidate.image && (
          <img 
            src={candidate.image} 
            alt={candidate.name}
            className="w-full h-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
        <div className="absolute top-6 right-6 z-20 bg-utiles-accent text-utiles-blue text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
          {candidate.commune}
        </div>
        {!candidate.image && (
          <div className="absolute inset-x-0 bottom-0 p-8 z-20 bg-gradient-to-t from-utiles-blue-deep/90 to-transparent">
            <p className="text-white text-[10px] font-black uppercase tracking-[0.3em] text-center">Candidat UTILES</p>
          </div>
        )}
      </div>

      <div className="flex-grow px-2">
        <h3 className="text-2xl text-utiles-blue mb-2 font-black leading-tight">{candidate.name}</h3>
        <p className="text-utiles-blue font-black uppercase text-[10px] tracking-widest mb-8 opacity-60">{candidate.role}</p>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-8 italic font-medium border-l-2 border-utiles-accent pl-4">
          "{candidate.bio}"
        </p>

        <div className="space-y-4 mb-8">
          <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Priorités municipales :</p>
          {candidate.priorities.slice(0, 3).map((p: string, i: number) => (
            <div key={i} className="flex gap-3 items-start">
              <CheckCircle2 size={16} className="text-utiles-blue shrink-0 mt-0.5" />
              <span className="text-xs text-gray-700 font-medium">{p}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-8 border-t border-utiles-blue/5 mt-auto px-2">
        {candidate.program.length > 0 ? (
          <button 
            onClick={() => onOpenModal(candidate)}
            className="flex items-center justify-between w-full text-utiles-blue font-black text-[10px] uppercase tracking-widest group"
          >
            Découvrir le programme <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        ) : candidate.isPlaceholder ? (
          <a 
            href="#contact"
            className="flex items-center justify-between w-full text-utiles-blue font-black text-[10px] uppercase tracking-widest group"
          >
            Rejoindre le mouvement <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
          </a>
        ) : (
          <span className="text-gray-400 font-black text-[10px] uppercase tracking-widest italic">Programme bientôt disponible</span>
        )}
      </div>
    </div>
  );

export default function Candidates() {
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (candidate: any) => {
    if (!candidate.program || candidate.program.length === 0) return;
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  return (
    <section id="candidats" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl text-white mb-6 font-black drop-shadow-lg">Nos Candidats Municipaux</h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg font-medium drop-shadow-md">Des leaders locaux engagés pour une transformation utile et durable de nos territoires.</p>
          <div className="w-24 h-1 bg-utiles-accent mx-auto mt-6 shadow-[0_0_10px_rgba(155,213,60,0.5)]"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-24">
          {candidates.map((candidate, index) => (
            <CandidateCard key={candidate.name + index} candidate={candidate} index={index} onOpenModal={openModal} />
          ))}
        </div>

        {/* Section Candidats Soutenus */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-white mb-6 font-black drop-shadow-lg">Candidats que nous soutenons</h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg font-medium drop-shadow-md">Ils partagent nos valeurs et notre vision pour la Martinique. Nous leur apportons notre soutien total.</p>
          <div className="w-24 h-1 bg-utiles-accent mx-auto mt-6 shadow-[0_0_10px_rgba(155,213,60,0.5)]"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto justify-center">
          {supportedCandidates.map((candidate, index) => (
            <CandidateCard key={candidate.name + index} candidate={candidate} index={index} onOpenModal={openModal} />
          ))}
        </div>
      </div>

      <CandidateModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        candidate={selectedCandidate} 
      />
    </section>
  );
}
