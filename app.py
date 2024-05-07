import os
import json
import uuid
import secrets
from flask import Flask, render_template, redirect, url_for, jsonify, request, session
from configuration import Config

app = Flask(__name__)
app.secret_key = secrets.token_urlsafe(16)
conf = Config().load()

if not os.path.exists("data.json"):
    with open("data.json", "w") as f:
        json.dump({}, f)


def createID():
    return str(uuid.uuid4())


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        id = str(uuid.uuid4())

        return redirect(url_for("match", id=id))

    return render_template("index.html")


@app.route("/sport/<sport>")
def tennis_padel(sport):
    return f"<script>window.location.href = '/sport/{sport}/{createID()}';</script>"


# -----------------------------
#   Tennis
#   Padel
# -----------------------------
@app.route("/sport/tennis-padel/<id>")
def tennis_padel_backend(id):
    return render_template(f"{conf.sport}/backend.html", id=id)


@app.route("/sport/tennis-padel/<id>/show")
def tennis_padel_frontend(id):
    return render_template(f"{conf.sport}/frontend.html", id=id)


# -----------------------------
#  F1
# -----------------------------
@app.route("/sport/f1/<id>")
def f1(id):
    return render_template(f"f1/backend.html", id=id)


@app.route("/sport/f1/<id>/show")
def f1_frontend(id):
    return render_template(f"f1/frontend.html", id=id)


# -----------------------------
#   API
# -----------------------------
@app.route("/api/<sport>/<id>", methods=["GET", "POST"])
def get(sport, id):
    # Check if sport exists in data.json
    with open("data.json", "r") as f:
        try:
            jsonData = json.load(f)
        except json.JSONDecodeError:
            jsonData = {}

        if sport not in jsonData:
            jsonData[sport] = {}

        if id not in jsonData[sport]:
            base = Config().sport_config(sport)

            if not base:
                exit()
            jsonData[sport][id] = base

    with open("data.json", "w") as f:
        json.dump(jsonData, f)

    if request.method == "GET":
        with open("data.json", "r") as f:
            jsonData = json.load(f)
            return jsonify(jsonData[sport][id])
    elif request.method == "POST":
        data = request.get_json()

        with open("data.json", "r") as f:
            jsonData = json.load(f)
            jsonData[sport][id] = data

        with open("data.json", "w") as f:
            json.dump(jsonData, f)

        return jsonify(data)


if __name__ == "__main__":
    app.run(host=conf.host, port=conf.port, debug=conf.debug)
