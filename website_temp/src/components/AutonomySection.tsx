import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Users, Landmark, Scale } from 'lucide-react';

export default function AutonomySection() {
  const points = [
    {
      icon: <Landmark className="text-utiles-accent" size={32} />,
      title: "Décider localement",
      description: "L'autonomie, c'est la liberté pour notre conseil municipal de fixer ses propres priorités budgétaires en fonction des besoins réels de nos quartiers, sans subir de directives lointaines."
    },
    {
      icon: <Users className="text-utiles-accent" size={32} />,
      title: "Démocratie participative",
      description: "Nous redonnons le pouvoir aux citoyens. Chaque grand projet municipal sera soumis à la consultation des habitants. Votre avis devient le moteur de l'action publique."
    },
    {
      icon: <ShieldCheck className="text-utiles-accent" size={32} />,
      title: "Gestion transparente",
      description: "Une commune autonome est une commune responsable. Nous nous engageons à une transparence totale sur l'utilisation de chaque euro public, avec des audits citoyens réguliers."
    },
    {
      icon: <Scale className="text-utiles-accent" size={32} />,
      title: "Économie de proximité",
      description: "Favoriser les circuits courts et les entreprises locales dans nos marchés publics pour que l'argent des Martiniquais serve directement au développement de la Martinique."
    }
  ];

  return (
    <section className="py-24 text-white overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-utiles-accent/10 rounded-full blur-3xl mix-blend-overlay"></div>
        
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-6xl font-black mb-6 leading-tight drop-shadow-lg text-white">
              Autonomie locale et <br /><span className="text-utiles-accent drop-shadow-md">action municipale</span>
            </h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 max-w-3xl mx-auto text-xl font-medium"
          >
            L'autonomie n'est pas un concept abstrait. C'est la capacité d'agir ici, pour vous, avec vous. Découvrez comment nous traduisons nos valeurs en actions concrètes pour votre quotidien.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500 group"
            >
              <div className="mb-8 group-hover:scale-110 transition-transform duration-300">
                {point.icon}
              </div>
              <h3 className="text-xl font-black mb-4 text-utiles-accent leading-tight">{point.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed font-medium">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-12 rounded-[3rem] bg-gradient-to-br from-utiles-accent/20 to-transparent border border-utiles-accent/30 text-center backdrop-blur-sm"
        >
          <h3 className="text-3xl font-black mb-6 text-white">Ce que cela change pour vous ?</h3>
          <p className="text-white/80 max-w-2xl mx-auto text-lg font-medium">
            C'est la garantie que vos impôts sont utilisés pour vos routes, vos écoles et votre sécurité, selon des décisions prises par des élus qui vivent dans votre commune et vous rendent des comptes directement.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
