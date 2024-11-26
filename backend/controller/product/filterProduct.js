// const productModel = require("../../models/productModel")

// const filterProductController = async(req,res)=>{
//  try{
//         const categoryList = req?.body?.category || []

//         const product = await productModel.find({
//             category :  {
//                 "$in" : categoryList
//             }
//         })

//         res.json({
//             data : product,
//             message : "product",
//             error : false,
//             success : true
//         })
//  }catch(err){
//     res.json({
//         message : err.message || err,
//         error : true,
//         success : false
//     })
//  }
// }


// module.exports = filterProductController

const productModel = require("../../models/productModel");

const filterProductController = async (req, res) => {
    try {
        const categoryList = req?.body?.category || [];

        // Kiểm tra nếu `categoryList` rỗng
        if (!Array.isArray(categoryList) || categoryList.length === 0) {
            return res.status(400).json({
                message: "Danh sách danh mục trống. Vui lòng chọn ít nhất một danh mục.",
                error: true,
                success: false,
                data: []
            });
        }

        // Tìm kiếm sản phẩm dựa trên danh mục
        const products = await productModel.find({
            category: { "$in": categoryList }
        });

        // Kiểm tra nếu không tìm thấy sản phẩm nào
        if (products.length === 0) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm nào phù hợp với danh mục đã chọn.",
                error: false,
                success: true,
                data: []
            });
        }

        // Trả về danh sách sản phẩm tìm được
        return res.status(200).json({
            data: products,
            message: "Danh sách sản phẩm theo danh mục",
            error: false,
            success: true
        });
    } catch (err) {
        console.error("Lỗi lọc sản phẩm:", err);
        return res.status(500).json({
            message: err.message || "Lỗi hệ thống",
            error: true,
            success: false
        });
    }
};

module.exports = filterProductController;
