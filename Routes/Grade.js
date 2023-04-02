const express = require('express')
const { getGrade, postGrade, patchGrade, deleteGrade, getTotalStudentGrade } = require('../Handlers/Grade')

const gradeRoutes = express.Router()

gradeRoutes.get("/getallstudent/:id",getTotalStudentGrade)
gradeRoutes.get("/getgrade/:id/:name",getGrade)
gradeRoutes.post("/addgrade/:id",postGrade)
gradeRoutes.patch("/editgrade/:id/:index",patchGrade)
gradeRoutes.delete("/deletegrade/:id/:user/:index",deleteGrade)

module.exports = {
    gradeRoutes
}