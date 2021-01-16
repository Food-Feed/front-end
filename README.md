# FoodFeed

by [Hannah](https://github.com/hkofkin)

<img src="https://res.cloudinary.com/hsk23/image/upload/v1610760459/Food%20Feed/Screen_Shot_2021-01-15_at_5.26.32_PM_xhodby.png" alt="foodfeed_homepage">
<img src="https://res.cloudinary.com/hsk23/image/upload/v1610760459/Food%20Feed/Screen_Shot_2021-01-15_at_5.27.11_PM_rbxeh5.png" alt="foodfeed_recipes_page">
<img src="https://res.cloudinary.com/hsk23/image/upload/v1610760459/Food%20Feed/Screen_Shot_2021-01-15_at_5.28.02_PM_d2ebqa.png" alt="foodfeed_recipe_detail">

FoodFeed is a recipe app aimed at home chefs, providing recipe inspiration and assistance during the cooking process. Users can easily follow a recipe and cook while using voice command to control the recipe's walkthrough video hands-free.

##### Getting Started:  
1. Clone both the [frontend](https://github.com/Food-Feed/front-end) and the [backend](https://github.com/Food-Feed/back-end) repositories. 
```
$ git clone https://github.com/Food-Feed/front-end
$ git clone https://github.com/Food-Feed/back-end
```
2. `cd` into the backend repository  
3. Bundle install all necessary gems 
```
$ bundle install
```
4. Create the database and the migrations, then seed the database
```
$ rails db:create
$ rails db:migrate
$ rails db:seed
```
5. Start the rails server
```
$ rails s
```
6. `cd` into the frontend repository
7. Start the app. This will open in your default browser.
```
$ npm start
```

##### Prerequisites:
- Ruby on Rails
- VS code with [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
- PostgreSQL

### Features
- Log in/out, implemented with jwt authentication
- Browse existing recipes
- View a walkthrough video and control with voice commands
- Add a new recipe
- Edit or delete recipes they added
- Add comments on recipes

### In Progress Features
- Signup, implementing with jwt authentication
- Edit comments they added on recipes

### Tech Stack
- React.js
- Ruby on Rails API ([Backend](https://github.com/Food-Feed/back-end))
- PostgreSQL 
- HTML/CSS

### Tools
- [Cloudinary:](https://cloudinary.com/) Photo and video upload and storage
- [React Speech Recognition:](https://www.npmjs.com/package/react-speech-recognition) Speech recognition to implement voice command
- JWT Authentication