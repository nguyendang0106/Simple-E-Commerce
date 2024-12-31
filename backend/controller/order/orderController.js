const orderModel = require("../../models/orderProductModel")

const orderController = async(request, response)=>{
    try {
        const currentUserId =  request.userId // Lấy userId từ request.

        const orderList = await orderModel.find({userId : currentUserId}).sort({ createdAt : -1 }) // Lấy tất cả đơn hàng từ database và sắp xếp theo thời gian tạo giảm dần.

        response.json({
            data : orderList,
            message : "Order List",
            success : true
        })
    } catch (error) {
        response.status(500).json({
            message : error.message || error,
            error : true
        })
        
    }
}

module.exports = orderController