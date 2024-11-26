// const addToCartModel = require("../../models/cartProduct")

// const countAddToCartProduct = async(req,res)=>{
//     try{
//         const userId = req.userId

//         const count = await addToCartModel.countDocuments({
//             userId : userId
//         })

//         res.json({
//             data : {
//                 count : count
//             },
//             message : "ok",
//             error : false,
//             success : true
//         })
//     }catch(error){
//         res.json({
//             message : error.message || error,
//             error : false,
//             success : false,
//         })
//     }
// }

// module.exports = countAddToCartProduct


const addToCartModel = require("../../models/cartProduct");

const countAddToCartProduct = async (req, res) => {
    try {
        const userId = req.userId;

        // Kiểm tra userId
        if (!userId) {
            return res.status(400).json({
                message: "User ID không xác định",
                error: true,
                success: false,
            });
        }

        // Đếm số lượng sản phẩm trong giỏ hàng
        const count = await addToCartModel.countDocuments({ userId });

        // Trả về phản hồi thành công
        res.status(200).json({
            data: {
                count
            },
            message: "ok",
            error: false,
            success: true
        });
    } catch (error) {
        // Xử lý lỗi và trả về phản hồi
        res.status(500).json({
            message: error.message || "Lỗi máy chủ",
            error: true,
            success: false,
        });
    }
};

module.exports = countAddToCartProduct;
