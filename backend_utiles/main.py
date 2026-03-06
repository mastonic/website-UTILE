from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess
import os
import json
import time
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="UTILES Dashboard Backend")

# Configuration CORS pour le frontend React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProductionRequest(BaseModel):
    topic: str
    camp_title: str

# Simulation de base de données pour le statut des agents
agents_status = [
    {"id": 1, "name": "Sentinelle Madinina", "status": "En ligne", "lastAction": "Veille active"},
    {"id": 2, "name": "Conseiller Rebelle", "status": "En ligne", "lastAction": "Analyse stratégique"},
    {"id": 3, "name": "Diplomate", "status": "En ligne", "lastAction": "Engagement citoyen"}
]

@app.get("/api/status")
async def get_status():
    return {"agents": agents_status, "system": "OK", "vps_active": True}

from production_utils import generate_image, generate_video_from_image, download_file

production_status = {}

@app.get("/api/production-status/{job_id}")
async def get_production_status(job_id: str):
    return production_status.get(job_id, {"status": "not_found"})

@app.post("/api/launch-production")
async def launch_production(request: ProductionRequest, background_tasks: BackgroundTasks):
    job_id = f"job_{int(time.time())}"
    production_status[job_id] = {"status": "initializing", "progress": 0, "message": "Démarrage..."}
    
    def run_full_workflow(topic, j_id):
        production_status[j_id] = {"status": "generating_scripts", "progress": 10, "message": "🤖 CrewAI : Écriture du script et prompts..."}
        
        # 1. Lancement CrewAI
        engine_path = os.path.join(os.getcwd(), "..", "crewai_utiles_engine.py")
        try:
            result = subprocess.run(["python", engine_path, topic], capture_output=True, text=True)
            # Ici on devrait parser le résultat pour avoir les 7 prompts
            # Pour la démo, on simule des prompts extraits
            prompts = [f"Scène {i+1} pour {topic}, style cinématique UTILES" for i in range(7)]
            
            production_status[j_id] = {"status": "generating_images", "progress": 20, "message": "📸 Flux King : Génération des 7 visuels..."}
            
            job_dir = os.path.join(os.getcwd(), "media", j_id)
            os.makedirs(job_dir, exist_ok=True)
            
            for i, p in enumerate(prompts):
                img_path = os.path.join(job_dir, f"img_{i+1}.jpg")
                if generate_image(p, img_path):
                    production_status[j_id]["progress"] = 20 + int((i+1)/7 * 40)
                    production_status[j_id]["message"] = f"📸 Image {i+1}/7 générée"
                
            production_status[j_id] = {"status": "generating_videos", "progress": 60, "message": "🎬 Kling Video : Animation des visuels..."}
            
            # 2. Optionnel : transformer en vidéo
            # (On ne fait qu'une pour la rapidité en démo)
            video_url = generate_video_from_image(os.path.join(job_dir, "img_1.jpg"), "Mouvement fluide")
            if video_url:
                download_file(video_url, os.path.join(job_dir, "video_final.mp4"))

            production_status[j_id] = {"status": "completed", "progress": 100, "message": "✅ Production terminée ! Prêt pour TikTok."}
            
        except Exception as e:
            production_status[j_id] = {"status": "error", "message": f"Erreur: {str(e)}"}

    background_tasks.add_task(run_full_workflow, request.topic, job_id)
    
    return {
        "job_id": job_id,
        "message": "Production lancée en arrière-plan",
        "status": "started"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
