import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CreditCard, ShieldCheck, Clock } from 'lucide-react';

export default function Payment() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-utiles-blue font-bold mb-8 hover:translate-x-[-5px] transition-transform">
          <ArrowLeft size={20} /> Retour au site
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-shadow p-12 text-center"
        >
          <div className="inline-flex p-6 rounded-full bg-utiles-blue/5 text-utiles-blue mb-8">
            <CreditCard size={64} />
          </div>
          
          <h1 className="text-3xl text-utiles-blue mb-6">Paiement Sécurisé</h1>
          
          <div className="bg-utiles-accent/10 border-2 border-utiles-accent/20 rounded-2xl p-8 mb-10">
            <div className="flex items-center justify-center gap-3 text-utiles-blue mb-4">
              <Clock size={24} />
              <span className="font-bold uppercase tracking-widest">Bientôt disponible</span>
            </div>
            <p className="text-utiles-blue/80 leading-relaxed">
              L'intégration de nos plateformes de paiement partenaires (HelloAsso / Stripe) est en cours de finalisation technique. 
              <br/><br/>
              Votre intention de don a bien été enregistrée. Notre trésorier prendra contact avec vous par email pour vous proposer les modalités de règlement alternatives (virement ou chèque).
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 text-left">
            <div className="flex gap-4 items-start">
              <div className="text-utiles-green mt-1"><ShieldCheck size={24} /></div>
              <div>
                <h3 className="font-bold text-utiles-blue mb-1">Sécurité Garantie</h3>
                <p className="text-sm text-gray-500">Toutes vos données sont cryptées et protégées selon les normes en vigueur.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="text-utiles-green mt-1"><ShieldCheck size={24} /></div>
              <div>
                <h3 className="font-bold text-utiles-blue mb-1">Transparence Totale</h3>
                <p className="text-sm text-gray-500">Chaque don est tracé et utilisé exclusivement pour le financement de la campagne.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-gray-100">
            <Link to="/" className="btn-accent inline-block">
              Retourner à l'accueil
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
