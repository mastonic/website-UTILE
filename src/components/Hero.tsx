import React from 'react';
import { motion } from 'motion/react';
import StickerLogo from './StickerLogo';
import Countdown from './Countdown';
import { Calendar, Facebook, Instagram, Youtube } from 'lucide-react';

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

export default function Hero() {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center pt-24 lg:pt-32 pb-16">
      {/* Background Pattern & Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="/assets/martinique/baie-robert.jpg" 
          alt="Martinique" 
          className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-black/20 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 sm:mb-8">
              <div className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] flex items-center justify-center -ml-2 sm:-ml-4">
                <StickerLogo className="scale-50 sm:scale-75" />
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 sm:p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-utiles-accent text-utiles-blue">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-white/60 leading-none mb-1">Élections Municipales</p>
                  <p className="text-sm font-bold text-white">Dimanche 15 Mars 2026</p>
                </div>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl text-white leading-tight mb-6 font-black drop-shadow-2xl max-w-2xl">
              Souveraineté locale.<br />
              Autodétermination communale.<br />
              <span className="text-utiles-accent">Écologie responsable.</span>
            </h1>
            
            <p className="text-lg md:text-2xl font-medium text-white/90 mb-8 leading-relaxed italic border-l-4 border-utiles-accent pl-6 drop-shadow-lg bg-black/10 py-2 pr-4 rounded-r-xl">
              “Décider ici pour agir ici. Protéger nos communes. Construire notre avenir.”
            </p>

            <div className="mb-10">
              <p className="text-[10px] font-black uppercase text-white/60 mb-4 tracking-widest">Compte à rebours avant le scrutin :</p>
              <Countdown />
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#adherer" className="btn-accent shadow-lg shadow-utiles-blue/50">
                Je m'engage pour le 15 mars
              </a>
              <a href="#donner" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold py-3 px-8 rounded-full transition-all backdrop-blur-sm shadow-lg">
                Soutenir l'action
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative pl-12"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[4/3] gradient-bg flex items-center justify-center p-12">
              <img 
                src="/assets/martinique/baie-robert.jpg" 
                alt="Martinique Paysage" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <div className="relative z-20 text-center">
                 <div className="bg-white p-6 rounded-3xl inline-block mb-6 shadow-xl">
                    <span className="text-6xl font-black tracking-tighter text-utiles-blue">UTILES</span>
                 </div>
                 <p className="text-white font-black text-2xl uppercase tracking-[0.3em]">Martinique</p>
              </div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-utiles-accent p-6 rounded-2xl shadow-xl z-20 max-w-[200px]">
              <p className="text-utiles-blue font-black text-2xl leading-none mb-1">2026</p>
              <p className="text-utiles-blue font-bold uppercase text-xs tracking-tighter">Transformation Utile</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
