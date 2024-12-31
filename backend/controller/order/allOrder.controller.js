const orderModel = require("../../models/orderProductModel")
const userModel = require("../../models/userModel")

const allOrderController = async(request, response) => { // Lấy tất cả đơn hàng từ database.
    const userId = request.userId // Lấy userId từ request.

    const user = await userModel.findById(userId) // Tìm user từ database theo userId.

    if(user.role !== 'ADMIN') { // Nếu user không phải là ADMIN thì trả về thông báo lỗi.
        return response.status(500).json({
            message : "không truy cập"
        })
    }

    const AllOrder = await orderModel.find().sort({ createdAt : -1 }) // Lấy tất cả đơn hàng từ database và sắp xếp theo thời gian tạo giảm dần.

    return response.status(200).json({
        data : AllOrder,
        success : true
    })
}

module.exports = allOrderController