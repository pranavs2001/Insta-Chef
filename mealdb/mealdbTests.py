from mealdbAPI import mealdbAPI
import json
import random
import sys 


if __name__ == "__main__":
    api = mealdbAPI()

    # Get ingredient search from stdin
    # Search for ingredients that match the start of the entered string
    # Pick a random ingredietn from that list
    # Search for recipes that have that ingredient
    # Pick a random recipe from that list
    # Display that recipe's info 
    while (True):
        print('\n')
        searchstr = sys.stdin.readline().rstrip()
        ingredients = api.search_ingredients(searchstr)
        if not ingredients:
            print("No corresponding ingredients")
            continue
        random_ingredient = random.choice(ingredients)
        print("Random ingredient: " + random_ingredient + " from: ", end='')
        print(ingredients)
        recipes = api.filter_by_ingredient(random_ingredient)
        if not recipes:
            print("No corresponding recipes")
            continue
        recipe_ids = list(recipes)
        chosen_recipe = random.choice(recipe_ids)
        print("Random recipe: " + recipes[chosen_recipe]['name'] + " from: ", end='')
        print([info['name'] for num, info in recipes.items()])
        print(api.get_meal_info(chosen_recipe))

    # OLD TESTS

    # # print(api.get_ingredient('Aubergine'))
    # aubergine_meals = api.filter_by_ingredient('Aubergine')
    # # print(aubergine_meals)
    # ratatouille = api.get_meal_info(aubergine_meals['Ratatouille']['id'])
    # print(ratatouille['name'])
    # print('\nIngredients')
    # for ingredient, measure in ratatouille['ingredients'].items():
    #     print(ingredient + ': ' + measure)
    # print('\nInstructions:')
    # print(ratatouille['instructions'])
    
