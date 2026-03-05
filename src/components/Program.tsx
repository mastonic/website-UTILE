import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const engagements = [
  {
    title: 'Plan Eau d\'Urgence',
    desc: 'Sécuriser l\'accès à l\'eau potable pour tous et rénover les réseaux de distribution vétustes.'
  },
  {
    title: 'Autonomie Alimentaire',
    desc: 'Soutenir nos agriculteurs locaux et favoriser les circuits courts dans les cantines scolaires.'
  },
  {
    title: 'Transition Énergétique',
    desc: 'Développer le solaire communal et réduire la facture énergétique des bâtiments publics.'
  },
  {
    title: 'Démocratie Permanente',
    desc: 'Mise en place de conseils de quartier dotés d\'un budget d\'investissement propre.'
  },
  {
    title: 'Mobilités Douces',
    desc: 'Aménager des pistes cyclables sécurisées et renforcer les transports collectifs de proximité.'
  }
];

export default function Program() {
  return (
    <section id="priorites" className="py-24 text-white overflow-hidden relative z-10">
      <div className="absolute inset-0 z-0">
        <img src="/assets/martinique/montagne-pelee.jpg" className="w-full h-full object-cover opacity-10" onError={(e) => (e.currentTarget.style.display = 'none')} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl mb-8 font-black leading-tight text-white drop-shadow-lg">5 Priorités <br/><span className="text-utiles-accent drop-shadow-md">Municipales</span></h2>
            <p className="text-xl text-white/80 mb-12 font-medium drop-shadow-md">
              Nous ne faisons pas de promesses en l'air. Voici nos priorités immédiates pour transformer notre quotidien dès le premier jour.
            </p>
            <div className="space-y-8">
              {engagements.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 items-start group"
                >
                  <div className="mt-1 text-utiles-accent group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-2 leading-tight">{item.title}</h3>
                    <p className="text-white/60 text-sm font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <motion.div 
                  animate={{ 
                    rotate: [0, -1, 1, -1, 0], 
                    x: [0, -1, 1, -1, 0],
                    y: [0, 1, -1, 0]
                  }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                  className="aspect-[3/4] rounded-[2.5rem] shadow-2xl bg-white/5 border border-white/10 flex items-center justify-center p-10 overflow-hidden relative backdrop-blur-sm"
                >
                   <img src="/assets/martinique/montagne-pelee.jpg" className="absolute inset-0 w-full h-full object-cover opacity-20" onError={(e) => (e.currentTarget.style.display = 'none')} />
                   <span className="relative z-10 font-black text-5xl text-utiles-accent drop-shadow-lg">EAU</span>
                </motion.div>
                <motion.div 
                  animate={{ 
                    rotate: [0, 1, -1, 1, 0], 
                    x: [0, 1, -1, 1, 0],
                    y: [0, -1, 1, 0]
                  }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 4, delay: 1 }}
                  className="aspect-square rounded-[2.5rem] shadow-2xl bg-utiles-accent flex items-center justify-center p-10 transform -rotate-3"
                >
                   <span className="font-black text-3xl text-utiles-blue text-center leading-tight drop-shadow-sm">ACTION LOCALE</span>
                </motion.div>
              </div>
              <div className="space-y-6 pt-16">
                <motion.div 
                  animate={{ 
                    rotate: [0, -1, 1, -1, 0], 
                    x: [0, -1, 1, -1, 0],
                    y: [0, 1, -1, 0]
                  }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3.5, delay: 0.5 }}
                  className="aspect-square rounded-[2.5rem] shadow-2xl bg-white flex items-center justify-center p-10 transform rotate-3"
                >
                   <span className="font-black text-3xl text-utiles-blue text-center leading-tight drop-shadow-sm">ÉCOLOGIE</span>
                </motion.div>
                <motion.div 
                  animate={{ 
                    rotate: [0, 1, -1, 1, 0], 
                    x: [0, 1, -1, 1, 0],
                    y: [0, -1, 1, 0]
                  }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 4.5, delay: 1.5 }}
                  className="aspect-[3/4] rounded-[2.5rem] shadow-2xl bg-white/5 border border-white/10 flex items-center justify-center p-10 overflow-hidden relative backdrop-blur-sm"
                >
                   <img src="/assets/martinique/littoral.jpg" className="absolute inset-0 w-full h-full object-cover opacity-20" onError={(e) => (e.currentTarget.style.display = 'none')} />
                   <span className="relative z-10 font-black text-5xl text-utiles-accent drop-shadow-lg">FUTUR</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
