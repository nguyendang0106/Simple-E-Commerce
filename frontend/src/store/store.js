import { configureStore } from '@reduxjs/toolkit'
import  userReducer  from './userSlice'

export const store = configureStore({
  reducer: {
    user : userReducer // Là reducer được định nghĩa trong file userSlice.js và được sử dụng để quản lý trạng thái liên quan đến người dùng.
  },
})

// Đây là nơi tạo Redux Store để lưu trữ toàn bộ trạng thái của ứng dụng.
// store hoạt động như "trung tâm dữ liệu" của ứng dụng. Tất cả trạng thái được lưu ở đây, và mọi thay đổi trạng thái đều được kiểm soát thông qua Redux.