const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')



const app = express()
app.use(cors({ // Dùng middleware cors để cấu hình quyền truy cập từ frontend
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
app.use(express.json()) // Middleware này giúp Express có thể hiểu và phân tích các dữ liệu có định dạng JSON trong yêu cầu HTTP (ví dụ khi người dùng gửi dữ liệu từ form).
app.use(cookieParser()) // Middleware giúp phân tích các cookie trong yêu cầu HTTP và làm cho chúng dễ dàng truy cập thông qua req.cookies.


app.use("/api",router) // gắn các route API vào ứng dụng Express. Tất cả các yêu cầu gửi đến /api sẽ được chuyển đến router đã được định nghĩa trong file ./routes


const PORT = 8080 || process.env.PORT


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running "+PORT)
    })
})