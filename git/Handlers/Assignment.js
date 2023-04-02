const jwt =  require("jsonwebtoken");
const { Assignment } = require("../Database/Assignment");
const { Course } = require("../Database/Course");
const { User } = require("../Database/User");
const { v4: uuidv4 } = require('uuid');
const getAssignments = async(req,res) => {
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
            if(user?.userType?.toLowerCase() == "admin"|| user?.userType?.toLowerCase() == "teacher")
            {
               let Assignments = await Assignment.find({course:req.params.course})
               return res.status(200).send({assignment:Assignments})
            }
            else
            {
               let Assignments = await Assignment.find({user:decoded._id})
               return res.status(200).send({assignment:Assignments})

            }
        }
        else
        {
            return res.status(404).send({
                message:"user not found"
            })
        }
     }
     else
     {
        return res.status(400).send({
            message:"token is invalid"
        })
     }
  } catch (error) {
    console.log(error)
    return res.status(500).send({
        message:error
    })
  } 
}



const createAssignments = async(req,res) => {
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
              if(user?.userType?.toLowerCase() == "admin" || user?.userType?.toLowerCase() == "teacher")
              {
                let course = await Course.findOne({name: req.body.courseName.toLowerCase()})
                if(course)
                {
                   let data = req.body
                   if(data.startDate.length == 0 || !data.startDate)
                   {
                    return res.status(403).send({ message: "Please provide a start date"})
                   }
                   if(data.endDate.length == 0 || !data.endDate)
                   {
                    return res.status(403).send({ message: "Please provide a end date"})
                   }
                   if(data.content.length == 0 || !data.content)
                   {
                    return res.status(403).send({ message: "Please provide a content"})
                   }
                     let key = uuidv4()
                   course?.user?.map(async (datas)=>{
                     let newAssignment =  await Assignment({
                       course:data.courseName,
                       user:datas,
                       heading:data?.heading?.length>0 ? data.heading :"",
                       content : data.content,
                       startDate:data.startDate,
                       endDate:data.endDate,
                       uniquekey : key

                      })

                      await newAssignment.save()
                   })
                  return res.status(200).send({ message:"Assignment created successfully"})



                   
                }
                else
                {
                    return res.status(404).send({
                        message:"course not found"
                    })
                }
              }
              else
              {
                  
                 return res.status(200).send({message:"you are not allowed to assign this assignment"})
  
              }
          }
          else
          {
              return res.status(404).send({
                  message:"user not found"
              })
          }
       }
       else
       {
          return res.status(400).send({
              message:"token is invalid"
          })
       }
    } catch (error) {
      console.log(error)
      return res.status(500).send({
          message:error
      })
    } 
  }


  const EditAssignments = async(req,res) => {
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
            let file = req.files
            let data = req.body
            if(file?.answer)
            {
                let Imagedata =  new Buffer(file.answer.data).toString('base64')
                let contentType = req.files.answer.mimetype
                const imageDataUrl = `data:${contentType};base64,${Imagedata}`
               data.answer = imageDataUrl
            }
              if(user?.userType?.toLowerCase() == "admin" || user?.userType?.toLowerCase() == "teacher")
              {
                let course = await Course.findOne({name: req.body.courseName.toLowerCase()})
                if(course)
                {
                 

                   course?.user?.map(async (datas)=>{
                     let EditedAssignment =  await Assignment.findOneAndUpdate({uniquekey:req.params.assignmentId},data)

                   })
                   return res.status(200).send({ message:"Assignment Updated successfully"})
                   
                   

                   
                }
                else
                {
                    return res.status(404).send({
                        message:"course not found"
                    })
                }
              }
              else
              {
                let Userdata = {
                    answer: data.answer
                }
                  let check  = await Assignment.findById(req.params.assignmentId)
                  if(check){

                      await Assignment.findOneAndUpdate({_id:req.params.assignPerticularId},Userdata)
                      return res.status(200).send({ message:"Assignment uploaded successfully"})
                  }
                  else
                  {
                    return res.status(400).send({
                        message:"Assignment not found"
                    })
                  }
  
              }
          }
          else
          {
              return res.status(404).send({
                  message:"user not found"
              })
          }
       }
       else
       {
          return res.status(400).send({
              message:"token is invalid"
          })
       }
    } catch (error) {
      console.log(error)
      return res.status(500).send({
          message:error
      })
    } 
  }


  const DeleteAssignments = async(req,res) => {
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
           
              if(user?.userType?.toLowerCase() == "admin" || user?.userType?.toLowerCase() == "teacher")
              {
                let course = await Course.findOne({name: req.body.courseName.toLowerCase()})
                if(course)
                {
                 

                   course?.user?.map(async (datas)=> {
                     let EditedAssignment =  await Assignment.findOneAndDelete({uniquekey:req.params.assignmentId})

                   })
                   return res.status(200).send({ message:"Assignment Deleted successfully"})
                   
                   

                   
                }
                else
                {
                    return res.status(404).send({
                        message:"course not found"
                    })
                }
              }
              else
              {
                return res.status(404).send({
                    message:"you are not allowed to delete this assignment"
                })
  
              }
          }
          else
          {
              return res.status(404).send({
                  message:"user not found"
              })
          }
       }
       else
       {
          return res.status(400).send({
              message:"token is invalid"
          })
       }
    } catch (error) {
      console.log(error)
      return res.status(500).send({
          message:error
      })
    } 
  }



  module.exports = {
    getAssignments,
    createAssignments,
    EditAssignments,
    DeleteAssignments
  }