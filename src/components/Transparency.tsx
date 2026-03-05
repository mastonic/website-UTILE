import React from 'react';
import { ShieldCheck, Scale, FileText } from 'lucide-react';

export default function Transparency() {
  return (
    <section className="py-16 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="flex gap-6 items-start">
            <div className="text-utiles-accent shrink-0 bg-white/10 backdrop-blur-md p-3 rounded-2xl shadow-sm border border-white/10"><ShieldCheck size={28} /></div>
            <div>
              <h4 className="font-black text-xs uppercase mb-3 tracking-widest text-white">Responsable Publication</h4>
              <p className="text-[11px] text-white/70 leading-relaxed font-medium">
                Association de Financement UTILES Martinique. <br/>
                Directeur de publication : Trésorier de l'antenne locale.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="text-utiles-accent shrink-0 bg-white/10 backdrop-blur-md p-3 rounded-2xl shadow-sm border border-white/10"><Scale size={28} /></div>
            <div>
              <h4 className="font-black text-xs uppercase mb-3 tracking-widest text-white">Conformité des Dons</h4>
              <p className="text-[11px] text-white/70 leading-relaxed font-medium">
                Les dons sont plafonnés selon la législation électorale en vigueur. Un reçu fiscal sera émis pour chaque contribution définitive.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="text-utiles-accent shrink-0 bg-white/10 backdrop-blur-md p-3 rounded-2xl shadow-sm border border-white/10"><FileText size={28} /></div>
            <div>
              <h4 className="font-black text-xs uppercase mb-3 tracking-widest text-white">Respect RGPD</h4>
              <p className="text-[11px] text-white/70 leading-relaxed font-medium">
                Vos données sont traitées exclusivement pour la communication de la campagne. Vous disposez d'un droit d'accès et de suppression.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
