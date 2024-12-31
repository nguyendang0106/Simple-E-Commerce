import { createContext } from "react";

const Context = createContext(null)

export default Context

// Tạo một Context với giá trị mặc định ban đầu là null.
// Giá trị này sẽ được thay thế khi bạn sử dụng Context.Provider trong ứng dụng.
// Context được tạo từ context/index.js chính là "container" để lưu trữ dữ liệu mà các thành phần con sẽ sử dụng.
// Những gì được truyền vào value của Context.Provider không lưu trữ trong Context theo nghĩa vật lý (giống như lưu trữ trong bộ nhớ), mà chỉ được tham chiếu (referenced).
// Context không lưu trữ dữ liệu. Nó chỉ đóng vai trò như một đường dẫn (bridge) để các thành phần con có thể truy cập: