const productModel = require("../../models/productModel")


const getCategoryProduct = async(req,res)=>{
    try{
        const productCategory = await productModel.distinct("category") // Lấy danh sách các danh mục (category) duy nhất từ collection productModel.

        console.log("category",productCategory)

        //Dùng để lưu trữ một sản phẩm đại diện cho mỗi danh mục.
        const productByCategory = []

        for(const category of productCategory){ // Duyệt qua từng danh mục trong mảng productCategory.
            const product = await productModel.findOne({category }) // Tìm một sản phẩm đầu tiên thuộc danh mục đó (theo thứ tự lưu trong MongoDB).

            if(product){
                productByCategory.push(product) // Nếu tìm thấy sản phẩm, thêm nó vào mảng productByCategory.
            }
        }


        res.json({
            message : "Danh mục sản phẩm",
            data : productByCategory, // Mảng chứa danh sách sản phẩm đại diện cho từng danh mục.
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

module.exports = getCategoryProduct