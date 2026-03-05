import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin } from 'lucide-react';
import ProgramCarousel from './ProgramCarousel';

interface CandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: any;
}

export default function CandidateModal({ isOpen, onClose, candidate }: CandidateModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!candidate) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-utiles-blue/90 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh] overflow-y-auto lg:overflow-hidden"
          >
            {/* Close Button - Fixed relative to modal */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 lg:top-6 lg:right-6 p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-white shadow-md text-utiles-blue z-50 transition-all"
            >
              <X size={24} />
            </button>

            {/* Left Side: Candidate Info */}
            <div className="lg:w-2/5 bg-utiles-blue-light p-6 lg:p-10 flex flex-col lg:overflow-y-auto items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-utiles-blue/5">
              <div className="relative w-24 h-24 lg:w-full lg:h-auto lg:aspect-square rounded-full lg:rounded-3xl overflow-hidden mb-4 lg:mb-6 shadow-xl bg-utiles-blue-deep shrink-0 border-4 border-white lg:border-0">
                <img 
                  src={candidate.image} 
                  alt={candidate.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              <div className="mb-4 lg:mb-6 w-full">
                <div className="inline-flex items-center gap-2 text-utiles-blue font-black text-[10px] uppercase tracking-widest mb-2 opacity-60">
                  <MapPin size={12} /> {candidate.commune}
                </div>
                <h2 className="text-xl lg:text-3xl text-utiles-blue mb-2 font-black leading-tight">{candidate.name}</h2>
                <p className="text-utiles-blue font-bold text-xs lg:text-sm italic opacity-80">"{candidate.vision}"</p>
              </div>

              <div className="mt-auto hidden lg:block">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-4">Mouvement UTILES Martinique</p>
                <div className="w-12 h-1 bg-utiles-blue"></div>
              </div>
            </div>

            {/* Right Side: Program Carousel */}
            <div className="lg:w-3/5 p-6 lg:p-12 bg-white relative flex flex-col min-h-[400px] lg:min-h-0 lg:overflow-y-auto">
              <div className="flex-grow pt-8 lg:pt-0">
                <ProgramCarousel candidate={candidate} />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
