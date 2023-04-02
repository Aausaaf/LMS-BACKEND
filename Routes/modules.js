const express = require('express')
const { getModules, postModules } = require('../Handlers/Modules')

const modulesRoutes = express.Router()

modulesRoutes.get("/getmodules/:id",getModules)
modulesRoutes.post("/postmodules/:id",postModules)

module.exports = {
    modulesRoutes
}