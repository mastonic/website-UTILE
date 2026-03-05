import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserPlus, Download, CheckCircle } from 'lucide-react';

export default function JoinForm() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    commune: '',
    confirm: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('utiles_adhesions') || '[]');
    localStorage.setItem('utiles_adhesions', JSON.stringify([...existing, { ...formData, date: new Date().toISOString() }]));
    setSubmitted(true);
  };

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `adhesion_utiles_${formData.nom}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <section id="adherer" className="py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-shadow overflow-hidden">
          <div className="bg-utiles-blue p-8 text-center text-white">
            <UserPlus className="mx-auto mb-4" size={40} />
            <h2 className="text-3xl mb-2">Devenir Adhérent</h2>
            <p className="text-white/70">Rejoignez le mouvement UTILES Martinique</p>
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="grid md:grid-cols-2 gap-6"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Nom</label>
                    <input 
                      required
                      type="text" 
                      className="w-full border-b-2 border-gray-200 focus:border-utiles-blue outline-none py-2 transition-colors"
                      value={formData.nom}
                      onChange={e => setFormData({...formData, nom: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Prénom</label>
                    <input 
                      required
                      type="text" 
                      className="w-full border-b-2 border-gray-200 focus:border-utiles-blue outline-none py-2 transition-colors"
                      value={formData.prenom}
                      onChange={e => setFormData({...formData, prenom: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Email</label>
                    <input 
                      required
                      type="email" 
                      className="w-full border-b-2 border-gray-200 focus:border-utiles-blue outline-none py-2 transition-colors"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Téléphone</label>
                    <input 
                      required
                      type="tel" 
                      className="w-full border-b-2 border-gray-200 focus:border-utiles-blue outline-none py-2 transition-colors"
                      value={formData.telephone}
                      onChange={e => setFormData({...formData, telephone: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Commune</label>
                    <select 
                      required
                      className="w-full border-b-2 border-gray-200 focus:border-utiles-blue outline-none py-2 transition-colors bg-transparent"
                      value={formData.commune}
                      onChange={e => setFormData({...formData, commune: e.target.value})}
                    >
                      <option value="">Sélectionnez votre commune</option>
                      <option value="Fort-de-France">Fort-de-France</option>
                      <option value="Le Lamentin">Le Lamentin</option>
                      <option value="Le Robert">Le Robert</option>
                      <option value="Schoelcher">Schoelcher</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 flex items-center gap-3 py-4">
                    <input 
                      required
                      type="checkbox" 
                      id="confirm-join"
                      className="w-5 h-5 accent-utiles-blue"
                      checked={formData.confirm}
                      onChange={e => setFormData({...formData, confirm: e.target.checked})}
                    />
                    <label htmlFor="confirm-join" className="text-sm text-gray-600">
                      Je confirme vouloir adhérer au mouvement UTILES Martinique.
                    </label>
                  </div>
                  <div className="md:col-span-2">
                    <button type="submit" className="w-full btn-accent">
                      Valider mon adhésion
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex p-4 rounded-full bg-utiles-green/10 text-utiles-green mb-6">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-2xl text-utiles-blue mb-2">Bienvenue parmi nous !</h3>
                  <p className="text-gray-600 mb-8">Votre demande d'adhésion a été enregistrée avec succès.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={exportData}
                      className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-full transition-all"
                    >
                      <Download size={18} /> Exporter mes infos (JSON)
                    </button>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="text-utiles-blue font-bold hover:underline"
                    >
                      Nouvelle adhésion
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
