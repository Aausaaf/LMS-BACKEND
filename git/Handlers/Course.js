const jwt =  require("jsonwebtoken")
const { Course } = require("../Database/Course")
const { User } = require("../Database/User")


const getCourseData = async(req,res) => {
    let data = await Course.find({category: req.params.category})
   return  res.status(200).send({data: data})
}

const postCourseData = async(req,res) => {
    try{
        let token = req.headers?.authorization?.split(" ")[1]
        const decoded = jwt.verify(token, "uyfrurr67r76r7");
        if(decoded){

            let coursebody = req.body
            let {name,price,description,category,duration} = req.body
            let file = req.files
    
            if(file)
            {
                let Imagedata =  new Buffer(file.image.data).toString('base64')
                let contentType = req.files.image.mimetype
                const imageDataUrl = `data:${contentType};base64,${Imagedata}`
                coursebody.image = imageDataUrl
            }
            let user = await User.findById(decoded._id)
            if(user.userType?.toLowerCase() === 'admin')
            {

                if(name?.length !=0 && price?.length !=0 && description?.length != 0 && category?.length!=0 && duration?.length!=0)
                {
                   let data =  await Course ({
                         name:name.toLowerCase(),
                         price:price,
                         category:category,
                        description:description,
                        duration:duration,
                        image: coursebody.image,
                        video:coursebody.video?coursebody.video:"",
                        syllabus:coursebody.syllabus?JSON.parse(coursebody.syllabus):"",
                        user:coursebody.user?coursebody.user:[],
                        teacher:coursebody.teacher?coursebody.teacher:"",
                        level:coursebody.level?coursebody.level:"",
                        language:coursebody.language?coursebody.language:"",
                        shortDescription:coursebody.shortDescription?coursebody.shortDescription:"",
                        instructor:coursebody.instructor?coursebody.instructor.toLowerCase():"",
                        published:coursebody.published?coursebody.published:false,
                    
                    })
            
                  
                   
            
                    await data.save()
                   let result =  await Course.findOne({name:name})
                    //console.log(result)
            
                    return res.send({
                        message:"Course added successfully"
                    })
                }
                else
                {
                   return  res.status(400).send({
                        message:"Please Filled Required Details"
                    })
                }
            }
            else
            {
                return res.status(400).send({message:"you are not allowed to add course"})
            }
        }
        else
        {
            return res.status(400).send({message:"token is not valid"})
        }
    }
    catch (error){
        console.log(error)
        return res.status(400).send({error})
    }
    }

    const editCourseData = async(req,res) => {
        let coursebody = req.body
        let {courseId} = req.params
        let file = req.files
        // console.log(file)
         let checkCourse = await Course.findOne({_id: courseId})
         if(checkCourse)
          {
            if(coursebody.user)
            {
                      let users = [...checkCourse.user,coursebody.user]
                      coursebody.user = users
            }
            if(file)
          {
            let Imagedata =  new Buffer(file.image.data).toString('base64')
            let contentType = req.files.image.mimetype
            const imageDataUrl = `data:${contentType};base64,${Imagedata}`
             await Course.findOneAndUpdate({_id:courseId},{...coursebody,image:imageDataUrl})
            return res.status(200).send({
             mesasage:"Course Edited Succesfullly"
            })

          }
          else
          {
 
                await Course.findOneAndUpdate({_id:courseId},coursebody)
            return res.status(200).send({
             mesasage:"Course Edited Succesfullly"
            })

          }
          }
          else
          {
            return req.status(400).send({
                message : "Course Not Found"
            })
          }
          

         
    }

    const DeleteCourse = async(req,res) => {
        let {id} = req.params
         let course = await Course.findById({_id:id})
         if(course)
         {
            let editedCourse = await Course.findOneAndDelete({_id:id})
            return res.status(200).send({
             mesasage:"Course deleted Succesfullly",
             data:editedCourse
            })
         }
         else
         {
           return   res.status(400).send({
                 message:"Course is not available"
             })
         }
     }
     


     const getPerticularCourse = async(req,res) => {
        let {id} = req.params
         let course = await Course.findById({_id:id})
         if(course)
         {
            return res.status(200).send({
             data:course
            })
         }
         else
         {
            return  res.status(400).send({
                 message:"Course is not available"
             })
            }
     }





module.exports = {
    getCourseData,
    postCourseData,
    editCourseData,
    DeleteCourse,
    getPerticularCourse
}

//https://codesandbox.io/s/dannguyennhattruongreact-editor-upload-image-local-l6ozy?file=/src/App.js:5043-5127