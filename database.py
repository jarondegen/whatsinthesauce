from dotenv import load_dotenv
load_dotenv()

from starter_app import app, db
from starter_app.models import User, Food_Group, Ingredient

with app.app_context():
  db.drop_all()
  db.create_all()

  ian = User(username = 'Ian', email = 'ian@aa.io', password = "password")
  javier = User(username = 'Javier', email = 'javier@aa.io', password = "password")
  dean = User(username = 'Dean', email = 'dean@aa.io', password = "password")
  angela = User(username = 'Angela', email = 'angela@aa.io', password = "password")
  soonmi = User(username = 'Soon-Mi', email = 'soonmi@aa.io', password = "password")
  alissa = User(username = 'Alissa', email = 'alissa@aa.io', password = "password")

  fruit = Food_Group(name = 'Fruit') #        1
  veg = Food_Group(name = 'Vegetable') #      2
  dairy = Food_Group(name = 'Dairy') #        3
  protein = Food_Group(name = 'Protein') #    4 
  condiment = Food_Group(name = 'Condiment')# 5
  beverage = Food_Group(name = 'Beverage') #  6
  other = Food_Group(name = 'Other') #        7

  milk = Ingredient(name = 'Milk', expires_in = 10, food_group_id = 3)
  eggs = Ingredient(name = 'Eggs', expires_in = 30, food_group_id = 3)
  strawberries = Ingredient(name = 'Strawberries', expires_in = 6, food_group_id = 1)
  broccoli = Ingredient(name = 'Broccoli', expires_in = 5, food_group_id = 2)
  chicken_raw = Ingredient(name = 'Chicken (raw)', expires_in = 2, food_group_id = 4)
  ketchup = Ingredient(name = 'Ketchup', expires_in = 180, food_group_id = 5)
  oj = Ingredient(name = 'Orange Juice', expires_in = 7, food_group_id = 6)
  anchovies = Ingredient(name = 'Anchovies', expires_in = 60, food_group_id = 7)
  caviar = Ingredient(name = 'Caviar', expires_in = 21, food_group_id = 7)

  db.session.add(ian)
  db.session.add(javier)
  db.session.add(dean)
  db.session.add(angela)
  db.session.add(soonmi)
  db.session.add(alissa)

  db.session.add(fruit)
  db.session.add(veg)
  db.session.add(dairy)
  db.session.add(protein)
  db.session.add(condiment)
  db.session.add(beverage)
  db.session.add(other)

  db.session.commit()
  
  db.session.add(milk)
  db.session.add(eggs)
  db.session.add(strawberries)
  db.session.add(broccoli)
  db.session.add(chicken_raw)
  db.session.add(ketchup)
  db.session.add(oj)
  db.session.add(anchovies)
  db.session.add(caviar)

  db.session.commit()