const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');


async function userSignUpController(req,res){
    try{
        const { email, password, name} = req.body

        const user = await userModel.findOne({email})

        console.log("user",user)

        if(user){
            throw new Error("Người dùng đã tồn tại.")
        }
        if(!email){
           throw new Error("Vui lòng cung cấp email")
        }
        if(!password){
            throw new Error("Vui lòng cung cấp password")
        }
        if(!name){
            throw new Error("Vui lòng cung cấp tên")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt); // Băm mật khẩu

        if(!hashPassword){
            throw new Error("Có lỗi xảy ra")
        }

        const payload = {
            ...req.body,
            role : "GENERAL",
            password : hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "Người dùng đã tạo thành công!"
        })


    }catch(err){
        res.json({ // Mọi lỗi trong quá trình xử lý đều được trả về dưới dạng JSON.
            message : err.message || err,
            error : true,
            success : false,
        })
    }
}

module.exports = userSignUpController   