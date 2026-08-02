# Brain Tumor MRI Classification

A Flask-based web application that classifies brain MRI scans into four categories:

- Glioma
- Meningioma
- No Tumor
- Pituitary

The project uses a trained TensorFlow/Keras model for prediction and includes a modern healthcare-style frontend with drag-and-drop upload, image preview, confidence display, theme toggle, and responsive layout.

## Features

- MRI image upload with browser and drag-and-drop support
- Live preview of the selected image before prediction
- Brain tumor classification using a saved Keras model
- Confidence score display
- Modern glassmorphism UI
- Dark and light theme toggle
- Responsive design for desktop, tablet, and mobile
- Animated loading indicator during prediction
- Prediction history and statistics cards on the UI

## Tech Stack

- Python
- Flask
- TensorFlow / Keras
- NumPy
- HTML
- CSS
- JavaScript
- Font Awesome
- Google Fonts

## Project Structure

```text
Brain Tumor MRI Classification/
├── app.py
├── requirements.txt
├── saved_model/
│   └── brain_tumor_model.keras
├── templates/
│   └── index.html
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── uploads/
├── dataset/
├── notebook/
└── outputs/
```

## Model Classes

The model predicts one of these classes:

1. Glioma
2. Meningioma
3. No Tumor
4. Pituitary

## Requirements

Install the dependencies listed in `requirements.txt`.

```txt
tensorflow
numpy
pandas
matplotlib
seaborn
scikit-learn
opencv-python
pillow
flask
jupyter
```

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

### 2. Create and activate a virtual environment

#### Windows

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

#### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Make sure the model file exists

Confirm this file is present:

```text
saved_model/brain_tumor_model.keras
```

## Run the App

```bash
python app.py
```

Open the app in your browser:

```text
http://127.0.0.1:5000
```

## How to Use

1. Open the app in your browser.
2. Upload an MRI image using the browse button or drag-and-drop area.
3. Preview the image before prediction.
4. Click **Predict Tumor Type**.
5. View the predicted class and confidence score.

## Notes

- The app saves uploaded files to `static/uploads/`.
- The frontend has been redesigned only; backend prediction logic remains unchanged.
- If the model file is large, consider using Git LFS for GitHub if needed.

## Troubleshooting

### Flask does not start

- Make sure the virtual environment is activated.
- Verify dependencies are installed with `pip install -r requirements.txt`.
- Check that `saved_model/brain_tumor_model.keras` exists.

### Upload works but prediction is slow

- TensorFlow can take a few seconds to load and run predictions on CPU.
- This is normal on first run or on systems without GPU acceleration.

### Result page is not showing

- Check the terminal where `python app.py` is running for errors.
- Confirm the upload folder exists: `static/uploads/`

## Disclaimer

This project is for educational and demonstration purposes only. It should not be used as a replacement for professional medical diagnosis.
