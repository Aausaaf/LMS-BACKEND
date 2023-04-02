const jwt =  require("jsonwebtoken");
const { Course } = require("../Database/Course");
const { User } = require("../Database/User");
const { v4: uuidv4 } = require('uuid');
const { Quiz } = require("../Database/Quiz");



const getQuiz = async(req,res) => {
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
               let quiz = await Quiz.find({course:req.params.course})
               return res.status(200).send(quiz)
            }
            else
            {
               let quiz = await Quiz.find({user:decoded._id})
               return res.status(200).send(quiz)

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



const createQuiz = async(req,res) => {
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
                let course = await Course.findOne({_id: req.body.course})
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
                //    if(data.content.length == 0 || !data.content)
                //    {
                //     return res.status(403).send({ message: "Please provide a content"})
                //    }
                     let key = uuidv4()
                     console.log(data)
                   course?.user?.map(async (datas)=>{
                     let newQuiz =  await Quiz({
                       course:data.course,
                       user:datas,
                       title:data?.title,
                       content : data.content,
                       startDate:data.startDate,
                       endDate:data.endDate,
                       uniquekey : key,
                       points: data.points

                      })

                      await newQuiz.save()
                   })
                  return res.status(200).send({ message:"Quiz created successfully"})



                   
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


  const EditQuiz = async(req,res) => {
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
            let data = req.body
            
              if(user?.userType?.toLowerCase() == "admin" || user?.userType?.toLowerCase() == "teacher")
              {
                let course = await Course.findOne({name: req.body.courseName})
                if(course)
                {
                 

                   course?.user?.map(async (datas)=>{
                    await Quiz.findOneAndUpdate({uniquekey:req.params.quizId},data)

                   })
                   return res.status(200).send({ message:"Quiz Updated successfully"})
                   
                   

                   
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
                if(data?.content?.getPoints)
                {
                   data.content={...data?.content,getPoints:""}
                }
                let Userdata = {
                    content: data.content
                }
                
                  let check  = await Quiz.findById(req.params.quizId)
                  if(check){

                      await Quiz.findOneAndUpdate({_id:req.params.quizPerticularId},Userdata)
                      return res.status(200).send({ message:"quiz uploaded successfully"})
                  }
                  else
                  {
                    return res.status(400).send({
                        message:"Quiz not found"
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


  const DeleteQuiz = async(req,res) => {
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
                       await Quiz.findOneAndDelete({uniquekey:req.params.quizId})

                   })
                   return res.status(200).send({ message:"Quiz Deleted successfully"})
                   
                   

                   
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
    getQuiz,
    createQuiz,
    EditQuiz,
    DeleteQuiz
  }