#!/bin/bash

# --- Script de Déploiement UTILES Dashboard (1:1 VPS) ---
# --- Version CLI - Hostinger / Ubuntu / Debian ---

echo "🚀 Déploiement UTILES Dashboard AI en cours..."

# 1. Mise à jour du Repo
echo "📈 Mise à jour du code..."
# git checkout dashboard-utile
# git pull origin dashboard-utile

# 2. Dépendances System
echo "🔍 Vérification de l'environnement..."
if ! command -v python3 &> /dev/null
then
    echo "❌ Python3 n'est pas installé. Veuillez l'installer."
    exit
fi

if ! command -v npm &> /dev/null
then
    echo "❌ Node.js/NPM n'est pas installé. Veuillez l'installer."
    exit
fi

# 3. Installation Python (Backend + AI Engine)
echo "🐍 Installation des dépendances Python..."
python3 -m pip install -r requirements.txt

# 4. Installation & Build Frontend (Vite)
echo "⚛️ Installation et Build du Frontend..."
cd frontend_utiles
npm install
npm run build
cd ..

# 5. Lancement des services
# On utilise PM2 si disponible pour maintenir les services en vie
if command -v pm2 &> /dev/null
then
    echo "⚙️ PM2 détecté. Lancement des services..."
    pm2 delete "utiles-backend" "utiles-frontend" 2>/dev/null
    
    # Backend FastAPI
    pm2 start "python3 backend_utiles/main.py" --name "utiles-backend"
    
    # Frontend (On sert le dossier dist via un serveur simple ou pm2)
    # Pour un VPS Hostinger standard, on peut utiliser pm2 serve pour le statique
    pm2 serve frontend_utiles/dist 5174 --name "utiles-frontend" --spa
    
    echo "✅ Dashboard déployé avec succès !"
    echo "🔗 Accès Backend : http://votre_vps_ip:8000"
    echo "🔗 Accès Dashboard : http://votre_vps_ip:5174"
    pm2 status
else
    echo "⚠️ PM2 non détecté. Utilisation de nohup (Basique)..."
    echo "⚠️ Installez PM2 (npm install -g pm2) pour une meilleure gestion."
    
    nohup python3 backend_utiles/main.py > backend.log 2>&1 &
    # Pour le front en prod sans Nginx/Apache configuré, on utilise un serveur temporaire
    cd frontend_utiles/dist
    nohup npx serve -p 5174 -s . > frontend.log 2>&1 &
    echo "✅ Dashboard lancé en arrière-plan (Nohup)."
fi

echo "🌵 UTILES MLK TEAM - Prêt pour le combat politique."
