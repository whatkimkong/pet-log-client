# Pet Log

## Description

Pet Log is a mobile-first app, created to help pet owners manage their pets' life. With Pet Log, users can create a profile for each of their pets, where they can store important information about them. One of the main features is that Pet Log creates notification based on the information the user inputs, like vaccine alerts, bithdays and even when the user might be out of stock of food for the pets. Additionally, Pet Log works as an aggregator for pet-friendly recipes and showcases the pet services near the user location, like vets, dog parks, day cares, etc. All of this based on community input. Pet Log is the final project of Ironhack's Web Development Bootcamp, and had as purpose the implementation of a full MERN stack application.

## MVP

- Authentication and Authorization process allowing users to sign up and view the website.
- Home view on the public (not logged in user) and private (logged in user) side, showing the user's dashboard. The homepage on the private side, including a "next events" area of notifications.
- Navbar, also distinguishing public and private view.
- User profile editting page.
- Pet profile page, with all important information, with the possibility to edit, add or delete a pet, as well as possibility to see the pet's journal.
- Pet journal view, with all the logs detailed and the possibility to add a new one, or edit an existing one.
- Photo gallery view, as an aggregator of pet photos, with the possibility to add new ones or delete existing ones.
- Recipes view (for public and private profile), where users can view all existing recipes, search and filter then and add new ones (for logged in users only).
- Recipe details view, where the user can see all of the recipe details and it's reviews. For logged in users, the possibility to add a review to a recipe and to add or remove that recipe from their favorites. For logged in users who are the recipe creators, the possibility to edit or delete a recipe.
- Services view (for public and private profile), where users can search for nearby services in an interactive map. users can filter searched services per category. By clicking on the service marker, users can see the service details, as well as its reviews. Logged in users can add new services, edit and delete services created by themselves, and add reviews to services.

## Backlog

- Calendar to display all events.
- Possibility to add events or other categories other than birthdays, vaccines or food.
- Edit and delete reviews.
- Filter photos on the gallery per pet.
- Limit service display on a radius centered on user's location.
- Error landing pages.

## Data Structure

### Routes

#### 1. auth.js

This file hosts the necessary routes to allow for user sign up, login and logout. In the sign up post route were applied the following validators: check if all required fields are filled, check email format, check password strength and check if email is unique. Aditionally, password is encrypted and the user is create in the database. For the login route, it's also checked if all required information has been filled, if the user exists in the database and if the password matches. Then, the user is authenticated. At the same time, an auth middleware was created in order to create all necessary authentication needed for the app function.

#### 2. events.js

This file handles the creation and display of events related to pets. It gathers information filled by the user for other purposes, like pet creation and log creation, and additionally creates an event.

#### 3. logs.js

This file handles the creation and editing of logs, as well as their display, either all together, per pet, or a specific one.

#### 4. pets.js

The file handles the creation of new pets, as well as their editting and deletion. Additionally, it displays all pets per owner and also GETS a specific pet. As backlog, it is prepared to create legal information per pet (a specific model).

#### 5. petServices.js

The file handles the creation of new services, as well as their editting and deletion. It also displays all services and also GETS a specific service. Additionally, this file allows for review creation on a specific service.

#### 6. photos.js

The file handles the creation of new photos, as well as their deletion. It also displays all photos per owner.

#### 7. recipes.js

The file handles the creation of new recipes, as well as their editting and deletion. It also displays all recipes and also GETS a specific one. Additionally, this file allows for review creation on a specific recipe.

#### 8. user.js

The file handles the editing of a user/owner and, for that mean, it also GETS the user.

### Pages

The pages for this app are composed by components and are components themselves. The existing groups of pages are HomePage, Auth, PetServices, PhotoGallery, Profiles and Recipes. Global to those pages, there are the following single components: Loading, LogCard, Menu, Navbar and RecipeCard.

#### HomePage

This page contains the homepage view, both the public and the private versions.

#### Auth

- Login component
- Signup component

#### PetServices

- PetServices - the component that displays all services in the map and displays the service details, plus possibility to delete a given service.
- LocationMarker - the component that finds and showcases the user location and displays the location of new .
- EditService - the component that handles the edit form.

#### PhotoGallery

- Photos - the component that handles photo display, adding and deleting.

#### Profiles

- UserProfile - the component that displays user information and handles editing.
- PetProfile - the component that displays pet information, and allows for deleting.
- EditPet - the component that handles pet information's editing.
- AddPet - the component that handles adding a pet.
- PetLog - the component that handles log display for a specific pet.
- EditLog - the component that handles log editing.
- AddLog - the component that handles adding a log.

#### Recipes

- Recipes - the component that displays all recipes and the recipe details.
- RecipeDetails - the component that displays a given recipe's details, and reviews. Additionally, the possibility to add a review, add or remove the recipe from favorites and deleting the recipe.
- EditRecipe - the component that handles recipe editing.
- AddRecipe - the component that handles adding a recipe.

### Models

- Event.model.js
- Legal.model.js
- Log.model.js
- Pet.model.js
- Photo.model.js
- Recipe.model.js
- Review.model.js
- Service.model.js
- User.model.js

### Other files

#### Middlewares

- isLoggedIn - contains all authentication middleware
- cloudinary.config.js - contains cloudinary middleware to load images
