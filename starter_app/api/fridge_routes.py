from flask import Blueprint, jsonify, request
import requests
from sqlalchemy.orm import joinedload
from datetime import timedelta, datetime, date
from starter_app.models import (
    User, 
    Shopping_List, 
    db, 
    Ingredient, 
    Ing_Shop, 
    Food_Group, 
    Fridge_Ingredient
)

fridge_routes = Blueprint('fridges', __name__)

    
@fridge_routes.route('/<user_id>', methods=["GET"])
def get_fridge_items(user_id):
    items = Fridge_Ingredient.query.filter(
        Fridge_Ingredient.user_id == user_id).join(
        Ingredient, Fridge_Ingredient.ingredient_id == Ingredient.id).add_columns(
        Ingredient.name).add_columns(
        Ingredient.expires_in).order_by(
        Ingredient.food_group_id)
    items_list = [{"id":item.id, "ingredient_id":item.ingredient_id,
                   "price":item.price, "date":item.date,
                   "name":name, "expires_in":expires_in,
                   "expires_on":item.date + timedelta(days=expires_in) if not ((item.date + timedelta(days=expires_in)) - date.today()).days < 0 else 'expired',
                   "expiring_soon": ((item.date + timedelta(days=expires_in)) - date.today()).days <= 2
                    } for (item, name, expires_in) in items]
    return jsonify(items_list)


@fridge_routes.route('/add', methods=["POST"])
def add_fridge_item():
    data = request.get_json()
    new_item = Fridge_Ingredient(ingredient_id=data["ingredient_id"],
                                 user_id=data["user_id"],
                                 price=data["price"],
                                 date=datetime.today())
    removed_list_item = Ing_Shop.query.filter(Ing_Shop.id == data["id"]).one()
    db.session.add(new_item)
    db.session.delete(removed_list_item)
    db.session.commit()
    return jsonify('added to fridge')


@fridge_routes.route('/delete/<id>', methods=["DELETE"])
def remove_fridge_item(id):
    item_to_remove = Fridge_Ingredient.query.filter(Fridge_Ingredient.id == id).one()
    db.session.delete(item_to_remove)
    db.session.commit()
    return jsonify('removed from fridge')
    
    

@fridge_routes.route('/recipes', methods=["POST"])
def get_recipes():
    data = request.get_json()
    recipes = []
    items = data["items"]
    for item in items:
        r =requests.get(f'https://www.themealdb.com/api/json/v1/1/filter.php?i={item["name"]}')
        if r.status_code == 200:
            res = r.json()
            if res["meals"] and len(res["meals"]) > 0:
                for item in res["meals"]:
                    j =requests.get(f'https://www.themealdb.com/api/json/v1/1/lookup.php?i={item["idMeal"]}')
                    if j.status_code == 200:
                        j_res = j.json()
                        meal = j_res["meals"][0]
                        recipes.append({"title":item["strMeal"], "href":meal["strYoutube"], "thumbnail":item["strMealThumb"]})
    return jsonify({"recipes": recipes})
