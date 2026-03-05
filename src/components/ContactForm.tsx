import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mail, Phone, Facebook, Instagram, CheckCircle, Youtube } from 'lucide-react';

const TiktokIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('utiles_contact') || '[]');
    localStorage.setItem('utiles_contact', JSON.stringify([...existing, { ...formData, date: new Date().toISOString() }]));
    
    // Open Mailto
    const mailtoUrl = `mailto:contact@utiles-martinique.fr?subject=${encodeURIComponent(formData.sujet)}&body=${encodeURIComponent(`De: ${formData.nom}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    window.location.href = mailtoUrl;
    
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl text-white mb-6 drop-shadow-lg">Nous Contacter</h2>
            <p className="text-white/80 mb-12 text-lg font-medium drop-shadow-md">
              Une question ? Une suggestion ? Envie de nous rencontrer ? N'hésitez pas à nous écrire.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-white/10 backdrop-blur-md text-utiles-accent border border-white/20">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-white/60">Email</p>
                  <p className="text-lg font-semibold text-white">contact@utiles-martinique.fr</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-white/10 backdrop-blur-md text-utiles-accent border border-white/20">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-white/60">Téléphone</p>
                  <p className="text-lg font-semibold text-white">0596 00 00 00</p>
                </div>
              </div>
              <div className="pt-4 flex gap-4">
                <a href="https://www.facebook.com/share/1DfJhRanCQ/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/10 text-white hover:bg-utiles-accent hover:text-utiles-blue transition-all border border-white/20">
                  <Facebook size={20} />
                </a>
                <a href="https://www.instagram.com/utilesmartinique?igsh=MWo5NWhsYnBxOGwycw==" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/10 text-white hover:bg-utiles-accent hover:text-utiles-blue transition-all border border-white/20">
                  <Instagram size={20} />
                </a>
                <a href="https://www.tiktok.com/@partipolitiqueutiles97.2?_r=1&_t=ZN-94KqpVGL6mc" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/10 text-white hover:bg-utiles-accent hover:text-utiles-blue transition-all border border-white/20">
                  <TiktokIcon size={20} />
                </a>
                <a href="https://youtube.com/@utilesmartinique?si=PkAx73A4_c8HdYKV" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/10 text-white hover:bg-utiles-accent hover:text-utiles-blue transition-all border border-white/20">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="card-shadow bg-white/95 backdrop-blur-sm">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Nom complet</label>
                    <input 
                      required
                      type="text" 
                      className="w-full border-b-2 border-gray-200 focus:border-utiles-blue outline-none py-2 transition-colors"
                      value={formData.nom}
                      onChange={e => setFormData({...formData, nom: e.target.value})}
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
                    <label className="text-xs font-bold uppercase text-gray-500">Sujet</label>
                    <input 
                      required
                      type="text" 
                      className="w-full border-b-2 border-gray-200 focus:border-utiles-blue outline-none py-2 transition-colors"
                      value={formData.sujet}
                      onChange={e => setFormData({...formData, sujet: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Message</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full border-b-2 border-gray-200 focus:border-utiles-blue outline-none py-2 transition-colors resize-none"
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full btn-accent flex items-center justify-center gap-2">
                    <Send size={18} /> Envoyer le message
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
                  <h3 className="text-2xl text-utiles-blue mb-2">Message envoyé !</h3>
                  <p className="text-gray-600 mb-8">Merci pour votre message. Nous vous répondrons dans les plus brefs délais.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-utiles-blue font-bold hover:underline"
                  >
                    Envoyer un autre message
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
