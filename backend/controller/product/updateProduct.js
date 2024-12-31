const uploadProductPermission = require('../../helpers/permission')
const productModel = require('../../models/productModel')

async function updateProductController(req,res){
    try{

        if(!uploadProductPermission(req.userId)){ // Kiểm tra quyền của người dùng.
            throw new Error("Quyền bị từ chối")
        }

        const { _id, ...resBody} = req.body // Lấy _id từ req.body và lưu lại các trường còn lại vào resBody

        const updateProduct = await productModel.findByIdAndUpdate(_id,resBody) // Tìm sản phẩm theo _id và cập nhật thông tin mới.
        
        res.json({
            message : "Cập nhật sản phẩm thành công",
            data : updateProduct,
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


module.exports = updateProductController