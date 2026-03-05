import { Landmark, Users, Leaf } from 'lucide-react';
import { motion } from 'motion/react';

const pillars = [
  {
    title: 'Souveraineté locale',
    description: 'Décider localement pour réduire la dépendance extérieure et reprendre en main notre destin communal.',
    icon: Landmark,
    color: 'text-utiles-blue'
  },
  {
    title: 'Autodétermination communale',
    description: 'Donner plus de pouvoir aux collectivités pour gérer leur territoire au plus près des réalités du terrain.',
    icon: Users,
    color: 'text-utiles-blue'
  },
  {
    title: 'Écologie responsable',
    description: 'Protection du littoral, propreté durable, gestion des déchets et développement maîtrisé pour nos communes.',
    icon: Leaf,
    color: 'text-utiles-blue'
  }
];

export default function Why() {
  return (
    <section id="engagements" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl text-white mb-6 font-black drop-shadow-lg">Nos Engagements Municipaux</h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg font-medium drop-shadow-md">Une vision structurée pour transformer durablement nos communes martiniquaises.</p>
          <div className="w-24 h-1 bg-utiles-accent mx-auto mt-6 shadow-[0_0_10px_rgba(155,213,60,0.5)]"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div 
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-[2.5rem] p-10 shadow-2xl border border-white/20 text-center hover:translate-y-[-5px] transition-all duration-300 group hover:bg-white/20"
            >
              <div className={`inline-flex p-6 rounded-3xl bg-white/10 mb-8 text-utiles-accent group-hover:bg-utiles-accent group-hover:text-utiles-blue transition-colors duration-300 shadow-inner`}>
                <pillar.icon size={40} />
              </div>
              <h3 className="text-2xl text-white mb-6 font-black leading-tight drop-shadow-md">{pillar.title}</h3>
              <p className="text-white/80 leading-relaxed font-medium">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
