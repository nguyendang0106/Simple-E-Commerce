// const addToCartModel = require("../../models/cartProduct")

// const updateAddToCartProduct = async(req,res)=>{
//     try{
//         const currentUserId = req.userId 
//         const addToCartProductId = req?.body?._id

//         const qty = req.body.quantity

//         const updateProduct = await addToCartModel.updateOne({_id : addToCartProductId},{
//             ...(qty && {quantity : qty})
//         })

//         res.json({
//             message : "Product Updated",
//             data : updateProduct,
//             error : false,
//             success : true
//         })

//     }catch(err){
//         res.json({
//             message : err?.message || err,
//             error : true,
//             success : false
//         })
//     }
// }

// module.exports = updateAddToCartProduct

const addToCartModel = require("../../models/cartProduct");

const updateAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req.body?._id;
        const qty = req.body?.quantity;

        // Kiểm tra nếu `currentUserId` không tồn tại
        if (!currentUserId) {
            return res.status(401).json({
                message: "Không được phép: ID người dùng bị thiếu.",
                success: false,
                error: true,
            });
        }

        // Kiểm tra nếu `addToCartProductId` hoặc `qty` không hợp lệ
        if (!addToCartProductId || !qty || qty < 1) {
            return res.status(400).json({
                message: "ID hoặc số lượng sản phẩm không hợp lệ.",
                success: false,
                error: true,
            });
        }

        // Kiểm tra sản phẩm có thuộc về người dùng hiện tại hay không
        const productInCart = await addToCartModel.findOne({
            _id: addToCartProductId,
            userId: currentUserId,
        });

        if (!productInCart) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm trong giỏ hàng của bạn.",
                success: false,
                error: true,
            });
        }

        // Cập nhật số lượng sản phẩm
        const updatedProduct = await addToCartModel.findByIdAndUpdate(
            addToCartProductId,
            { quantity: qty },
            { new: true }
        );

        res.status(200).json({
            message: "Số lượng sản phẩm được cập nhật thành công.",
            data: updatedProduct,
            success: true,
            error: false,
        });
    } catch (err) {
        console.error("Error updating cart product:", err);
        res.status(500).json({
            message: err?.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }
};

module.exports = updateAddToCartProduct;
