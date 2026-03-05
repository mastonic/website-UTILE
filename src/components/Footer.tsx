import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Youtube } from 'lucide-react';
import Logo from './Logo';

const TiktokIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-lg text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <Logo light />
            </Link>
            <p className="text-white/80 max-w-sm mb-6 font-medium">
              Mouvement citoyen pour une transformation utile, écologique et solidaire de la Martinique. Ensemble, construisons l'avenir de nos communes.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/1DfJhRanCQ/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-utiles-accent hover:text-utiles-blue transition-all"><Facebook size={20} /></a>
              <a href="https://www.instagram.com/utilesmartinique?igsh=MWo5NWhsYnBxOGwycw==" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-utiles-accent hover:text-utiles-blue transition-all"><Instagram size={20} /></a>
              <a href="https://www.tiktok.com/@partipolitiqueutiles97.2?_r=1&_t=ZN-94KqpVGL6mc" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-utiles-accent hover:text-utiles-blue transition-all"><TiktokIcon size={20} /></a>
              <a href="https://youtube.com/@utilesmartinique?si=PkAx73A4_c8HdYKV" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-utiles-accent hover:text-utiles-blue transition-all"><Youtube size={20} /></a>
              <a href="mailto:contact@utiles-martinique.fr" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-utiles-accent hover:text-utiles-blue transition-all"><Mail size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-6 text-utiles-accent">Navigation</h4>
            <ul className="space-y-4 text-white/60 font-bold">
              <li><a href="#accueil" className="hover:text-white transition-colors">Accueil</a></li>
              <li><a href="#candidats" className="hover:text-white transition-colors">Candidats</a></li>
              <li><a href="#engagements" className="hover:text-white transition-colors">Engagements</a></li>
              <li><a href="#adherer" className="hover:text-white transition-colors">Adhérer</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-6 text-utiles-accent">Légal</h4>
            <ul className="space-y-4 text-white/60 font-bold">
              <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 text-center text-white/30 text-xs font-bold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} UTILES Martinique. Tous droits réservés. L'action locale. Maintenant.</p>
        </div>
      </div>
    </footer>
  );
}
