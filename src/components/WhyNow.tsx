import React from 'react';
import { motion } from 'motion/react';
import { Calendar, AlertCircle } from 'lucide-react';

export default function WhyNow() {
  return (
    <section className="py-24 bg-utiles-blue text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-utiles-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-utiles-accent text-utiles-blue px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
              <Calendar size={14} /> Échéance : 15 Mars 2026
            </div>
            <h2 className="text-4xl md:text-6xl mb-8 leading-tight font-black drop-shadow-lg text-white">
              Pourquoi <br /><span className="text-utiles-accent drop-shadow-md">Maintenant ?</span>
            </h2>
            <div className="space-y-6 text-lg text-white/80 leading-relaxed font-medium">
              <p>
                La Martinique est à la croisée des chemins. Nos communes souffrent d'une gestion parfois déconnectée des réalités quotidiennes : coupures d'eau incessantes, manque de transparence budgétaire, et une transition écologique qui tarde à se concrétiser.
              </p>
              <p className="font-black text-white text-xl border-l-4 border-utiles-accent pl-6">
                Le 15 mars n'est pas une simple date électorale. C'est le moment de reprendre en main notre destin local.
              </p>
              <p>
                Attendre, c'est accepter le statu quo. Voter UTILES, c'est choisir une équipe prête à agir dès le premier jour pour des solutions concrètes, indépendantes des jeux de pouvoir traditionnels.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[2.5rem]"
          >
            <div className="flex gap-4 items-start mb-8">
              <div className="p-4 rounded-2xl bg-utiles-accent/20 text-utiles-accent">
                <AlertCircle size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black mb-2 leading-tight">L'Urgence du Changement</h3>
                <p className="text-white/60 text-sm italic font-medium">"Nous n'avons plus le luxe de la patience. Nos enfants méritent des communes résilientes et une gouvernance exemplaire."</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-utiles-accent w-[85%]"></div>
              </div>
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                <span>Mobilisation actuelle</span>
                <span className="text-utiles-accent">85% de l'objectif</span>
              </div>
              <a href="#adherer" className="block w-full text-center bg-white text-utiles-blue font-black py-5 rounded-2xl hover:bg-utiles-accent transition-all transform hover:scale-[1.02] mt-8 uppercase tracking-widest text-sm">
                JE M'ENGAGE POUR LE 15 MARS
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
