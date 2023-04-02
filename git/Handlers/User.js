const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
var validator = require("email-validator");
const otpGenerator = require('otp-generator');
const { User } = require('../Database/User');
const { Verification } = require('../Database/Verification');




const getSignupData = async(req,res) => {
    try {

        const token = req.headers?.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, "uyfrurr67r76r7");
        if(decoded)
        {
            const user = await User.findById(decoded._id);
              if(user)
        {  
             if(user.userType == "admin")
            {
                let data = await User.find()
                return res.status(200).send(data);
            }
            else
            {
            
                return res.status(200).send({data:user});
            }

        }
        else{
            res.status(400).send({
                message:"user does not have account"
            })
        }
    }
        else
        {
            return res.status(401).send("Jwt has expire please login again")
        }
       
      

    } catch (err) {

        return res.status(500).send(err);

    }
}


const getNumberOfUser = async(req,res) => {
    try {

        const token = req.headers?.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, "uyfrurr67r76r7");
        if(decoded)
        {
            const user = await User.findById(decoded._id);
              if(user)
        {  
             if(user.userType == "admin")
            {
                let users = await User.find()
                return res.status(200).send({data:users.length});
            }
            else
            {
                return res.status(400).send({
                    message: "You are not an admin"
                });
            }

        }
        else{
            res.status(400).send({
                message:"user does not have account"
            })
        }
    }
        else
        {
            return res.status(401).send("Jwt has expire please login again")
        }
       
      

    } catch (err) {

        return res.status(500).send(err);

    }
}


const getUserDelete = async(req,res) => {
    let {email} = req.params
    if(email)
    {
        try {

            const token = req.headers?.authorization?.split(" ")[1];
            const decoded = jwt.verify(token, "uyfrurr67r76r7");
            if(decoded)
            {
                const user = await User.findById(decoded._id);
                  if(user)
            {  
                 if(user.userType == "admin")
                {
                    let data = await User.findOneAndDelete({email:email})
                    if(data)
                    {
                        res.status(200).send({
                            message:"User deleted Successfull"
                        })
                    }
                    else
                    {
                        res.status(400).send({
                            message:"User does not have account"
                        })
                    }
                }
                else
                {
                    return res.status(400).send({
                        message: "You are not an admin"
                    });
                }
    
            }
            else{
                res.status(400).send({
                    message:"user does not have account"
                })
            }
        }
            else
            {
                return res.status(401).send("Jwt has expire please login again")
            }
           
          
    
        } catch (err) {
    
            return res.status(500).send(err);
    
        }
      
        
    }
    else
    {
        res.status(500).send({
            message:"please Provide Email"
        })
    }

}


const editDataByUser = async(req,res) => {
   
    try {

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "uyfrurr67r76r7");
        if(decoded)
        {
            const user = await User.findById(decoded._id);
            if(user)
            {
               
                let data = req.body
                for(let key in data)
                {
                  data[key] = JSON.parse(data[key])
                }
                console.log(data)

                let file= req.files
                if(file){
                let Imagedata =  new Buffer(file.image.data).toString('base64')
                let contentType = req.files.image.mimetype
                const imageDataUrl = `data:${contentType};base64,${Imagedata}`
                data.image = imageDataUrl
                }
                if(data.email)
                {
                    delete data.email
                } 
                if(data.userType)
                {
                    delete data.userType
                }
               if(data.gender)
               {
                if(data?.gender?.toLowerCase() != 'male' && data?.gender?.toLowerCase() != "female" && data?.gender?.toLowerCase() != "other")
                {
                   return res.status(400).send({
                    message:"please select write gender"
                   })
                }
               }
                await User.findOneAndUpdate({_id: user._id},data)
                let users = await User.findById(decoded._id);
                return res.status(200).send({message : "Updated successfully",users});
            }
            res.status(400).send({
                message:"user does not have account"
            })
        }
        else
        {
            return res.status(401).send("Jwt has expire please login again")
        }
       
      

    } catch (err) {

        return res.status(500).send(err);

    }


}


