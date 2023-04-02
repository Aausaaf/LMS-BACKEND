const jwt = require('jsonwebtoken');
const { Syllabus } = require('../Database/Syllabus');
const { User } = require('../Database/User');

const getSyllabus = async(req,res)=>{
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
            
                let data = await Syllabus.findOne({course:req.params.id})
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




const postSyllabus = async(req,res)=>{
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
              let checkSyllabus =  await Syllabus.findOne({course:req.params.id})  
              if(checkSyllabus)
              {
                if(req.body.syllabus)
                {
                  let  syllabus = [...checkSyllabus.syllabus,req.body.syllabus]
                
                  await Syllabus.findOneAndUpdate({course:req.params.id},{
                  syllabus
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
                if(req.body.syllabus)
                {
                    let newSyllabus =  await Syllabus(req.body)
                    await newSyllabus.save()
                    
                    return res.status(200).send({
                        message : "success created syllabus",
                        newSyllabus
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
    getSyllabus,
    postSyllabus,
    
}