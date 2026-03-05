import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Info, Copy, Check, Video, Mic, Layout, Loader2, Wand2, Upload, Image as ImageIcon } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

/**
 * SCRIPT VIDÉO OFFICIEL – UTILES MARTINIQUE (45–60 sec)
 * 🎙️ VOIX OFF (FR – ton posé, crédible, local)
 * 
 * "La Martinique change. Nos communes doivent être le moteur de ce changement.
 * Il est temps de redonner le pouvoir d'agir à ceux qui vivent le territoire au quotidien.
 * UTILES, c'est le choix de la responsabilité. Le choix de la souveraineté locale.
 * Pour Ducos, pour Le François, pour Fort-de-France, pour le Robert... pour chaque foyer martiniquais.
 * Nous sommes une force de proposition, une force de construction.
 * Ancrés dans nos valeurs, tournés vers l'avenir.
 * UTILES Martinique. Décider ici, pour réussir ensemble."
 */

const VIDEO_PROMPT = "A high-quality, cinematic video of a political campaign event in Martinique. The scene takes place in a grand, elegant hall with high ceilings, golden ornaments, and large crystal chandeliers. A diverse group of people, including men in suits and casual shirts, and women in elegant attire, are engaging in warm, professional conversations. Some are shaking hands. The atmosphere is positive, collaborative, and serious. The lighting is warm and inviting. There is a sense of unity and purpose. Include a subtle overlay of a logo with puzzle pieces and the text 'UTILES'. 4k resolution, photorealistic.";
const VOICE_PROMPT = "Voix martiniquaise, posée, rassurante et déterminée. Pas de ton politicien classique. Un ton de conversation, de vérité. 'Nous sommes prêts. Pour nos communes. Pour vous.'";

const STORYBOARD = [
  { time: "0-5s", scene: "Drone sur le littoral (Est/Sud). Titre: 'UTILES : L'avenir de nos communes'" },
  { time: "5-15s", scene: "Immersion marché / bourg. Rencontres citoyennes. Sourires, poignées de main." },
  { time: "15-25s", scene: "Focus sur les candidats en action sur le terrain. Proximité et écoute." },
  { time: "25-40s", scene: "Thématiques visuelles : Mer (pêcheurs), Terre (agriculteurs), Jeunesse (sport/école)." },
  { time: "40-50s", scene: "Montage dynamique des équipes militantes. Appel à l'action. 'Rejoignez la dynamique'." },
  { time: "50-60s", scene: "Logo UTILES animé sur fond bleu profond. Texte : 'Municipales 2026', 'Décider ici, pour réussir ensemble'." }
];

