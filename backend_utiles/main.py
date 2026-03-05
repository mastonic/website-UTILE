from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess
import os
import json
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

@app.post("/api/launch-production")
async def launch_production(request: ProductionRequest, background_tasks: BackgroundTasks):
    """
    Lance le moteur CrewAI en arrière-plan pour ne pas bloquer le dashboard.
    """
    # Chemin vers le script moteur
    engine_path = os.path.join(os.getcwd(), "..", "crewai_utiles_engine.py")
    
    def run_engine(topic):
        print(f"Lancement CrewAI pour: {topic}")
        try:
            # Exécution réelle du script Python
            result = subprocess.run(
                ["python", engine_path, topic], 
                capture_output=True, 
                text=True
            )
            print("Production terminée.")
            # On pourrait stocker le résultat en DB ici
        except Exception as e:
            print(f"Erreur lors de la production: {e}")

    background_tasks.add_task(run_engine, request.topic)
    
    return {
        "message": f"Production lancée pour la campagne: {request.camp_title}",
        "topic": request.topic,
        "status": "processing"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
