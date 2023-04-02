const express = require('express')
const { getLecture, postLecture, patchLecture, deleteLecture } = require('../Handlers/lecture')

const lectureRoutes = express.Router()

lectureRoutes.get("/getlecture/:course",getLecture)
lectureRoutes.post("/addlecture",postLecture)
lectureRoutes.patch("/updated/:id",patchLecture)
lectureRoutes.delete("/deletelecture/:id",deleteLecture)

module.exports = {
    lectureRoutes
}