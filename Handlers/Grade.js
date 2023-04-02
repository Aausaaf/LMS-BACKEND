const { Grade } = require("../Database/Grade");
const { User } = require("../Database/User");
const jwt = require('jsonwebtoken');
const { Course } = require("../Database/Course");




const getTotalStudentGrade = async(req,res) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        if(!token){
            return res.status(400).send({
                message:"please provide token"
            })
         }
         const decoded = jwt.verify(token, "uyfrurr67r76r7");
         if(decoded)
         {
          let user = await User.findById(decoded._id)
          if(user)
          {
             if(user.userType?.toLowerCase() === "admin" || user?.userType?.toLowerCase() === "teacher")
             {
                 let data = await Course.find({_id:req.params.id},{user:1})
                 return res.status(200).send(data)
             }
             else
             {
                return res.status(400).send({
                    message:"you don't have permission"
                })
             }
          }
          else
          {
            return res.status(400).send({
                message : "authentication failed"
            })
          }

         }
         else
         {
            return res.status(400).send({
                message:"invalid token"
            })
         }  

        
    } catch (error) {
        return res.status(500).send({
            message:error
        })
    }

}
const getGrade = async(req,res)=>{
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        if(!token){
            return res.status(400).send({
                message:"please provide token"
            })
         }
         const decoded = jwt.verify(token, "uyfrurr67r76r7");
         if(decoded)
         {
          let user = await User.findById(decoded._id)
          if(user)
          {
             if(user.userType?.toLowerCase() === "admin" || user?.userType?.toLowerCase() === "teacher")
             {
                 let data = await Grade.find({course:req.params.id,user:req.params.name})
                 return res.status(200).send(data)
             }
             else
             {
                let data = await Grade.find({course:req.params.id,user:user.name})
                return res.status(200).send(data)
             }
          }
          else
          {
            return res.status(400).send({
                message : "authentication failed"
            })
          }

         }
         else
         {
            return res.status(400).send({
                message:"invalid token"
            })
         }  

        
    } catch (error) {
        return res.status(500).send({
            message:error
        })
    }
}



const postGrade = async(req,res)=>{
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        if(!token){
            return res.status(400).send({
                message:"please provide token"
            })
         }
         const decoded = jwt.verify(token, "uyfrurr67r76r7");
         if(decoded)
         {
          let user = await User.findById(decoded._id)
          if(user)
          {
             if(user.userType?.toLowerCase() === "admin" || user?.userType?.toLowerCase() === "teacher")
             {
                 let check = await Grade.find({course:req.params.id,user:req.body.user})
                 if(check.length == 0)
                 {
                    let newGrade =  await Grade({
                       course : req.params.id,
                       user:req.body.user.toLowerCase(),
                       grade : req.body.grade,
                    })
                    await newGrade.save()

                    return res.status(200).send({
                        message : "grade created successfully"
                    })
                 }
                 else
                 {
                    await Grade.findOneAndUpdate({course:req.params.id,user:req.body.user},
                        {
                            grade : [...check[0].grade,...req.body.grade]
                        })
                        return res.status(200).send({
                            message : "grade updated successfully"
                        })
                 }
             }
             else
             {
               return res.status(400).send({
                message:"you are not authorized to post grade"
               })
             }
          }
          else
          {
            return res.status(400).send({
                message : "authentication failed"
            })
          }

         }
         else
         {
            return res.status(400).send({
                message:"invalid token"
            })
         }  

        
    } catch (error) {
        return res.status(500).send({
            message:error
        })
    }
}



const patchGrade = async(req,res)=>{
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        if(!token){
            return res.status(400).send({
                message:"please provide token"
            })
         }
         const decoded = jwt.verify(token, "uyfrurr67r76r7");
         if(decoded)
         {
          let user = await User.findById(decoded._id)
          if(user)
          {
             if(user.userType?.toLowerCase() === "admin" || user?.userType?.toLowerCase() === "teacher")
             {
                 let check = await Grade.find({course:req.params.id,user:req.body.user})
                if(check)
                 {
                    let newgrade = check[0].grade
                    newgrade[req.params.index] = req.body
                    await Grade.findOneAndUpdate({course:req.params.id,user:req.body.user},
                        {
                            grade : newgrade
                        })
                        return res.status(200).send({
                            message : "grade updated successfully"
                        })
                 }
                 else
                 {
                    return res.status(400).send({
                        message : "grade no found"
                    })
                 }
             }
             else
             {
               return res.status(400).send({
                message:"you are not authorized to post grade"
               })
             }
          }
          else
          {
            return res.status(400).send({
                message : "authentication failed"
            })
          }

         }
         else
         {
            return res.status(400).send({
                message:"invalid token"
            })
         }  

        
    } catch (error) {
        return res.status(500).send({
            message:error
        })
    }
}

const deleteGrade = async(req,res)=>{
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        if(!token){
            return res.status(400).send({
                message:"please provide token"
            })
         }
         const decoded = jwt.verify(token, "uyfrurr67r76r7");
         if(decoded)
         {
          let user = await User.findById(decoded._id)
          if(user)
          {
             if(user.userType?.toLowerCase() === "admin" || user?.userType?.toLowerCase() === "teacher")
             {
                 let check = await Grade.findOne({course:req.params.id,user:req.params.user})
                if(check)
                 {
                     let grade = check.grade
                     grade.splice(req.params.index,1)
                    await Grade.findOneAndUpdate({course:req.params.id,user:req.params.user},{grade})
                        return res.status(200).send({
                            message : "grade deleted successfully"
                        })
                 }
                 else
                 {
                    return res.status(400).send({
                        message : "grade no found"
                    })
                 }
             }
             else
             {
               return res.status(400).send({
                message:"you are not authorized to post grade"
               })
             }
          }
          else
          {
            return res.status(400).send({
                message : "authentication failed"
            })
          }

         }
         else
         {
            return res.status(400).send({
                message:"invalid token"
            })
         }  

        
    } catch (error) {
        return res.status(500).send({
            message:error
        })
    }
}




module.exports = {
    getTotalStudentGrade,
    getGrade,
    postGrade,
    patchGrade,
    deleteGrade
}