const createUser = async(req,res) => {
    try {
        const user = req.body
      if(user.email?.length == 0 || !user.email )
      {
        return  res.status(400).send({message:"Please provide Email"})
      }
      if(user.password?.length == 0 || !user.password )
      {
        return  res.status(400).send({message:"Please provide Password"})
      }
      if(user.password?.length < 8)
      {
        return  res.status(400).send({message:"Please provide atleast 8 length Password"})
      }
    
    if(user.userType?.length == 0 || !user.userType)
    {
        return  res.status(400).send({message:"Please provide User Type"})
    }
    let file= req.files
     if(file){
     let Imagedata =  new Buffer(file.image.data).toString('base64')
     let contentType = req.files.image.mimetype
      const imageDataUrl = `data:${contentType};base64,${Imagedata}`
        data.image = imageDataUrl
                }

     const checkUser = await User.findOne({email:user.email},{email:user.email})
     if(checkUser)
     {
        return res.status(400).send({message:'User already exists'})
     }

    let isEmail = validator.validate(user.email);
      
     if(isEmail)
     {
        
       let newUser = await User(user)
       await newUser.save()
       res.status(200).send({message : "User Created successfully",
    userData : newUser})
      
     }
     else
     {
        return res.status(404).send({message:"Email is not valid"})
     }
        
    } catch (error) {
      console.log(error)  
      return res.status(500).send({message:error})
    }

} 


function sendEmail(UserOtp,email) {

    return new Promise((resolve,reject)=>{
        var transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{

                user:"aausafalam585@gmail.com",
                pass:"kspaguxtungitnfz"

            }
        }) 
       
        const mail_configs  = {
            from:'aausafalam585@gmail.com',
            to:email,
            subject:'Testing codeinf 101 Email:',
            text: `Your OTP is ${UserOtp}`
        }
        transporter.sendMail(mail_configs,function(error,info){
            if(error)
            {
                return reject({message:"An error has occured"})
            }
            return resolve({message:"Email send successfully"})

        })
    })

   
  }


const getLoginUser = async(req, res) => {

    try {

        const {email, password} = req.body;

        const user = await User.findOne({email: email}).populate('password');


        if (!user) {

            return res.status(400).send({message: 'User does not have account please signup'});

        }
        bcrypt.compare(password,user.password,(err,reses)=>{

            
           if(reses)
           {

            const token = jwt.sign({_id: user._id}, "uyfrurr67r76r7", {expiresIn: '24h'});

            // const newUser = user.toJSON();
            // delete newUser.password;

            return res.status(200).send({token:token,user});

           }
           else
           {

            return res.status(400).send({message: 'Incorrect Password'})

           }
        })
      
        
    } catch (err) {

        return res.status(500).send({message:err});

    }
}


const isLoggedIn = async(req, res) => {

    try {

        const token = req.headers?.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, "uyfrurr67r76r7");
        if(decoded)
        {
            const user = await User.findById(decoded._id);
              
            if(user)
            {
                return res.status(200).send({data:user});
            }
            res.status(400).send({
                message:"user does not have account"
            })
        }
        else
        {
            return res.status(401).send("Jwt has expire please login again")
        }
       
      

    } catch (err) {

        return res.status(500).send(err);

    }
}


const forgotPassword = async (req,res) => {
   const {email} = req.body

   if(email)
   {
     const user = await User.findOne({email:email})
     if(user)
    { let UserOtp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets:false})
     sendEmail(UserOtp,user.email)
     .then(response => {
         // console.log(response.message) 
       
         async function otpStore()
        {
         let checkUser = await Verification.findOne({email:user.email})
        if(checkUser)
        {
           let OtpData= await Verification.findOneAndUpdate({email:user.email},
             {
                 otp:UserOtp,
                 email:user.email
             })
        }
        else
     {
         let OtpData =  await Verification({
             email:user.email,
             otp:UserOtp,
           
         })
         OtpData.save()
        
     }
         
         return  res.send({message:"OTP Send Successfull",
         email:email
     })
        }
        otpStore()
     })
     .catch((error)=>{
         
         console.log(error)
       return   res.status(500).send(error.message)
     })
  }

  else
  {  return  res.status(400).send({
   message :  "User does not have account please signup"
   } )
    }
   }
   else 
    {
 return res.status(500).send({
 message : "Please Provide Email Id"
  } )
 }
}


