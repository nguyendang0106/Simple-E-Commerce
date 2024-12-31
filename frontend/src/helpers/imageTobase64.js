const imageTobase64 = async(image) =>{
    const reader = new FileReader()
    reader.readAsDataURL(image)

    const data = await new Promise((resolve,reject)=>{
        reader.onload = () => resolve(reader.result)

        reader.onerror = error => reject(error)
    })

    return data

}

export default imageTobase64

// sử dụng để chuyển đổi một hình ảnh (dữ liệu dạng tệp) thành chuỗi Base64
// Base64 là định dạng phổ biến để mã hóa dữ liệu nhị phân thành chuỗi ký tự, 
// được sử dụng trong các tình huống như gửi hình ảnh qua API mà không cần tải lên trước.
// Hàm này nhận một hình ảnh dưới dạng tệp (file) và trả về một chuỗi Base64 của hình ảnh đó.