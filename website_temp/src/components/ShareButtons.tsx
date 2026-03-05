import React, { useState } from 'react';
import { Share2, Facebook, MessageCircle, Link as LinkIcon, Check } from 'lucide-react';

export default function ShareButtons() {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;
  const shareText = "Rejoignez le mouvement UTILES Martinique pour les municipales du 15 mars ! Ensemble pour une transformation utile.";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareFB = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareWA = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`, '_blank');
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="text-xs font-black uppercase text-white/50 flex items-center gap-2">
        <Share2 size={14} /> Partager la campagne :
      </span>
      <button 
        onClick={shareFB}
        className="p-2 rounded-full bg-white/10 hover:bg-blue-600 text-white transition-colors border border-white/10"
        title="Partager sur Facebook"
      >
        <Facebook size={18} />
      </button>
      <button 
        onClick={shareWA}
        className="p-2 rounded-full bg-white/10 hover:bg-green-600 text-white transition-colors border border-white/10"
        title="Partager sur WhatsApp"
      >
        <MessageCircle size={18} />
      </button>
      <button 
        onClick={copyToClipboard}
        className={`p-2 rounded-full transition-colors border border-white/10 ${copied ? 'bg-utiles-accent text-utiles-blue' : 'bg-white/10 text-white hover:bg-white/20'}`}
        title="Copier le lien"
      >
        {copied ? <Check size={18} /> : <LinkIcon size={18} />}
      </button>
    </div>
  );
}
