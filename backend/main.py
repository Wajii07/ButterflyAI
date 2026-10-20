
from pathlib import Path
from io import BytesIO
import json

import numpy as np
import tensorflow as tf
from PIL import Image, UnidentifiedImageError
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Project paths
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "models"

# Load trained ANN
model = tf.keras.models.load_model(
    MODEL_DIR / "single_layer.keras"
)

# Load species names
with open(MODEL_DIR / "class_names.json", "r") as f:
    class_names = json.load(f)

# Image dimensions used during training
IMG_SIZE = (64, 64)

# Initialize API
app = FastAPI(
    title="ButterflyAI",
    description="Butterfly Species Detection using ANN",
    version="1.0"
)

# Allow our React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_methods=["GET", "POST"],
    allow_headers=["*"]
)

# Home endpoint
@app.get("/")
def home():
    return {
        "message": "ButterflyAI Backend is Running",
        "status": "success",
        "total_species": len(class_names)
    }


# Return all supported species
@app.get("/species")
def get_species():
    return {
        "species": class_names,
        "total": len(class_names)
    }


# Predict species from uploaded image
@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    if file.content_type not in [
        "image/jpeg", "image/png", "image/webp"
    ]:
        raise HTTPException(
            status_code=400,
            detail="Please upload a JPG, PNG or WebP image."
        )

    content = await file.read(5 * 1024 * 1024 + 1)

    if len(content) > 5 * 1024 * 1024:
        raise HTTPException(
            status_code=413,
            detail="Maximum image size is 5 MB."
        )

    try:
        image = Image.open(BytesIO(content)).convert("RGB")
        image = image.resize(IMG_SIZE)
    except (UnidentifiedImageError, OSError, ValueError):
        raise HTTPException(
            status_code=400,
            detail="Invalid image."
        )

    # Convert image to numerical array
    image_array = np.array(image, dtype=np.float32)

    # Add batch dimension
    image_array = np.expand_dims(image_array, axis=0)

    # Predict (model already contains normalization)
    predictions = model.predict(
        image_array, verbose=0
    )[0]

    # Get top 3 predicted species
    top_indices = np.argsort(predictions)[-3:][::-1]

    top_predictions = [
        {
            "species": class_names[int(i)],
            "confidence": round(
                float(predictions[i]) * 100, 2
            )
        }
        for i in top_indices
    ]

    return {
        "predicted_species": top_predictions[0]["species"],
        "confidence": top_predictions[0]["confidence"],
        "top_predictions": top_predictions
    }
