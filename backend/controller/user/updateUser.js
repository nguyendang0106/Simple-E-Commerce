const userModel = require("../../models/userModel")

async function updateUser(req,res){
    try{
        // là ID của người dùng hiện tại, có thể lấy từ thông tin xác thực (JWT token) khi người dùng đã đăng nhập.
        const sessionUser = req.userId

        // Lấy thông tin cần cập nhật từ req.body.
        const { userId , email, name, role} = req.body

        const payload = { // payload là đối tượng chứa thông tin người dùng cần cập nhật.
            ...( email && { email : email}),
            ...( name && { name : name}),
            ...( role && { role : role}),
        }

        const user = await userModel.findById(sessionUser)

        console.log("user.role",user.role)


        // Cập nhật người dùng có userId trong cơ sở dữ liệu với payload đã chuẩn bị trước đó (dữ liệu cần cập nhật).
        const updateUser = await userModel.findByIdAndUpdate(userId,payload)

        
        res.json({
            data : updateUser,
            message : "Đã cập nhật người dùng",
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}


module.exports = updateUser