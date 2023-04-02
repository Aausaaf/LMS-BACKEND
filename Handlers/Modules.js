const jwt = require('jsonwebtoken');
const { Modules } = require('../Database/Modules');
const { Syllabus } = require('../Database/Syllabus');
const { User } = require('../Database/User');

const getModules = async(req,res)=>{
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
            
                let data = await Modules.findOne({course:req.params.id})
                return res.status(200).send(data)
             
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




const postModules = async(req,res)=>{
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
              let checkModules =  await Modules.findOne({course:req.params.id})  
              if(checkModules)
              {
                if(req.body.modules)
                {
                  let  modules = [...checkModules.modules,req.body.modules]
                
                  await Modules.findOneAndUpdate({course:req.params.id},{
                    modules
                 })
                  
                  return res.status(200).send({
                      message : "success updated syllabus",
                  })
              }
              else
              {
                  return res.status(400).send({ 
                      message : "please provide syllabus content"
                  })
              }
              }
              else
              {
                if(req.body.modules)
                {
                    let newModules =  await Syllabus(req.body)
                    await newModules.save()
                    
                    return res.status(200).send({
                        message : "success created modules",
                        newModules
                    })
              }
              else
              {
                  return res.status(400).send({ 
                      message : "please provide syllabus content"
                  })
              }
              }
             
            }
            else
            {
                return res.status(400).send({ message : "you are not an admin or techer"})
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
    getModules,
    postModules,
    
}