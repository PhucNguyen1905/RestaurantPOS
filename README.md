# RestaurantPOS

Example template: https://www.youtube.com/watch?v=MJUssi2c6Ls&list=WL&index=4&t=299s

Backend: NodeJs, Express, MySQL

Source code is in folder **src**

# Introduction 
## Website
The completed version has been deployed via **heroku**: https://shibares.herokuapp.com
## Features
1. User:
- Authentication: Register, login, update profile
- View menu, sort by category
- Add to cart, Online payment (Via Paypal)
- Give feedback
- Book table
2. Admin:
- CRUD category, CRUD product
- Manage order, manage booking table
- Manage user, feedback


# Script for running
Install Mysql and run the script **shibares.sql**

Run project: **npm start**

Open http://localhost:8080/ to access home page

Image Link: https://raw.githubusercontent.com/PhucNguyen1905/RestaurantPOS/main/images/ + food.image. Just store image name in database

Role for user:
- 1: Manager
- 2: Cashier
- 3: Kitchen Staff
- 5: User


