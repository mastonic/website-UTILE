import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, FileText, CreditCard, CheckCircle } from 'lucide-react';
import { jsPDF } from 'jspdf';

const quickAmounts = [10, 25, 50];

export default function DonateForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    montant: 25,
    customMontant: '',
    confirm: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleAmountSelect = (amount: number) => {
    setFormData({ ...formData, montant: amount, customMontant: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = formData.customMontant ? parseFloat(formData.customMontant) : formData.montant;
    
    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('utiles_dons') || '[]');
    localStorage.setItem('utiles_dons', JSON.stringify([...existing, { 
      ...formData, 
      montant: finalAmount,
      date: new Date().toISOString(),
      ref: Math.random().toString(36).substring(2, 10).toUpperCase()
    }]));
    
    setSubmitted(true);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const finalAmount = formData.customMontant ? formData.customMontant : formData.montant;
    const date = new Date().toLocaleDateString('fr-FR');
    const ref = Math.random().toString(36).substring(2, 10).toUpperCase();

    doc.setFontSize(22);
    doc.setTextColor(14, 90, 122); // Utiles Blue
    doc.text('REÇU D\'INTENTION DE DON', 105, 30, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(43, 43, 43);
    doc.text(`Mouvement UTILES Martinique`, 105, 45, { align: 'center' });
    
    doc.line(20, 55, 190, 55);
    
    doc.text(`Donateur : ${formData.prenom} ${formData.nom}`, 20, 70);
    doc.text(`Email : ${formData.email}`, 20, 80);
    doc.text(`Date : ${date}`, 20, 90);
    doc.text(`Référence : ${ref}`, 20, 100);
    
    doc.setFontSize(16);
    doc.text(`Montant : ${finalAmount} €`, 20, 120);
    
    doc.setFontSize(10);
    doc.text('Ceci est un document attestant de votre intention de don.', 105, 150, { align: 'center' });
    doc.text('Merci pour votre soutien à la transformation utile de la Martinique.', 105, 155, { align: 'center' });
    
    doc.save(`recu_don_utiles_${formData.nom}.pdf`);
  };

  return (
    <section id="donner" className="py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-shadow overflow-hidden">
          <div className="bg-utiles-blue p-8 text-center text-white">
            <Heart className="mx-auto mb-4" size={40} />
            <h2 className="text-3xl mb-2">Soutenir UTILES</h2>
            <p className="text-white/70">Votre don est le moteur de notre indépendance</p>
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
                  className="space-y-8"
                >
                  <div className="grid md:grid-cols-2 gap-6">
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
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-500">Email</label>
                      <input 
                        required
                        type="email" 
                        className="w-full border-b-2 border-gray-200 focus:border-utiles-blue outline-none py-2 transition-colors"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase text-gray-500 block">Montant du don</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {quickAmounts.map(amount => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => handleAmountSelect(amount)}
                          className={`py-3 rounded-xl font-bold transition-all ${formData.montant === amount && !formData.customMontant ? 'bg-utiles-blue text-white shadow-md' : 'bg-white border-2 border-gray-100 text-gray-600 hover:border-utiles-blue'}`}
                        >
                          {amount} €
                        </button>
                      ))}
                      <div className="relative">
                        <input 
                          type="number" 
                          placeholder="Libre"
                          className={`w-full py-3 px-4 rounded-xl font-bold border-2 outline-none transition-all ${formData.customMontant ? 'border-utiles-blue bg-white' : 'border-gray-100 bg-white'}`}
                          value={formData.customMontant}
                          onChange={e => setFormData({...formData, customMontant: e.target.value, montant: 0})}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 py-2">
                    <input 
                      required
                      type="checkbox" 
                      id="confirm-donate"
                      className="w-5 h-5 accent-utiles-blue"
                      checked={formData.confirm}
                      onChange={e => setFormData({...formData, confirm: e.target.checked})}
                    />
                    <label htmlFor="confirm-donate" className="text-sm text-gray-600">
                      Je confirme être majeur et autorisé à faire un don.
                    </label>
                  </div>

                  <button type="submit" className="w-full btn-accent">
                    Confirmer mon intention de don
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex p-4 rounded-full bg-utiles-blue/10 text-utiles-blue mb-6">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-2xl text-utiles-blue mb-2">Merci pour votre soutien !</h3>
                  <p className="text-gray-600 mb-8">Votre intention de don a été enregistrée. Vous pouvez maintenant procéder au paiement.</p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                    <button 
                      onClick={generatePDF}
                      className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-utiles-blue text-gray-700 font-bold py-4 px-6 rounded-2xl transition-all"
                    >
                      <FileText size={20} /> Reçu (PDF)
                    </button>
                    <button 
                      onClick={() => navigate('/paiement')}
                      className="flex items-center justify-center gap-2 bg-utiles-blue hover:bg-opacity-90 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition-all"
                    >
                      <CreditCard size={20} /> Payer en ligne
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-utiles-blue font-bold hover:underline"
                  >
                    Faire un autre don
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
