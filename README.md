# Expense Tracker

### Live Demo

[https://jolly-pike-bddb79.netlify.app/](https://jolly-pike-bddb79.netlify.app/)

- It probably takes a longer time to load the first page because its server runs on Heroku free tier.
- It look different on the mobile and the desktop (only tested on iPhone 11 and Macbook pro 16'')

### Screenshots

![et_ss](https://user-images.githubusercontent.com/22745427/138587532-a2d6eb0f-2038-4001-8463-4d034d015090.png)

### Assumption

- All numbers meaning the amount always represent up to two decimal places.
- The tax is applied at 15%, and it is handled by frontend not backend.
- Adding a new expense and updating an expense is available in the list not through any separated screen such as popup. It is because I think it is the best UX for users.
- Expenses are sorted based on the date by desc. The newest date locates at the top.
- Date is filled with the date of today by default for better UX.
- Date doesn't display time. Only the date is displayed.
- Only two types of validation are used. One is to check if there is a field with empty, and the other one is to check if the amount is less than or equal to 0.

### Tech stack

#### Frontend

- React
- Pure CSS (Flex)
- Libraries: redux, redux-thunk, axios

#### Backend

- Nodejs (Express)
- MongoDB
- Libraries: mongoose, dotenv, cors, morgan
- Documentation: swagger-jsdoc, swagger-ui-express

### Before you run it

#### Frontend

- Replace the baseURL in the api.js file located in /src/api folder with the localhost address.

#### Backend

- Make a .env file and define a variable named MONGODB_URI and set your mongodb's uri to this key.

### Documentation

- Comments in the source code would help understanding. I tried to write it in detail.
- For the API on the server, please refer to this [API document](https://expense-tracker-server-smhong.herokuapp.com/api-docs/). It has to be used for development, but I have allowed it to be shown on purpose for your convinience.
