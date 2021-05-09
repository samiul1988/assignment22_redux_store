## Assignment 22: Redux Store
---
### Topic
Redux

### User Story (Obtained from the assignment description)

```
AS a senior engineer working on an e-commerce platform
I WANT my platform to use Redux to manage global state instead of the Context API
SO THAT my website's state management is taken out of the React ecosystem
```

### Acceptance Criteria (Obtained from the assignment description)

```
GIVEN an e-commerce platform that uses Redux to manage global state
WHEN I review the app’s store
THEN I find that the app uses a Redux store instead of the Context API
WHEN I review the way the React front end accesses the store
THEN I find that the app uses a Redux provider
WHEN I review the way the app determines changes to its global state
THEN I find that the app passes reducers to a Redux store instead of using the Context API
WHEN I review the way the app extracts state data from the store
THEN I find that the app uses Redux instead of the Context API
WHEN I review the way the app dispatches actions
THEN I find that the app uses Redux instead of the Context API   
```

## My Actions and Notes

* The project was developed from the module project code base.
* Basic considerations were as follows:
    * The module project was converted to use Redux based global store instead of Context API
    * Following changes were made in the front-end side codes of the project:
        * Redux Toolkit package was used to implement redux based state management since this is a preferred way of implementing redux to a modern application
        * ```@reduxjs/toolkit``` and ```react-redux``` libraries were used to implement redux store and provider
        * The React front end of the application accesses the Redux store using a Provider imported from ```react-redux``` library
        * The app passed a reducer to the redux store (called ```root```) to determine its global state
        * The app used dispatch and selectors to dispatch actions and get state from the redux store
        * These files were removed from the ```client``` folder: ```GlobalState.js```, ```action.js``` and ```reducers.js```. Instead a ```redux``` folder was created that contains definitions of reducers, actions and the store
        * The dispatch calls in the following components/pages were replaced with the updated redux-based dispatch calls: ```Cart```, ```CartItem```, ```CategoryMenu```, ```ProductItem```, ```ProductList``` and ```Details``` 
        * For this project, I've intentionally stored all necessary state items into one reducer to keep it simple. It is also possible to create separate reducers with distinct functionality and combine these in the store (e.g. in this project we could create three reducers called products, cart and categories and combine these directly in the store)  
    * No changes were made in the backend codes
    * The refactored application retains all the functionality of the original application
    * Application was deployed to Heroku

### Demo Run
<h6>Signup Functionality</h6>

![Demo Run](./client/src/assets/assignment22-demo-01.gif)

<h6> Selecting a category, choosing a product, viewing details of a product, adding and removing a product from the cart </h6>

![Demo Run](./client/src/assets/assignment22-demo-02.gif)

<h6>Checkout Functionality</h6>

![Demo Run](./client/src/assets/assignment22-demo-03.gif)

### Link of Deployed Application
[Heroku App Link](https://assignment22-redux-store.herokuapp.com/)
