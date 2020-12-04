from flask import Blueprint, jsonify, request
from starter_app.models import User, db

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
def index():
  response = User.query.all()
  return { "users": [user.to_dict() for user in response]}


@user_routes.route('/new', methods=["POST"])
def new_user():
  errors = []
  data = request.get_json()
  if data["username"] == '':
    errors.append('enter a username')
  if data["email"] == '':
    errors.append('enter a email')
  if data["password"] == '':
    errors.append('enter a password')
  if len(data["password"]) < 6:
    errors.append('password must 6 characters')
  if len(errors) == 0:
    try:
      new_account = User(username=data["username"], password=data["password"], email=data["email"])
      db.session.add(new_account)
      db.session.commit()
      new_account = new_account.to_dict()
      return jsonify({"errors":errors, "user":new_account})
    except:
      errors.append('username or email already exists')
      return jsonify({"errors":errors})
  else:
    return jsonify({"errors":errors})

@user_routes.route('/get/<user_id>', methods=["GET"])
def get_user(user_id):
  user = User.query.filter(User.id == user_id).one()
  info = user.to_dict()
  return jsonify({"info": info})


@user_routes.route('/edit', methods=["POST"])
def edit_user():
  data = request.get_json()
  user = User.query.filter(User.id == data["user_id"]).one()
  if user.username == 'Demo-User':
    return jsonify('Please don\'t change "Demo-User" info')
  try:
    if data["change"] == 'email':
      user.email=data["new_email"]
    else:
      user.password=data["new_password"]
  except: return jsonify('Something went wrong')
  db.session.commit()
  return jsonify('success')

@user_routes.route('/profile_pic', methods=["POST"])
def change_pic_url():
    try:
        data = request.get_json()
        user = User.query.filter(User.id == data["user_id"]).one()
        user.pic_url = data["image_url"]
        db.session.commit()
        return jsonify('profile pic changed')
    except:
        return jsonify('something went wrong')

@user_routes.route('/profile_pic/<user_id>', methods=["GET"])
def get_pic_url(user_id):
    try:
        user = User.query.filter(User.id == user_id).one()
        return jsonify(user.pic_url)
    except:
        return jsonify('something went wrong')