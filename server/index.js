const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");

const port = 3001;

const app = express();

app.use(json());
app.use(cors());
app.use((req, res, next) =>{
    console.log('req.method: ', req.method);
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
})

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});