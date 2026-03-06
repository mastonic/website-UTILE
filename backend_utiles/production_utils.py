import os
import json
import urllib.request
import requests
import time
import base64
from typing import Optional

def generate_image(prompt_text, save_path):
    """Génère une image via Fal.ai Flux Schnell"""
    fal_key = os.environ.get("FAL_KEY")
    if not fal_key:
        print("ERROR: FAL_KEY not found in environment.")
        return False
        
    url = "https://fal.run/fal-ai/flux/schnell"
    headers = {
        "Authorization": f"Key {fal_key}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "prompt": prompt_text,
        "image_size": "portrait_4_3",
        "num_inference_steps": 4,
        "num_images": 1
    }
    
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers=headers)
    
    try:
        response = urllib.request.urlopen(req)
        result = json.loads(response.read())
        
        if "images" in result and len(result["images"]) > 0:
            image_url = result["images"][0]["url"]
            img_req = urllib.request.Request(image_url)
            img_resp = urllib.request.urlopen(img_req)
            
            with open(save_path, "wb") as f:
                f.write(img_resp.read())
            return True
        return False
    except Exception as e:
        print(f"Failed to generate image: {e}")
        return False

def generate_video_from_image(image_path: str, prompt: str) -> Optional[str]:
    """Transforme une image en vidéo via Fal.ai Kling"""
    fal_key = os.environ.get("FAL_KEY")
    if not fal_key:
        return None

    try:
        with open(image_path, "rb") as f:
            base64_img = base64.b64encode(f.read()).decode('utf-8')
            img_data_url = f"data:image/jpeg;base64,{base64_img}"
    except Exception as e:
        print(f"Error reading image: {e}")
        return None

    url = "https://queue.fal.run/fal-ai/kling-video/v1/standard/image-to-video"
    headers = {
        "Authorization": f"Key {fal_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "image_url": img_data_url,
        "prompt": prompt,
        "duration": "5"
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        res_data = response.json()
        request_id = res_data.get("request_id")
        
        if not request_id: return None

        status_url = res_data.get("status_url")
        result_url = res_data.get("response_url")
        
        for _ in range(60): # Poll 5 mins
            time.sleep(5)
            status_res = requests.get(status_url, headers=headers)
            status_data = status_res.json()
                
            if status_data.get("status") == "COMPLETED":
                res = requests.get(result_url, headers=headers)
                res_json = res.json()
                video_info = res_json.get("video")
                if video_info and isinstance(video_info, dict):
                     return video_info.get("url")
                return res_json.get("video_url")
            elif status_data.get("status") in ["FAILED", "CANCELED"]:
                return None
        return None
    except Exception as e:
        print(f"Error calling Fal.ai Video API: {e}")
        return None

def download_file(url: str, save_path: str) -> bool:
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        with open(save_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        return True
    except Exception as e:
        print(f"Error downloading: {e}")
        return False
