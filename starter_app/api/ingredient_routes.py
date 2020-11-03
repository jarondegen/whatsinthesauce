from flask import Blueprint, jsonify, request
from starter_app.models import User, Shopping_List, db, Ingredient, Ing_Shop, Food_Group
from sqlalchemy.orm import joinedload
from datetime import datetime

ingredient_routes = Blueprint('ingredients', __name__)

    
@ingredient_routes.route('/', methods=["GET"])
def get_ingredients():
    groups = Food_Group.query.all()
    group_list = [item.to_dict() for item in groups]
    items = Ingredient.query.all()
    items_list = [item.to_dict() for item in items]
    return jsonify({"ingredients":items_list, "food_groups": group_list})

@ingredient_routes.route('/groups/<group_id>', methods=["GET"])
def get_ingredients_by_group(group_id):
    items = Ingredient.query.filter(Ingredient.food_group_id == group_id).all()
    items_list = [item.to_dict() for item in items]
    return jsonify(items_list)




