
from pathlib import Path
from PIL import Image
import pandas as pd
import matplotlib.pyplot as plt
import shutil
import zipfile

# Project folders
BASE = Path(__file__).resolve().parent.parent
SOURCE = BASE / "dataset"
DEST = BASE / "prepared_dataset"
RESULTS = BASE / "results"

RESULTS.mkdir(exist_ok=True)

# Our selected 15 species
species = [
    "MOURNING CLOAK",
    "GREEN HAIRSTREAK",
    "BROWN ARGUS",
    "BROOKES BIRDWING",
    "SLEEPY ORANGE",
    "CHALK HILL BLUE",
    "HUMMING BIRD HAWK MOTH",
    "WHITE LINED SPHINX MOTH",
    "ATALA",
    "BROWN SIPROETA",
    "ARCIGERA FLOWER MOTH",
    "BANDED ORANGE HELICONIAN",
    "SCARCE SWALLOW",
    "CRECENT",
    "HERCULES MOTH"
]

splits = ["train", "valid", "test"]
valid_extensions = {".jpg", ".jpeg", ".png"}

records = []
corrupted = []

# Validate selected classes before copying
for split in splits:
    for name in species:
        folder = SOURCE / split / name
        if not folder.is_dir():
            raise FileNotFoundError(f"Missing folder: {folder}")

# Process selected images
for split in splits:
    for name in species:
        source_folder = SOURCE / split / name
        output_folder = DEST / split / name
        output_folder.mkdir(parents=True, exist_ok=True)

        count = 0

        for image_path in source_folder.iterdir():
            if image_path.suffix.lower() not in valid_extensions:
                continue

            try:
                with Image.open(image_path) as img:
                    img.verify()

                # Copy only verified images
                shutil.copy2(
                    image_path,
                    output_folder / image_path.name
                )
                count += 1

            except Exception as e:
                corrupted.append({
                    "File": str(image_path),
                    "Error": str(e)
                })

        records.append({
            "Species": name,
            "Split": split,
            "Images": count
        })

# Create dataset statistics
df = pd.DataFrame(records)

summary = df.pivot(
    index="Species",
    columns="Split",
    values="Images"
).fillna(0).astype(int)

summary = summary.reindex(columns=splits)
summary["Total"] = summary.sum(axis=1)

print("\nPREPARED DATASET SUMMARY")
print(summary)

print("\nTotal Images:", summary["Total"].sum())
print("Corrupted Images:", len(corrupted))

# Save reports
summary.to_csv(RESULTS / "dataset_summary.csv")

pd.DataFrame(
    corrupted,
    columns=["File", "Error"]
).to_csv(
    RESULTS / "corrupted_images.csv",
    index=False
)

# Class distribution chart
summary[["train", "valid", "test"]].plot(
    kind="bar",
    stacked=True,
    figsize=(14, 7)
)

plt.title("Butterfly Species - Class Distribution")
plt.xlabel("Species")
plt.ylabel("Number of Images")
plt.xticks(rotation=75, ha="right")
plt.tight_layout()

plt.savefig(
    RESULTS / "class_distribution.png",
    dpi=150
)

plt.close()

# Create ZIP for Google Colab
zip_path = BASE / "butterfly_prepared.zip"

with zipfile.ZipFile(
    zip_path,
    "w",
    zipfile.ZIP_DEFLATED
) as zip_file:

    for image_path in DEST.rglob("*"):
        if image_path.is_file():
            zip_file.write(
                image_path,
                image_path.relative_to(BASE)
            )

print("\nZIP created:", zip_path)
print("Dataset preparation completed!")
