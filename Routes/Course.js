const express = require('express');
const { postCourseData, getCourseData } = require('../Handlers/Course');

const courseRoute = express.Router()

courseRoute.get('/course/:category', getCourseData)
courseRoute.post("/addCourse",postCourseData)

module.exports = {
    courseRoute
}

