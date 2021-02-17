import requests
import json
import QueryKeys

class mealdbAPI(object):
    def __init__(self):
        self.server = 'https://www.themealdb.com/api/json/v1/1/'
        # Get the base list of ingredients, areas, and meal categories
        self.set_lists()
    

    # Pull the lists of ingredients, areas, and categories
    # Do this once to avoid repeated requests for the same information
    def set_lists(self):

        parameters = {'i': 'list'}
        response = self.get_request('list', parameters)
        self.ingredients = {}
        for item in response:
            self.ingredients[item['strIngredient']] = {
                'id': item['idIngredient'],
                'description': item['strDescription']
            }

        parameters = {'a': 'list'}
        response = self.get_request('list', parameters)
        self.areas = [item["strArea"] for item in response]

        parameters = {'c': 'list'}
        response = self.get_request('list', parameters)
        self.categories = [item["strCategory"] for item in response]
    

    # Search the ingredient list for a specific ingredient
    def get_ingredient(self, ingredientName):
        try: 
            ingredient = {
                'name': ingredientName,
                'id': self.ingredients[ingredientName]['id'],
                'description': self.ingredients[ingredientName]['description'],
                'image': 'https://www.themealdb.com/images/ingredients/' + ingredientName + '.png'
            }
            return ingredient
        except KeyError:
            print(ingredientName + "is not valid")
            return {}


    # Get all the meals for an ingredient
    def filter_by_ingredient(self, ingredientName):
        parameters = {QueryKeys.filters['ingredients']: ingredientName}
        response = self.get_request('filter', parameters)
        if not response:
            return {}
        meals = {}
        for meal in response:
            meals[meal['idMeal']] = {
                'name': meal['strMeal'],
                'image': meal['strMealThumb']
            }
        return meals


    # Search ingredient list for any key that starts with the search string
    def search_ingredients(self, searchstr):
        return [key for key in self.ingredients if key.lower().startswith(searchstr.lower())]


    def get_meal_info(self, mealID):
        parameters = {QueryKeys.meal_searches['id']: mealID}
        # Response is formatted as an 1-item array of dictionaries
        response = self.get_request('lookup', parameters)[0]
        # Create a dictionary of ingredients to their quantity
        ingredients = {}
        for index in range(1, 20):
            if response['strIngredient' + str(index)]:
                ingredients[response['strIngredient' + str(index)]] = response['strMeasure' + str(index)]
        meal = {
            'name': response['strMeal'],
            'category': response['strCategory'],
            'area': response['strArea'],
            'ingredients': ingredients,
            'instructions': response['strInstructions'],
            'image': response['strMealThumb'],
            'video': response['strYoutube'],
            'source': response['strSource']
        }
        return meal


    # Helper function to perform GET request 
    def get_request(self, query, parameters):
        # Check to make sure the request is valid 
        if query not in QueryKeys.queries:
            return {}
        return requests.get(self.server + query + '.php', params=parameters).json()['meals']
