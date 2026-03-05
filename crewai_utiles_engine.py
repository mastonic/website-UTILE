import os
import fal_client
from crewai import Agent, Task, Crew, Process
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

# Charger les clés API depuis le fichier .env
load_dotenv()

class UtilesEngine:
    def __init__(self, topic):
        self.topic = topic
        self.llm = ChatOpenAI(model="gpt-4-turbo")

    def agents(self):
        # 1. La Sentinelle Madinina (Le Créateur)
        sentinelle = Agent(
            role='Sentinelle Madinina',
            goal=f'Écrire un script TikTok de 28s sur {self.topic} et concevoir 7 images percutantes.',
            backstory="""Voix publique du parti UTILES en Martinique. Ton ton est passionné, 
            proche du terrain et combatif. Tu utilises des expressions créoles pour mobiliser.
            Tu maîtrises l'esthétique locale pour guider Flux King.""",
            llm=self.llm,
            verbose=True
        )

        # 2. Le Conseiller Rebelle (Le Stratège / Avocat du diable)
        conseiller = Agent(
            role='Conseiller Rebelle',
            goal='Vérifier que le script évite les pièges des adversaires et reste 100% aligné avec UTILES.',
            backstory="""Stratège de l'ombre, tu challenges chaque mot pour assurer une stature 
            politique intouchable. Tu connais les dossiers (Vie chère, Écologie, Souveraineté).""",
            llm=self.llm,
            verbose=True
        )

        return sentinelle, conseiller

    def generate_visuals(self, prompts):
        """Votre brique Fal/Flux King + Kling adaptée"""
        video_clips = []
        for i, prompt in enumerate(prompts):
            print(f"Génération Image {i+1}/7 avec Flux King...")
            # 1. Génération de l'image Flux.1
            # image = fal_client.subscribe("fal-ai/flux-pro", arguments={"prompt": prompt})
            # image_url = image['images'][0]['url']
            
            # 2. Transformation en vidéo avec Kling (votre méthode TikTok)
            print(f"Transformation en clip vidéo avec Kling...")
            # video = fal_client.subscribe("fal-ai/kling-video/v1/standard/image-to-video", 
            #                              arguments={"image_url": image_url, "prompt": "Animation cinématographique"})
            # video_clips.append(video['video']['url'])
            
        return video_clips

    def run(self):
        sentinelle, conseiller = self.agents()

        # Tâche 1 : Écriture du script et Storyboard (7 images)
        task_creation = Task(
            description=f"""Analyse l'actu : {self.topic}. 
            1. Rédige un script TikTok de 28 secondes (ton combatif + créole).
            2. Propose 7 prompts d'images précis pour Flux King (Style Parti UTILES).""",
            agent=sentinelle,
            expected_output="Script TikTok + 7 prompts visuels détaillés pour Flux."
        )

        # Tâche 2 : Revue stratégique
        task_review = Task(
            description="Revois le script. Est-ce trop risqué ? Est-ce assez audacieux ? Ajuste si besoin.",
            agent=conseiller,
            expected_output="Script final validé et optimisé politiquement."
        )

        crew = Crew(
            agents=[sentinelle, conseiller],
            tasks=[task_creation, task_review],
            process=Process.sequential,
            verbose=True
        )

        result = crew.kickoff()
        return result

if __name__ == "__main__":
    import sys
    topic = sys.argv[1] if len(sys.argv) > 1 else "La vie chère en Martinique"
    engine = UtilesEngine(topic)
    print(f"--- Production UTILES AI en cours : {topic} ---")
    final_output = engine.run()
    print("## RÉSULTAT FINAL ##")
    print(final_output)
