from flask import Flask, request, jsonify
import spacy
import os

app = Flask(__name__)
nlp = spacy.load("en_core_web_sm")

@app.route("/analyze", methods=["POST"])
def analyze_resume():
    """Extract key skills and education from a resume."""
    data = request.get_json()
    text = data.get("resume_text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    doc = nlp(text)
    skills = [ent.text for ent in doc.ents if ent.label_ == "SKILL"]
    return jsonify({"skills": skills})

if __name__ == "__main__":
    app.run(debug=True)
