import requests
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db


class mealdbAPI(object):
    def __init__(self):
        self.server = 'https://www.themealdb.com/api/json/v1/1/'
        # Get the base list of ingredients, areas, and meal categories
        self.set_lists()

    # Pull the lists of ingredients, areas, and categories
    # Do this once to avoid repeated requests for the same information
    def set_lists(self):
        self.ingredients = self.get_ingredients()
        self.areas = self.get_areas()
        self.categories = self.get_categories()

    # Get all ingredients
    def get_ingredients(self):
        parameters = {'i': 'list'}
        response = self.get_request('list', parameters)
        result = {}
        for item in response:
            result[item['strIngredient']] = {
                'id': item['idIngredient'],
                'description': item['strDescription']
            }
        return result

    # Get all categories
    def get_categories(self):
        parameters = {'c': 'list'}
        response = self.get_request('list', parameters)
        result = [item['strCategory'] for item in response]
        return result

    # Get all areas
    def get_areas(self):
        parameters = {'a': 'list'}
        response = self.get_request('list', parameters)
        result = [item['strArea'] for item in response]
        return result

    # Get simple information about recipes
    def filter_by_section(self, identifier, field):
        parameters = {identifier: field}
        response = self.get_request('filter', parameters)
        meals = {meal['idMeal']: meal['strMeal'] for meal in response}
        return meals

    # Helper function to perform GET request
    def get_request(self, query, parameters):
        return requests.get(self.server + query + '.php', params=parameters).json()['meals']


if __name__ == "__main__":
    api = mealdbAPI()
    categories = api.categories
    print("Getting Recipes by Categories")
    meals = {}
    for c in categories:
        print("Reading " + c)
        meals.update(api.filter_by_section('c',c))

    areas = api.areas
    print("Getting Recipes by Areas")
    for a in areas:
        print("Reading " + a)
        meals.update(api.filter_by_section('a',a))

    print("Writing results to file")
    result = json.dumps(meals, indent=4)
    filepath = "recipelist.json"
    with open(filepath, "w") as outfile:
        outfile.write(result)

    print("Uploading recipes to firebase")

    cred = credentials.Certificate("./service_credentials.json")
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://insta-chef-ba8dc-default-rtdb.firebaseio.com/'
    })
    ref = db.reference('/recipes')
    recipes = ref.set(meals)

    print("Firebase successfully updated")




