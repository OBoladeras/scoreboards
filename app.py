import os
import json
import uuid
import secrets
from configuration import Config
from flask import Flask, render_template, redirect, url_for, jsonify, request, send_file, make_response
from weasyprint import HTML, CSS


app = Flask(__name__)
app.secret_key = secrets.token_urlsafe(16)
conf = Config().load()




@app.route('/export_as_png')
def export_as_png():
    rendered_html = render_template('tennis-padel/frontend.html')

    pdf = HTML(string=rendered_html).write_pdf()

    png = pdf_to_png(pdf)

    response = make_response(png)
    response.headers['Content-Type'] = 'image/png'
    response.headers['Content-Disposition'] = 'attachment; filename=exported_page.png'
    return response

def pdf_to_png(pdf_bytes):
    return HTML(string=pdf_bytes).write_png()



def createBaseData(id, sport):
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


@app.route("/favicon.ico")
def favicon():
    return send_file("static/favicon.ico", mimetype="image/x-icon")


@app.route("/")
def index():
    return redirect(url_for("show_sports"))


@app.route("/sport")
def show_sports():
    sports = [item.split(".")[0] for item in os.listdir("sports_config")]

    return render_template("sports.html", sports=sports)


@app.route("/sport/<sport>")
def redir_sport(sport):
    if sport in ["volleyball"]:
        return f"<script>window.location.href = '/sport/{sport}/{str(uuid.uuid4())}/setup';</script>"

    return f"<script>window.location.href = '/sport/{sport}/{str(uuid.uuid4())}';</script>"


# ------------------------------------------------------------------------------------
# -----------------------------
#   Tennis
#   Padel
# -----------------------------
@app.route("/sport/tennis-padel/<id>")
def tennis_padel_backend(id):
    return render_template("tennis-padel/backend.html", conf=conf)


@app.route("/sport/tennis-padel/<id>/show")
def tennis_padel_frontend(id):
    return render_template("tennis-padel/frontend.html", conf=conf)


# -----------------------------
#   Volleyball
# -----------------------------
@app.route("/sport/volleyball/<id>")
def volleyball_backend(id):
    return render_template("volleyball/backend.html", conf=conf)


@app.route("/sport/volleyball/<id>/setup", methods=["GET", "POST"])
def volleyball_setup(id):
    if request.method == "POST":
        createBaseData(id, "volleyball")

        team1 = request.form.get("team1")
        team2 = request.form.get("team2")

        logo1 = request.files.get("logo1")
        logo2 = request.files.get("logo2")

        if logo1:
            logo1.save(f"static/volleyball/logos/{logo1.filename}")
        if logo2:
            logo2.save(f"static/volleyball/logos/{logo2.filename}")

        with open("data.json", "r") as f:
            jsonData = json.load(f)
            jsonData["volleyball"][id]["team1"]["name"] = team1
            jsonData["volleyball"][id]["team2"]["name"] = team2
            jsonData["volleyball"][id]["team1"]["logo"] = logo1.filename if logo1 else None
            jsonData["volleyball"][id]["team2"]["logo"] = logo2.filename if logo2 else None

        with open("data.json", "w") as f:
            json.dump(jsonData, f)

        return redirect(url_for("volleyball_backend", id=id))

    return render_template("volleyball/setup.html", conf=conf)


@app.route("/sport/volleyball/<id>/show")
def volleyball_frontend(id):
    return render_template("volleyball/frontend.html", conf=conf)


# -----------------------------
#  F1
# -----------------------------
@app.route("/sport/f1/<id>")
def f1(id):
    return render_template(f"f1/backend.html", conf=conf)


@app.route("/sport/f1/<id>/show")
def f1_frontend(id):
    return render_template(f"f1/frontend.html", conf=conf)


# ------------------------------------------------------------------------------------
# -----------------------------
#   API
# -----------------------------
@app.route("/api/<sport>/<id>", methods=["GET", "POST"])
def get(sport, id):
    createBaseData(id, sport)

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
