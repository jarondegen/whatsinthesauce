from flask import Blueprint, jsonify, request
from starter_app.models import User, Shopping_List, db, Ingredient, Ing_Shop
from sqlalchemy.orm import joinedload
from datetime import datetime

list_routes = Blueprint('lists', __name__)

@list_routes.route('/<user_id>', methods=["GET"])
def index(user_id):
  response = Shopping_List.query.filter(Shopping_List.user_id == user_id).all()
  return { "user_lists": [shopping_list.to_dict() for shopping_list in response]}

@list_routes.route('/new', methods=["POST"])
def new_list():
    data = request.get_json()
    new_shop_list = Shopping_List(name=data["name"], 
                                user_id=data["user_id"], 
                                date=datetime.now())
    db.session.add(new_shop_list)
    db.session.commit()
    new_shop_list = new_shop_list.to_dict()
    return jsonify(new_shop_list)
    

@list_routes.route('/delete/<list_id>', methods=["DELETE"])
def delete_list(list_id):
    list_items = Ing_Shop.query.filter(Ing_Shop.list_id == list_id).all()
    for item in list_items:
        db.session.delete(item)
    list_to_delete = Shopping_List.query.filter(Shopping_List.id == list_id).one()
    db.session.delete(list_to_delete)
    db.session.commit()
    return jsonify('deleted')
    

@list_routes.route('/items/<int:list_id>', methods=["GET"])
def get_list_items(list_id):
    user_list = Shopping_List.query.filter(Shopping_List.id == list_id).one()
    user_list = user_list.to_dict()
    items = Ing_Shop.query.join(Ingredient, Ing_Shop.ingredient_id == Ingredient.id).add_columns(
            Ingredient.name).add_columns(
            Ingredient.expires_in).add_columns(
            Ingredient.id).options(
            joinedload(Ing_Shop.ingredients)).filter(
            Ing_Shop.list_id == list_id)
    list_items = [{"id":item.id, "expires_in":expires_in, "name":name, "ingredient_id": id} for (item, name, expires_in, id) in items]
    return jsonify({"items":list_items, "user_list":user_list})


@list_routes.route('/add', methods=["POST"])
def add_list_items():
    data = request.get_json()
    try:
        exists = Ing_Shop.query.filter(
        Ing_Shop.ingredient_id == data["itemToAdd"]).filter(
        Ing_Shop.list_id == data["listId"]).one()
    except:
        new_item = Ing_Shop(list_id=data["listId"], ingredient_id=data["itemToAdd"])
        db.session.add(new_item)
        db.session.commit()
        new_item = new_item.to_dict()
        return jsonify(new_item)
    return jsonify('already exists')
    

@list_routes.route('/remove-item', methods=["POST"])
def remove_list_items():
    data = request.get_json()
    item_to_remove = Ing_Shop.query.filter(
        Ing_Shop.ingredient_id == data["ingredient_id"]).filter(
        Ing_Shop.list_id == data["listId"]).one() 
    db.session.delete(item_to_remove)
    db.session.commit()
    return jsonify('item removed')
