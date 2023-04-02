const { Lecture } = require("../Database/lecture");
const { User } = require("../Database/User");
const jwt = require("jsonwebtoken")
const getLecture = async(req,res) => {
    try {
        let token = req?.headers?.authorization?.split(" ")[1]
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
            let data = await Lecture.find({course: req.params.course})
            console.log(data)
            return res.status(200).send(data)
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
       return res.status(500).send(error)
    }
}


const postLecture = async(req,res) => {
    try {
        let token = req?.headers?.authorization?.split(" ")[1]
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
            for (let key in data) {
                try {
                    data[key] = JSON.parse(data[key])
                //   console.log(`${data[key]} is in JSON format.`);
                } catch (e) {
                //   console.log(`${data[key]} is not in JSON format.`);
                }
              }
            if(user.userType === "admin" || user.userType === "teacher")
            {
               console.log("file")
               if(data?.title?.length == 0 || !data.title)
               {
                return res.status(403).send({message:"please provide a title"})
               }
               let file= req.files
               if(file){
               let Videodata =  new Buffer(file.video.data).toString('base64')
               let contentType = req.files.video.mimetype
               const videoDataUrl = `data:${contentType};base64,${Videodata}`
               data.videoLink = videoDataUrl
               }
               let newLecture = await Lecture(data)
               await newLecture.save()
               return res.status(200).send({message : "lecture created successfully",newLecture})
            }
            else
            {
                return res.status(400).send({
                    message: "you do not have permission to add lecture"
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
       return res.status(500).send(error)
    }
}


const patchLecture = async(req,res) => {
    try {
        let token = req?.headers?.authorization?.split(" ")[1]
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
            if(user.userType === "admin" || user.userType === "teacher")
            {
               let data = req.body
               if(data?.title?.length == 0)
               {
                return res.status(403).send({message:"please provide a title"})
               }
               await Lecture.findOneAndUpdate({_id: req.params.id},data)
               return res.status(200).send({message : "lecture updated successfully"})
            }
            else
            {
                return res.status(400).send({
                    message: "you do not have permission to change lecture"
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
       return res.status(500).send(error)
    }
}


const deleteLecture = async(req,res) => {
    try {
        let token = req?.headers?.authorization?.split(" ")[1]
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
            if(user.userType === "admin" || user.userType === "teacher")
            {
              
               await Lecture.findOneAndDelete({_id: req.params.id})
               return res.status(200).send({message : "lecture deleted successfully"})
            }
            else
            {
                return res.status(400).send({
                    message: "you do not have permission to change lecture"
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
       return res.status(500).send(error)
    }
}



module.exports = {
    getLecture,
    postLecture,
    patchLecture,
    deleteLecture
}
