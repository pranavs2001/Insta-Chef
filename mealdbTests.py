from mealdbAPI import mealdbAPI
import json

if __name__ == "__main__":
    api = mealdbAPI()
    # print(api.get_ingredient('Aubergine'))
    aubergine_meals = api.filter_by_ingredient('Aubergine')
    # print(aubergine_meals)
    ratatouille = api.get_meal_info(aubergine_meals['Ratatouille']['id'])
    print(ratatouille['name'])
    print('\nIngredients')
    for ingredient, measure in ratatouille['ingredients'].items():
        print(ingredient + ': ' + measure)
    print('\nInstructions:')
    print(ratatouille['instructions'])
    
