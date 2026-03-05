import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, CheckCircle2, Rocket, Target, Eye, Zap } from 'lucide-react';

interface Slide {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

interface ProgramCarouselProps {
  candidate: {
    name: string;
    commune: string;
    program: Slide[];
  };
}

export default function ProgramCarousel({ candidate }: ProgramCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % candidate.program.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + candidate.program.length) % candidate.program.length);
  };

  return (
    <div className="relative h-full flex flex-col">
      {/* Progress Bar */}
      <div className="flex gap-1 mb-8">
        {candidate.program.map((_, index) => (
          <div 
            key={index} 
            className={`h-1.5 flex-grow rounded-full transition-all duration-300 ${index <= currentSlide ? 'bg-utiles-blue' : 'bg-gray-100'}`}
          />
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-grow relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-utiles-blue text-white shadow-lg">
                {candidate.program[currentSlide].icon}
              </div>
              <h3 className="text-2xl lg:text-3xl font-black text-utiles-blue uppercase tracking-tight leading-tight">
                {candidate.program[currentSlide].title}
              </h3>
            </div>
            
            <div className="text-gray-600 leading-relaxed">
              {candidate.program[currentSlide].content}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-8 border-t border-utiles-blue/5">
        <div className="flex gap-4">
          <button 
            onClick={prevSlide}
            className="p-4 rounded-full border border-utiles-blue/10 hover:bg-utiles-blue-light transition-all text-utiles-blue shadow-sm hover:shadow-md"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="p-4 rounded-full border border-utiles-blue/10 hover:bg-utiles-blue-light transition-all text-utiles-blue shadow-sm hover:shadow-md"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
          Étape {currentSlide + 1} sur {candidate.program.length}
        </span>
      </div>
    </div>
  );
}
