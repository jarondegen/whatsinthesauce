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