import React from 'react';
import { motion } from 'motion/react';
import { Droplets, Landmark, MapPin, Eye } from 'lucide-react';

const anchors = [
  {
    title: "L'Eau : Un Droit, Pas un Luxe",
    desc: "En Martinique, l'accès à l'eau est vital. Nous nous engageons à une rénovation massive des canalisations pour stopper les tours d'eau.",
    icon: Droplets,
    color: "text-blue-400"
  },
  {
    title: "Gestion Municipale Saine",
    desc: "Audit complet des finances dès la prise de fonction. Chaque euro doit être utile au territoire, pas aux apparats.",
    icon: Landmark,
    color: "text-utiles-green"
  },
  {
    title: "Proximité des Quartiers",
    desc: "Des mairies annexes mobiles pour aller au plus près des habitants, des hauteurs du Nord aux plaines du Sud.",
    icon: MapPin,
    color: "text-utiles-accent"
  },
  {
    title: "Transparence Radicale",
    desc: "Diffusion en direct des conseils municipaux et publication simplifiée de tous les marchés publics.",
    icon: Eye,
    color: "text-purple-400"
  }
];

export default function LocalAnchor() {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-white mb-4 font-black drop-shadow-lg">Ancrage Local & Réalités</h2>
          <p className="text-white/90 max-w-2xl mx-auto font-medium drop-shadow-md">Parce que nous vivons les mêmes défis que vous au quotidien sur notre île.</p>
          <div className="w-24 h-1 bg-utiles-accent mx-auto mt-6 shadow-[0_0_10px_rgba(155,213,60,0.5)]"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {anchors.map((anchor, index) => (
            <motion.div
              key={anchor.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-10 rounded-[2.5rem] bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:shadow-2xl transition-all duration-500 group"
            >
              <div className={`mb-8 text-utiles-accent group-hover:scale-110 transition-transform duration-300 drop-shadow-md`}>
                <anchor.icon size={48} />
              </div>
              <h3 className="text-xl font-black text-white mb-4 leading-tight drop-shadow-md">{anchor.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed font-medium">{anchor.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
