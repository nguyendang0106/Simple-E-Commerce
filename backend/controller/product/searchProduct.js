// const productModel = require("../../models/productModel")

// const searchProduct = async(req,res)=>{
//     try{
//         const query = req.query.q 

//         const regex = new RegExp(query,'i','g')

//         const product = await productModel.find({
//             "$or" : [
//                 {
//                     productName : regex
//                 },
//                 {
//                     category : regex
//                 }
//             ]
//         })


//         res.json({
//             data  : product ,
//             message : "Search Product list",
//             error : false,
//             success : true
//         })
//     }catch(err){
//         res.json({
//             message : err.message || err,
//             error : true,
//             success : false
//         })
//     }
// }

// module.exports = searchProduct

const productModel = require("../../models/productModel");

const searchProduct = async (req, res) => {
    try {
        // Lấy `query` từ query params và loại bỏ khoảng trắng thừa
        const query = req.query.q?.trim();

        // Nếu `query` rỗng hoặc không tồn tại, trả về danh sách trống
        if (!query) {
            return res.status(200).json({
                data: [],
                totalResults: 0,
                currentPage: 1,
                totalPages: 0,
                message: "No products found",
                error: false,
                success: true,
            });
        }

        const regex = new RegExp(query, 'i'); // Tạo regex tìm kiếm (không phân biệt chữ hoa, thường 'i')

        // Pagination (Phân trang)
        const page = parseInt(req.query.page) || 1; // Số trang hiện tại (mặc định là 1 nếu không được cung cấp).
        const limit = parseInt(req.query.limit) || 10; // Số lượng sản phẩm trên mỗi trang (mặc định là 10 nếu không được cung cấp).
        const skip = (page - 1) * limit; // Số lượng sản phẩm cần bỏ qua để đến trang hiện tại.

        // Tìm kiếm sản phẩm dựa trên tên sản phẩm hoặc danh mục
        const products = await productModel.find({
            "$or": [
                { productName: regex },
                { category: regex }
            ]
        })
        .skip(skip)
        .limit(limit);

        // Đếm tổng số sản phẩm khớp với điều kiện tìm kiếm
        const totalResults = await productModel.countDocuments({
            "$or": [
                { productName: regex },
                { category: regex }
            ]
        });

        return res.status(200).json({
            data: products,
            totalResults,
            currentPage: page,
            totalPages: Math.ceil(totalResults / limit),
            message: "Search Product list",
            error: false,
            success: true,
        });
    } catch (err) {
        console.error("Search Error:", err);
        return res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }
};

module.exports = searchProduct;

