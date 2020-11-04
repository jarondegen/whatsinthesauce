from flask import Blueprint, jsonify, request
from sqlalchemy.orm import joinedload
from datetime import timedelta, datetime
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
        Ingredient.expires_in)
    items_list = [{"id":item.id, "ingredient_id":item.ingredient_id,
                   "price":item.price, "date":item.date,
                   "name":name, "expires_in":expires_in,
                   "expires_on":item.date + timedelta(days=expires_in)
                    } for (item, name, expires_in) in items]
    return jsonify(items_list)


@fridge_routes.route('/add', methods=["POST"])
def add_fridge_item():
    data = request.get_json()
    print('================', data)
    new_item = Fridge_Ingredient(ingredient_id=data["ingredient_id"],
                                 user_id=data["user_id"],
                                 date=datetime.now())
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
    
    
    # groups = Food_Group.query.all()
    # group_list = [item.to_dict() for item in groups]
    # items = Ingredient.query.all()
    # items_list = [item.to_dict() for item in items]
    # return jsonify({"ingredients":items_list, "food_groups": group_list})

#   id = db.Column(db.Integer, nullable = False, primary_key = True)
#   ingredient_id = db.Column(db.Integer, db.ForeignKey("ingredients.id"), nullable = False)
#   user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
#   price = db.Column(db.Integer, nullable = True)
#   date = db.Column(db.Date, nullable= False)
