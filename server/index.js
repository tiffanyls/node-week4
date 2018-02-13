require('dotenv').config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require('express-session');

const port = 3001;

const app = express();

app.use(json());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUnintialized: false,
    resave: false,
    cookie: {maxAge: 10000}
}));

app.use((req, res, next) =>{
    //console.log('req.method: ', req.method);
    console.log('SESSION: ', req.session);
    console.log('BODY:', req.body)
    next();
});

function checkAuth(req,res,next) {
    const username = 'tiffany';
    if (req.body.username === username) {
        next();
    } else {
        res.status(200).json({message: " Unauthorized user"});
    }
}

app.get("/api/test", (req, res, next) => {
  res.status(200).json({ message: "Success!" });
});

app.post('/api/login', checkAuth, (req, res, nest) => {
    res.status(200).json({message: "Authenticated"});
});

app.post('/api/cart', (req, res, next)=> {
    if(!req.session.cart) req.session.cart=[];
    req.session.cart.push(req.body);
    res.status(200).json(req.session.cart);
});

app.get('/api/cart', (req, res, next) => {
    if (!req.session.cart) res.status(400).json({message: "No Cart Created"});
    else res.status(200).json(req.session.cart);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});