import React from 'react';
import { motion } from 'motion/react';
import { Globe, Shield, Zap } from 'lucide-react';

export default function AboutMovement() {
  return (
    <section className="py-24 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl text-white mb-8 drop-shadow-lg">À propos du mouvement <span className="text-utiles-accent font-black">UTILES</span></h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed font-medium drop-shadow-md">
              UTILES (Ultra-marins, Territoires, Indépendants, Liberté - Écologie et Solidarité) est un mouvement politique né de la volonté de redonner le pouvoir aux territoires. 
            </p>
            <p className="text-white/80 mb-12 leading-relaxed font-medium">
              Au-delà de l'action municipale, nous portons une vision de société où l'indépendance d'esprit et l'écologie concrète sont les moteurs du progrès. Nous refusons les clivages partisans stériles pour nous concentrer sur ce qui est réellement utile aux citoyens.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-3xl bg-white/10 backdrop-blur-md shadow-xl border border-white/20">
                <Globe className="mx-auto mb-3 text-utiles-accent" size={28} />
                <p className="text-[10px] font-black uppercase tracking-widest text-white">Réseau National</p>
              </div>
              <div className="text-center p-6 rounded-3xl bg-white/10 backdrop-blur-md shadow-xl border border-white/20">
                <Shield className="mx-auto mb-3 text-utiles-accent" size={28} />
                <p className="text-[10px] font-black uppercase tracking-widest text-white">Éthique & Valeurs</p>
              </div>
              <div className="text-center p-6 rounded-3xl bg-white/10 backdrop-blur-md shadow-xl border border-white/20">
                <Zap className="mx-auto mb-3 text-utiles-accent" size={28} />
                <p className="text-[10px] font-black uppercase tracking-widest text-white">Action Directe</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl relative flex items-center justify-center p-12 border border-white/20">
              <div className="absolute inset-0 opacity-20">
                 <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-utiles-accent"></div>
              </div>
              <div className="relative z-10 text-center">
                <h3 className="text-4xl text-white font-black leading-tight mb-8 drop-shadow-lg">
                  "L'indépendance au service du territoire."
                </h3>
                <div className="inline-block bg-utiles-accent text-utiles-blue font-black px-6 py-2 rounded-full text-sm uppercase tracking-widest shadow-lg">
                   Mouvement UTILES
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-utiles-accent rounded-full -z-10 blur-2xl opacity-30"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