export default function VideoSection() {
  const [videoExists, setVideoExists] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [showStoryboard, setShowStoryboard] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkVideo = async () => {
      try {
        // Try a simple fetch, which is more reliable than HEAD in some environments
        const response = await fetch('/assets/campaign/video-campagne.mp4');
        // Check if it's a valid response and has some content (not just a 404 page)
        if (response.ok && response.status !== 404) {
          setVideoExists(true);
        }
      } catch {
        setVideoExists(false);
      }
    };
    checkVideo();
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateVideo = async () => {
    setIsGenerating(true);
    setGenerationError(null);

    try {
      // Check for API key selection
      // @ts-ignore - window.aistudio is injected by the platform
      if (!await window.aistudio.hasSelectedApiKey()) {
         // @ts-ignore
        await window.aistudio.openSelectKey();
        // Assume success or retry needed if fails later
      }

      // Create new instance with fresh key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

      let operation;

      if (uploadedImage) {
        // Remove data URL prefix for API
        const base64Image = uploadedImage.split(',')[1];
        
        operation = await ai.models.generateVideos({
          model: 'veo-3.1-fast-generate-preview',
          prompt: VIDEO_PROMPT,
          image: {
            imageBytes: base64Image,
            mimeType: 'image/png', // Assuming PNG or JPEG, API handles common types
          },
          config: {
            numberOfVideos: 1,
            resolution: '720p', // Image input supports 720p
            aspectRatio: '16:9'
          }
        });
      } else {
        operation = await ai.models.generateVideos({
          model: 'veo-3.1-fast-generate-preview',
          prompt: VIDEO_PROMPT,
          config: {
            numberOfVideos: 1,
            resolution: '1080p',
            aspectRatio: '16:9'
          }
        });
      }

      // Poll for completion
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({operation: operation});
      }

      const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!videoUri) {
        throw new Error("No video URI returned");
      }

      // Fetch the video content to create a blob URL
      const response = await fetch(videoUri, {
        headers: {
          'x-goog-api-key': process.env.API_KEY || ''
        }
      });

      if (!response.ok) {
        throw new Error("Failed to download generated video");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setGeneratedVideoUrl(url);

    } catch (err: any) {
      console.error("Generation error:", err);
      setGenerationError(err.message || "Erreur lors de la génération");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 text-white relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl mb-6 font-black uppercase tracking-tight text-white">La Campagne en <span className="text-utiles-accent">Images</span></h2>
          <p className="text-white/60 text-lg font-medium">Découvrez notre vision pour l'autonomie locale en action.</p>
          <div className="w-24 h-1 bg-utiles-accent mx-auto mt-6"></div>
        </div>

        {videoExists || generatedVideoUrl ? (
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 bg-black group">
            <video 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              poster="/assets/martinique/baie-robert.jpg"
              controls
              src={generatedVideoUrl || "/assets/campaign/video-campagne.mp4"}
            >
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          </div>
        ) : (
          <div className="relative overflow-hidden bg-utiles-blue-deep border border-white/10 p-8 lg:p-16 text-center rounded-[2.5rem] shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-utiles-blue to-transparent opacity-20"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-utiles-accent/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-utiles-green/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex p-8 rounded-3xl bg-white/5 border border-white/10 text-utiles-accent mb-10 shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                <Video size={56} />
              </div>
              <h3 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-tight text-white">Vidéo de Campagne <span className="text-utiles-accent">2026</span></h3>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                Notre clip officiel est en cours de montage. Il incarnera la force de notre engagement pour l'autonomie communale.
              </p>

              <div className="mb-12 bg-white/5 p-6 rounded-2xl border border-white/10 max-w-xl mx-auto">
                 <h4 className="text-utiles-accent font-black uppercase text-xs tracking-widest mb-4">Générer un aperçu IA</h4>
                 
                 <div className="flex flex-col gap-4">
                   <div className="flex items-center gap-4 justify-center">
                     <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                     />
                     <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-xs font-bold transition-all"
                     >
                        <Upload size={16} />
                        {uploadedImage ? "Changer l'image" : "Utiliser une image (optionnel)"}
                     </button>
                     {uploadedImage && (
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/20">
                          <img src={uploadedImage} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                     )}
                   </div>

                   <button 
                    onClick={handleGenerateVideo}
                    disabled={isGenerating}
                    className="flex items-center justify-center gap-3 bg-utiles-accent hover:bg-white text-utiles-blue font-black px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-utiles-accent/20 disabled:opacity-50 disabled:cursor-not-allowed w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Génération en cours...
                      </>
                    ) : (
                      <>
                        <Wand2 size={20} />
                        Générer la vidéo
                      </>
                    )}
                  </button>
                 </div>

                {generationError && (
                  <p className="text-red-400 mt-4 text-sm font-medium bg-red-900/20 py-2 px-4 rounded-lg inline-block">
                    {generationError}
                  </p>
                )}
                <p className="text-white/40 text-xs mt-4">
                  Génère une vidéo de 5s basée sur le prompt de campagne et votre image (si fournie). Nécessite une clé API valide.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 text-left mb-12">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-utiles-accent">
                    <Video size={16} />
                    <span className="text-xs font-black uppercase tracking-widest">Prompt Vidéo IA</span>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(VIDEO_PROMPT, 'video')}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {copied === 'video' ? <Check size={16} className="text-utiles-accent" /> : <Copy size={16} />}
                  </button>
                </div>
                <p className="text-xs text-white/40 italic leading-relaxed line-clamp-3">{VIDEO_PROMPT}</p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-utiles-accent">
                    <Mic size={16} />
                    <span className="text-xs font-black uppercase tracking-widest">Prompt Voix-Off IA</span>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(VOICE_PROMPT, 'voice')}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {copied === 'voice' ? <Check size={16} className="text-utiles-accent" /> : <Copy size={16} />}
                  </button>
                </div>
                <p className="text-xs text-white/40 italic leading-relaxed line-clamp-3">{VOICE_PROMPT}</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => copyToClipboard("La Martinique mérite des communes qui décident pour elles-mêmes. Nos quartiers ont besoin d’actions concrètes. Nos centres-villes ont besoin d’être relancés. UTILES, c’est une équipe locale, engagée pour des décisions prises ici, pour les habitants. Priorité aux administrés. Protection de notre environnement. Soutien à l’économie martiniquaise. Une démocratie municipale plus participative. Une gestion plus transparente. Un avenir construit ensemble. UTILES Martinique. L’autonomie locale en action.", 'script')}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition-all text-sm font-bold"
              >
                {copied === 'script' ? <Check size={18} className="text-utiles-accent" /> : <Copy size={18} />}
                Copier le Script
              </button>
              <button 
                onClick={() => setShowStoryboard(!showStoryboard)}
                className="flex items-center gap-2 bg-utiles-accent text-utiles-blue px-6 py-3 rounded-xl transition-all text-sm font-black"
              >
                <Layout size={18} />
                {showStoryboard ? "Masquer le Storyboard" : "Voir le Storyboard"}
              </button>
            </div>

            {showStoryboard && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 text-left space-y-4 max-w-2xl mx-auto"
              >
                <h4 className="text-utiles-accent font-black uppercase text-xs tracking-widest mb-6 border-b border-white/10 pb-2">Storyboard Détaillé</h4>
                {STORYBOARD.map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-utiles-accent font-black text-xs shrink-0 w-12">{item.time}</span>
                    <p className="text-xs text-white/70">{item.scene}</p>
                  </div>
                ))}
              </motion.div>
            )}
            </div>
          </div>
        )}

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <span className="text-utiles-accent font-black block mb-4 uppercase text-[10px] tracking-[0.2em]">Proximité</span>
            <p className="text-xs text-white/60 leading-relaxed font-medium">Des images tournées au cœur de nos quartiers pour refléter la réalité de chaque Martiniquais.</p>
          </div>
          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <span className="text-utiles-accent font-black block mb-4 uppercase text-[10px] tracking-[0.2em]">Engagement</span>
            <p className="text-xs text-white/60 leading-relaxed font-medium">La force d'une équipe unie par le désir de servir sans attendre de retour.</p>
          </div>
          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <span className="text-utiles-accent font-black block mb-4 uppercase text-[10px] tracking-[0.2em]">Espoir</span>
            <p className="text-xs text-white/60 leading-relaxed font-medium">Parce qu'une autre gestion est possible, plus juste et plus durable.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
