import os
import numpy as np

from flask import Flask, render_template, request
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

app = Flask(__name__)

UPLOAD_FOLDER = "static/uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

model = load_model("saved_model/brain_tumor_model.keras")

class_names = [
    "Glioma",
    "Meningioma",
    "No Tumor",
    "Pituitary"
]


def predict(img_path):

    img = image.load_img(img_path, target_size=(224,224))

    img_array = image.img_to_array(img)

    img_array = img_array/255.0

    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)

    predicted_class = np.argmax(prediction)

    confidence = np.max(prediction)

    return class_names[predicted_class], confidence


@app.route("/", methods=["GET","POST"])
def home():

    prediction = None
    confidence = None
    filename = None

    if request.method == "POST":

        file = request.files["image"]

        filename = file.filename

        filepath = os.path.join(
            app.config["UPLOAD_FOLDER"],
            filename
        )

        file.save(filepath)

        prediction, confidence = predict(filepath)

    return render_template(
        "index.html",
        prediction=prediction,
        confidence=confidence,
        filename=filename
    )


if __name__ == "__main__":
    app.run(debug=True)