const getVerifyForgetpasswordOtp = async(req,res) => {
   
    let {email,otp} = req.body
     let Findsemail =  await Verification.findOne({email:email})
    if(Findsemail)
    {
        if(Findsemail.otp == otp)
        {
        //      let newUser = await User({
        //         email:Findsemail.email,
        //         password:Findsemail.password,
        //         username:Findsemail.username
        //      })
        // await newUser.save()
        // newUser = newUser.toJSON()
        // delete newUser.password;

        // const token = jwt.sign({_id: newUser._id}, "uyfrurr67r76r7", {expiresIn: '24h'});


            res.status(200).send({
                message:"OTP Verified",
                otp:otp,
                email:email
                
            })
        }
        else
        {
            //  await Verfication.findOneAndDelete({email:email})

            res.status(400).send({
                message:"otp Wrong"
            })
        }
    }
    else 
    {
        res.status(500).send({
            message:"please sign up first"
        })
    }
  
 
}


const ChangePassword = async(req,res) => {

    let {email,otp,password} = req.body
     let Findsemail =  await Verification.findOne({email:email})
    if(Findsemail)
    {
        if(Findsemail.otp == otp)
        {
             let oldUser = await User.findOneAndUpdate({
                email:Findsemail.email
             },
             {
                email:Findsemail.email,
                password:await bcrypt.hash(password,12)
             })
        
        oldUser = oldUser.toJSON()
        // delete oldUser.password;

        const token = jwt.sign({_id: oldUser._id}, "uyfrurr67r76r7", {expiresIn: '24h'});

         
            res.status(200).send({
                message1:"OTP Verified",
                token:token,
                user:oldUser
                
            })
        }
        else
        {
            //  await Verfication.findOneAndDelete({email:email})

            res.status(400).send({
                message:"otp Wrong"
            })
        }
    }
    else 
    {
        res.status(500).send({
            message:"please sign up first"
        })
    }
  
}


const changePasswordWithProfilepage = async(req,res) => {
     let data = req.body
     const token = req.headers?.authorization?.split(" ")[1]; 
     const decoded = jwt.verify(token, "uyfrurr67r76r7");
         console.log(decoded)
        if(decoded)
        {
            const user = await User.findById(decoded._id);
              console.log(user)
            if(user)
            {
              bcrypt.compare(data.oldPassword,user.password,async(err,reses)=>{
                if(reses)
                {
                    let updateUser= await User.findOneAndUpdate({
                       _id:decoded._id,
                     },
                     {
                   
                        password:await bcrypt.hash(data.newPassword,12),
                        
                     })
                     updateUser =  await User.findById(decoded._id);
                    return res.status(200).send({message:"Password Changed",updateUser});
                }
                else
                {
                   return  res.status(400).send({
                        message:"please check current password"
                    })
                }
            })
            }
            else {
           return  res.status(400).send({
                message:"user does not have account"
            })
        }
        }
        else
        {
            return res.status(401).send("Jwt has expire please login again")
        }
}


const editUserDetailsByAdmin = async (req,res) => {
    try {

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "uyfrurr67r76r7");
        if(decoded)
        {
            const user = await User.findById(decoded._id);
              console.log(user)
            if(user)
            {
               if(user.userType == "admin")
               {
                let {userId} = req.params
                let employee = await User.findById({_id: userId})
                const data = req.body
                let file= req.files
                if(file){
                let Imagedata =  new Buffer(file.image.data).toString('base64')
                let contentType = req.files.image.mimetype
                const imageDataUrl = `data:${contentType};base64,${Imagedata}`
                data.image = imageDataUrl
                }
                if(employee)
                {
                    await User.findOneAndUpdate({_id: userId},data)
                    let users = await User.findById(userId);
                    return res.status(200).send({message : "Updated successfully",users});
                }
                else
                {
                    return res.status(400).send({message : "employee does not have account please create employee account"})
                }
               }
               else
               {
                return  res.status(400).send({
                    message:"you are not an admin"
                })
               }
               
            }
            else{
            return res.status(400).send({
                message:"user does not have account"
            })
        }
        }
        else
        {
            return res.status(401).send("Jwt has expire please login again")
        }
       
      

    } catch (err) {

        return res.status(500).send(err);

    }

}







module.exports = {
    getSignupData,
    createUser,
    getLoginUser,
    isLoggedIn,
    getUserDelete,
    forgotPassword,
    getVerifyForgetpasswordOtp,
    ChangePassword,
    changePasswordWithProfilepage,
    getNumberOfUser,
    editUserDetailsByAdmin,
    editDataByUser
}