from flask import Flask, render_template, request, jsonify
import requests
from urllib.parse import unquote
import config

app = Flask(__name__)
API_KEY = config.api_key


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/recipies")
def recipies():
    return render_template("recipies.html")


@app.route("/search", methods=["POST"])
def search():
    protein = request.form.get("protein")
    fats = request.form.get("fats")
    carbs = request.form.get("carbs")
    num_recipes = request.form.get("num_recipes")
    calories = request.form.get("calories")
    messages = [
        {
            "content": protein,
        },
        {
            "content": fats,
        },
        {
            "content": carbs,
        },
        {
            "content": num_recipes,
        },
        {
            "content": calories,
        },
    ]

    # You can now use the collected data (protein, fats, carbs, num_recipes) as needed
    data = recipieSearch(messages)
    return render_template("recipies.html", messages=data)


def recipieSearch(messages):
    url = f"https://api.spoonacular.com/recipes/findByNutrients"
    params = {
        "apiKey": API_KEY,
    }
    if messages[2].get("content") is not "":
        params["minCarbs"] = messages[2].get("content")
    if messages[0].get("content") is not "":
        params["minProtein"] = messages[0].get("content")
    if messages[1].get("content") is not "":
        params["minFat"] = messages[1].get("content")
    if messages[3].get("content") is not "":
        params["number"] = messages[3].get("content")
    if messages[4].get("content") is not "":
        params["maxCalories"] = messages[4].get("content")
    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json()
        return data
    return []


if __name__ == "__main__":
    app.run()
