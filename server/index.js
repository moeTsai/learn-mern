const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const authRoute = require('./routes').auth;
const courseRoute = require('./routes').course;
const passport = require('passport');
require('./config/passport')(passport);
const cors = require('cors');

mongoose
.connect("mongodb+srv://admin:admin56@db1.lae7zup.mongodb.net/")
.then(() => {
    console.log("DB connected");
}).catch((err) => {
    console.log(err);
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", authRoute);
app.use("/api/courses", passport.authenticate("jwt", {session: false}), courseRoute);

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})