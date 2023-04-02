const express = require('express')
const { getQuiz, createQuiz, EditQuiz, DeleteQuiz } = require('../Handlers/Quiz')

const quizRoutes = express.Router()

quizRoutes.get("/getquiz/:course",getQuiz)
quizRoutes.post("/addquiz",createQuiz)
quizRoutes.patch("/updatequiz/:id",EditQuiz)
quizRoutes.delete("/deletequiz/:id",DeleteQuiz)

module.exports = {
    quizRoutes
}