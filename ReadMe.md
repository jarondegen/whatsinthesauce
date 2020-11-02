# Whatsinthesauce

 - Grocery List and Fridge Tracker

# User Stories
----------------

- [ ] As a user I want to be able to build a grocery list before going to the market

- [ ] From this grocery list I would like to be able to remove and add items or add them to my "fridge"

- [ ] As a user I want to be able to see what is in my fridge and when things might go bad and the dollar value from the main page/dashboard
    - I would like my fridge list to be organized by food group
    - Pictures and prices of the food would be helpful

- [ ] As a user I would like to get recommendations for things to do with ingredients that may go bad soon
    - Link to whatsforlunch


# MVP
------
- [ ] shopping lists (add/delete/move items)
- [ ] fridge inventory with prices and pictures and expiration dates
- [ ] recipe recommendations
- [ ] login/signup/auth

# Stretch Goals
---------------
- [ ] mobile view support
- [ ] share what’s in your fridge with other users

# Data Base
-------------

- users
---------------------
    - id
    - username
    - email
    - hashed_password

- food_groups
---------------------
    - id
    - name

- ingredients
---------------------
    - id
    - name
    - expires_in
    - food_group_id

- shopping_lists
----------------------
    - indgredient_id
    - user_id
    - name (user_id + string)

- fridges
------------------
    - user_id
    - ingredient_id
    - price (nullable)

- recommendations
--------------------
    - id
    - ingredient_id
    - recommendation
    - recipe_url (nullable)


# Routes
----------
- `/` redirects to dashboard or login depending on authorization
- `/login` login/signup page
- `/home` user dashboard with fridge list and links to shopping lists
- `/shopping/new` create a new list page
- `/shopping/:id` interactive individual shopping list page
- `/profile` edit profile page with change password/email/username
- `/ingredients/:id` ingredient page with recommendations and info

