from flask_jwt_extended import create_access_token, get_jwt_identity
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash


db = SQLAlchemy()

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable=False)

  shopping_lists = db.relationship("Shopping_List", back_populates="users")
  fridge_ingredients = db.relationship("Fridge_Ingredient", back_populates="users")

  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email
    }
  
  @property
  def password(self):
    raise AttributeError('Password not readable.')
  
  @password.setter
  def password(self, password):
        self.hashed_password = generate_password_hash(password)

  def check_password(self, password):
        return check_password_hash(self.password, password)

  @classmethod
  def authenticate(cls, username, password):
      user = cls.query.filter(User.username == username).scalar()
      return check_password_hash(user.hashed_password, password), user

class Food_Group(db.Model):
  __tablename__ = 'food_groups'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(40), nullable = False, unique = True)

  ingredients = db.relationship("Ingredient", back_populates="food_groups")

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
    }


class Ingredient(db.Model):
  __tablename__ = 'ingredients'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(40), nullable = False, unique = True)
  expires_in = db.Column(db.Integer, nullable = False)
  food_group_id = db.Column(db.Integer, db.ForeignKey("food_groups.id"), nullable = False)

  food_groups = db.relationship("Food_Group", back_populates="ingredients")
  ing_shops = db.relationship("Ing_Shop", back_populates="ingredients")
  fridge_ingredients = db.relationship("Fridge_Ingredient", back_populates="ingredients")
  recommendations = db.relationship("Recommendation", back_populates="ingredients")

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "expires_in": self.expires_in,
      "food_group_id": self.food_group_id,
    }


class Shopping_List(db.Model):
  __tablename__ = 'shopping_lists'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(40), nullable = False)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
  date = db.Column(db.Date, nullable= False)

  ing_shops = db.relationship("Ing_Shop", back_populates="shopping_lists")
  users = db.relationship("User", back_populates="shopping_lists")
  
  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "user_id": self.user_id,
      "date": self.date,
    }


class Ing_Shop(db.Model):
  __tablename__ = 'ing_shops'

  id = db.Column(db.Integer, primary_key = True)
  list_id = db.Column(db.Integer, db.ForeignKey("shopping_lists.id"), nullable = False)
  ingredient_id = db.Column(db.Integer, db.ForeignKey("ingredients.id"), nullable = False)

  shopping_lists = db.relationship("Shopping_List", back_populates="ing_shops")
  ingredients = db.relationship("Ingredient", back_populates="ing_shops")

  def to_dict(self):
    return {
      "list_id": self.list_id,
      "ingredient_id": self.ingredient_id,
    }


class Fridge_Ingredient(db.Model):
  __tablename__ = 'fridge_ingredients'

  id = db.Column(db.Integer, nullable = False, primary_key = True)
  ingredient_id = db.Column(db.Integer, db.ForeignKey("ingredients.id"), nullable = False)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
  price = db.Column(db.Integer, nullable = True)
  date = db.Column(db.Date, nullable= False)

  ingredients = db.relationship("Ingredient", back_populates="fridge_ingredients")
  users = db.relationship("User", back_populates="fridge_ingredients")

  def to_dict(self):
    return {
      "ingredient_id": self.ingredient_id,
      "price": self.price,
      "user_id": self.user_id,
      "date": self.date,
    }


class Recommendation(db.Model):
  __tablename__ = 'recommendations'

  id = db.Column(db.Integer, nullable = False, primary_key = True)
  ingredient_id = db.Column(db.Integer, db.ForeignKey("ingredients.id"), nullable = False)
  recipe_name = db.Column(db.String(200), nullable = False)
  url = db.Column(db.String(400), nullable = True)

  ingredients = db.relationship("Ingredient", back_populates="recommendations")