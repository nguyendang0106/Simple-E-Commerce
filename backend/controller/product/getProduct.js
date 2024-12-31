const productModel = require("../../models/productModel")

const getProductController = async(req,res)=>{
    try{
        const allProduct = await productModel.find().sort({ createdAt : -1 }) // Lấy tất cả sản phẩm từ cơ sở dữ liệu và sắp xếp theo thời gian tạo giảm dần.

        res.json({
            message : "Tất cả sản phẩm",
            success : true,
            error : false,
            data : allProduct
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }

}

module.exports = getProductController