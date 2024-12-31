const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function UploadProductController(req,res){
    try{
        const sessionUserId = req.userId // chứa thông tin của người dùng đã đăng nhập và đang thực hiện request.

        if(!uploadProductPermission(sessionUserId)){ // Kiểm tra quyền của người dùng.
            throw new Error("Quyền bị từ chối")
        }
    
        const uploadProduct = new productModel(req.body) // Tạo một đối tượng sản phẩm mới bằng cách sử dụng dữ liệu trong req.body.
        const saveProduct = await uploadProduct.save() // Lưu đối tượng sản phẩm vào cơ sở dữ liệu MongoDB.

        res.status(201).json({
            message : "Tải sản phẩm lên thành công",
            error : false,
            success : true,
            data : saveProduct
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = UploadProductController