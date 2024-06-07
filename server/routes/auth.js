const router = require('express').Router();
const registerValidation = require('../validation').registerValidation;
const loginValidation = require('../validation').loginValidation;
const courseValidation = require('../validation').courseValidation;
const User = require('../models').user;
const jwt = require('jsonwebtoken');

router.use((req, res, next) => {
    console.log("Auth middleware");
    next();
})

router.get("/testAPI", (req, res) => {
    res.send("Auth route is working");
})

router.post("/register", async (req, res) => {
    let { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists");
    
    let { username, email, password, role } = req.body;
    let newUser = new User({ username, email, password, role });
    try {
        let savedUser = await newUser.save();
        return res.send({
            msg: "User registered successfully",
            user: savedUser
        });
    }
    catch (e) {
        return res.status(500).send('Error registering user');
    }
})

router.post("/login", async (req, res) => {
    let { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) return res.status(401).send("Cannot find user with this email");

    foundUser.comparePassword(req.body.password, (err, isMatch) => {
        if (err) return res.status(500).send("Error comparing password");
        if (!isMatch) return res.status(401).send("Incorrect password");

        let token = jwt.sign({ _id: foundUser._id, email: foundUser.email }, process.env.PASSPORT_SECRET);
        return res.send({
            message: "User logged in successfully",
            token: "JWT " + token,
            user: foundUser
        });
    })
})

module.exports = router;