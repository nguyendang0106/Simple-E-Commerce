import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    user : null
}
  
  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUserDetails : (state,action)=>{
        state.user = action.payload
      }
    },
  })
  
  // Các trình tạo hành động được tạo ra cho mỗi hàm giảm trường hợp
  export const { setUserDetails } = userSlice.actions

  
  export default userSlice.reducer    

  // Đây là nơi định nghĩa một phần trạng thái liên quan đến người dùng (user) và các hành động (actions) để thay đổi trạng thái đó.