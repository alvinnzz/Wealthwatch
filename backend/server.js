require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const userRoute = require('./routes/user-route')
const PORT = process.env.PORT || 5001;
const app = express();

//app.use(express.urlencoded({ extended: true }));  
app.use(express.json());
app.use(bodyParser.json())
//for login and signup
app.use('/api/users', userRoute)

app.get("/", (req,res) => {
    console.log("home")
    res.status(200).send("Homepage")
})

app.get("/api/users/signup", (req,res)=>{
    console.log("signup page")
    res.status(200).send("Signup page")
})


mongoose
    .connect("mongodb+srv://admin:wealthwatch123@wealthwatch.d49vvso.mongodb.net/test?retryWrites=true&w=majority")
    .then(()=>{
        console.log('Connected to MongoDB')
        app.listen(PORT, () => {
            console.log("listening on port " + PORT + "......");
        })
    })
    .catch(err => {
        console.log(err);
    })

