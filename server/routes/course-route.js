const router = require('express').Router();
const Course = require('../models').course;
const courseValidation = require('../validation').courseValidation;

router.use((req, res, next) => {
    console.log("Course middleware");
    next();
})

router.get('/', async (req, res) => {
    try{
        let courses = await Course.find({})
        .populate("instructor", ["username", "email", "password"])
        .exec();
        return res.send(courses);
    }
    catch(e){
        return res.status(500).send(e);
    }
})

router.get('/:_id', async (req, res) => {
    let { _id } = req.params;
    try {
        let course = await Course.findOne({ _id })
        .populate("instructor", ["email"])
        .exec();
        return res.send(course);
    }
    catch(e){
        return res.status(500).send(e);
    }
})

router.patch('/:_id', async (req, res) => {
    let { _id } = req.params;

    try{
        let course = await Course.findOne({ _id });
        if (!course) return res.status(400).send("Course not found");

        if (course.instructor.equals(req.user._id)){
            let updatedCourse = await Course.findOneAndUpdate({ _id }, req.body, { new: true, runValidators: true });
            return res.send({
                message: "Course updated successfully",
                updatedCourse
            });
        }
        else{
            return res.status(403).send("Only the instructor can update the course");
        }
    }
    catch(e){
        return res.status(500).send(e);
    }
})

router.delete('/:_id', async (req, res) => {
    let { _id } = req.params;
    try{
        let course = await Course.findOne({ _id }).exec();
        if (!course) return res.status(400).send("Course not found");

        if (!course.instructor.equals(req.user._id))
            return res.status(403).send("Only the instructor can delete the course");

        let deletedCourse = await Course.deleteOne({ _id }).exec();
        return res.send({
            message: "Course deleted successfully",
            deletedCourse
        });
    }
    catch(e){
        return res.status(500).send(e);
    }
})

router.post("/", async (req, res) => {
    let {error} = courseValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (req.user.isStudent()){
        return res.status(400).send("Only instructors can create courses");
    }
    let {title, description, price} = req.body;

    try{
        console.log(Course);
        let newCourse = new Course({title, description, price, instructor: req.user._id});
        let savedCourse = await newCourse.save();
        return res.send({
            message: "Course created successfully",
            savedCourse
        });
    }
    catch(e){
        return res.status(500).send("Error creating course", e);
    }
})

module.exports = router;