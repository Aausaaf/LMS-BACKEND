const express = require('express')
const { getSyllabus, postSyllabus } = require('../Handlers/Syllabus')

const syllabusRoutes = express.Router()

syllabusRoutes.get("/getsyllabus/:id",getSyllabus)
syllabusRoutes.post("/postsyllabus/:id",postSyllabus)

module.exports = {
    syllabusRoutes
}