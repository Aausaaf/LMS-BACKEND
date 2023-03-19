const express = require('express')
const { getSignupData, getNumberOfUser, createUser, getLoginUser, isLoggedIn, getUserDelete, forgotPassword, getVerifyForgetpasswordOtp, ChangePassword, changePasswordWithProfilepage, editUserDetailsByAdmin, editDataByUser } = require('../Handlers/User')

const singupRoute = express.Router()

singupRoute.get("/getsignupdata",getSignupData)
singupRoute.get("/getnumberofuser",getNumberOfUser)
singupRoute.post("/postsignupdata",createUser)
singupRoute.post("/login",getLoginUser)
singupRoute.get("/loggedin",isLoggedIn)
singupRoute.delete("/deleteuser/:email",getUserDelete)
singupRoute.post("/forgotpassword",forgotPassword)
singupRoute.post("/verifyforgetpasswordotp",getVerifyForgetpasswordOtp)
singupRoute.post("/changepassword",ChangePassword)
singupRoute.post("/changepasswordfromprofilepage",changePasswordWithProfilepage)
singupRoute.patch("/updateuserdetailsbyadmin/:userId",editUserDetailsByAdmin)
singupRoute.patch("/updateuserdata",editDataByUser)
module.exports = {
    singupRoute
}