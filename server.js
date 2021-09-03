// EXPRESS
const express = require('express');
// APP
const app = express();
// DOTENV
const dotenv = require('dotenv').config();
// CONNECTDB METHOD
const connectDB = require('./config/db');
// ROUTES
const userRoute = require('./route/user');
const productRoute = require('./route/product');
const orderRoute = require('./route/order');

app.use(express.json()); // FOR PARSING

connectDB(); // DATABSE CONNECT

// USING ROUTES
app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/order', orderRoute);

// PORT
const port = process.env.PORT || 8000;
// LISTEN
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
