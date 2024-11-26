// const addToCartModel = require("../../models/cartProduct")

// const deleteAddToCartProduct = async(req,res)=>{
//     try{
//         const currentUserId = req.userId 
//         const addToCartProductId = req.body._id

//         const deleteProduct = await addToCartModel.deleteOne({ _id : addToCartProductId})

//         res.json({
//             message : "Product Deleted From Cart",
//             error : false,
//             success : true,
//             data : deleteProduct
//         })

//     }catch(err){
//         res.json({
//             message : err?.message || err,
//             error : true,
//             success : false
//         })
//     }
// }

// module.exports = deleteAddToCartProduct

const addToCartModel = require("../../models/cartProduct");

const deleteAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req.body._id;

        // Kiểm tra nếu không có `addToCartProductId`
        if (!addToCartProductId) {
            return res.status(400).json({
                message: "ID sản phẩm là bắt buộc",
                error: true,
                success: false,
            });
        }

        // Kiểm tra xem sản phẩm có thuộc về giỏ hàng của người dùng hiện tại không
        const product = await addToCartModel.findOne({
            _id: addToCartProductId,
            userId: currentUserId,
        });

        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm trong giỏ hàng của bạn",
                error: true,
                success: false,
            });
        }

        // Xóa sản phẩm khỏi giỏ hàng
        const deleteProduct = await addToCartModel.deleteOne({ _id: addToCartProductId });

        return res.status(200).json({
            message: "Sản phẩm đã được xóa khỏi giỏ hàng thành công",
            error: false,
            success: true,
            data: deleteProduct,
        });

    } catch (err) {
        console.error("Error deleting product from cart:", err);
        return res.status(500).json({
            message: err?.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }
};

module.exports = deleteAddToCartProduct;
