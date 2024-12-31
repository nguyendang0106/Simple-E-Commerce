const productModel = require("../../models/productModel")

const getProductDetails = async(req,res)=>{
    try{
        const { productId } = req.body // Lấy productId từ req.body

        const product = await productModel.findById(productId) // Tìm sản phẩm theo productId

        res.json({
            data : product,
            message : "Ok",
            success : true,
            error : false
        })

        
    }catch(err){
        res.json({
            message : err?.message  || err,
            error : true,
            success : false
        })
    }
}

module.exports = getProductDetails