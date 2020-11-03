from flask import Blueprint, jsonify, request
from starter_app.models import User, Shopping_List, db
from datetime import datetime

list_routes = Blueprint('lists', __name__)

@list_routes.route('/<user_id>', methods=["GET"])
def index(user_id):
  response = Shopping_List.query.filter(Shopping_List.user_id == user_id).all()
  return { "user_lists": [shopping_list.to_dict() for shopping_list in response]}

@list_routes.route('/new', methods=["POST"])
def new_list():
    data = request.get_json()
    print('=================', data)
    new_shop_list = Shopping_List(name=data["name"], 
                                user_id=data["user_id"], 
                                date=datetime.now())
    db.session.add(new_shop_list)
    db.session.commit()
    new_shop_list = new_shop_list.to_dict()
    return jsonify(new_shop_list)
    
@list_routes.route('/delete/<list_id>', methods=["DELETE"])
def delete_list(list_id):
    list_to_delete = Shopping_List.query.filter(Shopping_List.id == list_id).one()
    db.session.delete(list_to_delete)
    db.session.commit()
    return jsonify('deleted')
    