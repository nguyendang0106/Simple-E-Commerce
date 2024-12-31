const productModel = require("../../models/productModel")

const getCategoryWiseProduct = async(req,res)=>{
    try{
        const { category } = req?.body || req?.query // Lấy giá trị category từ phần thân yêu cầu (req.body) hoặc tham số truy vấn (req.query).
        const product = await productModel.find({ category }) // Tìm tất cả các sản phẩm có trường category khớp với giá trị được cung cấp.

        res.json({
            data : product,
            message : "Sản phẩm",
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

module.exports = getCategoryWiseProduct