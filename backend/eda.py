
from pathlib import Path
import pandas as pd

# Dataset location
train_path = Path("dataset/train")

# Count images for every species
data = []

for species_folder in train_path.iterdir():
    if species_folder.is_dir():
        images = list(species_folder.glob("*.jpg"))

        data.append({
            "Species": species_folder.name,
            "Images": len(images)
        })

# Create DataFrame
df = pd.DataFrame(data)

print("Total Species:", len(df))
print("Total Training Images:", df["Images"].sum())

print("\nFirst 5 Species:")
print(df.head())

print("\nDataset Statistics:")
print(df.describe())

print("\nTop 15 Species:")
print(df.sort_values("Images", ascending=False).head(15))

import matplotlib.pyplot as plt
from PIL import Image

# Select the 15 species with the most images for inspection
top_species = df.sort_values(
    "Images", ascending=False
).head(15)["Species"].tolist()

plt.figure(figsize=(15, 10))

for i, species in enumerate(top_species):
    folder = train_path / species
    image_path = next(folder.glob("*.jpg"))

    img = Image.open(image_path)

    plt.subplot(3, 5, i + 1)
    plt.imshow(img)
    plt.title(species, fontsize=9)
    plt.axis("off")

plt.tight_layout()
plt.show()
