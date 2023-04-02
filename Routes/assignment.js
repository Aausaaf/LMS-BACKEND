const express = require('express')
const { getAssignments, createAssignments, EditAssignments, DeleteAssignments } = require('../Handlers/Assignment')

const assignmentRoutes = express.Router()

assignmentRoutes.get("/getassignment/:course",getAssignments)
assignmentRoutes.post("/addassignment",createAssignments)
assignmentRoutes.patch("/updateassignment/:id",EditAssignments)
assignmentRoutes.delete("/deletelecture/:id",DeleteAssignments)

module.exports = {
    assignmentRoutes
}