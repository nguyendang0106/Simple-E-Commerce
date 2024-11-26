// const addToCartModel = require("../../models/cartProduct")

// const addToCartViewProduct = async(req,res)=>{
//     try{
//         const currentUser = req.userId

//         const allProduct = await addToCartModel.find({
//             userId : currentUser
//         }).populate("productId")

//         res.json({
//             data : allProduct,
//             success : true,
//             error : false
//         })

//     }catch(err){
//         res.json({
//             message : err.message || err,
//             error : true,
//             success : false
//         })
//     }
// }

// module.exports =  addToCartViewProduct

const addToCartModel = require("../../models/cartProduct");

const addToCartViewProduct = async (req, res) => {
    try {
        const currentUser = req.userId;

        // Kiểm tra nếu `userId` không tồn tại
        if (!currentUser) {
            return res.status(401).json({
                message: "Không được phép: ID người dùng bị thiếu.",
                success: false,
                error: true
            });
        }

        // Lấy tất cả sản phẩm trong giỏ hàng của người dùng và sử dụng `populate` với `select`
        const allProduct = await addToCartModel.find({ userId: currentUser })
            .populate("productId", "productName sellingPrice productImage category") // chỉ lấy các trường cần thiết
            .exec();

        // Kiểm tra nếu không có sản phẩm nào
        if (!allProduct || allProduct.length === 0) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm nào trong giỏ hàng.",
                data: [],
                success: true,
                error: false
            });
        }

        // Trả về danh sách sản phẩm
        res.status(200).json({
            data: allProduct,
            success: true,
            error: false
        });

    } catch (err) {
        console.error("Error fetching cart products:", err);
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
};

module.exports = addToCartViewProduct;
