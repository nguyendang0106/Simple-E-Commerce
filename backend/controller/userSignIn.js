const bcrypt = require('bcryptjs')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');

async function userSignInController(req,res){
    try{
        const { email , password} = req.body

        if(!email){
            throw new Error("Vui lòng cung cấp email")
        }
        if(!password){
             throw new Error("Vui lòng cung cấp password")
        }

        const user = await userModel.findOne({email})

       if(!user){
            throw new Error("Không tìm thấy người dùng")
       }

       const checkPassword = await bcrypt.compare(password,user.password)

       console.log("checkPassword",checkPassword)

       if(checkPassword){
        const tokenData = {
            _id : user._id,
            email : user.email,
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 }); // sau 8 h max thong bao het han

        const tokenOption = {
            httpOnly : true,
            secure : true
        }

        res.cookie("token",token,tokenOption).status(200).json({
            message : "Đăng nhập thành công",
            data : token,
            success : true,
            error : false
        })

       }else{
         throw new Error("Vui lòng kiểm tra mật khẩu")
       }




    }catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }

}

module.exports = userSignInController