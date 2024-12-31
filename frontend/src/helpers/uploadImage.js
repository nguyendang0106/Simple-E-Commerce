const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`

const uploadImage  = async(image) => {
    const formData = new FormData() // Là một đối tượng đặc biệt dùng để gửi dữ liệu dạng form trong HTTP request.
    formData.append("file",image) // Thêm file hình ảnh (image) vào form với key là "file". yêu cầu bắt buộc của Cloudinary.
    formData.append("upload_preset","mern_product") // Thêm thông tin upload_preset.
    

    const dataResponse = await fetch(url,{ // Gửi yêu cầu POST đến Cloudinary để tải hình ảnh lên.
        method : "post",
        body : formData
    })

    return dataResponse.json() // Trả về dữ liệu JSON từ Cloudinary ( có URL của hình ảnh)

}

export default uploadImage 

// tải hình ảnh lên Cloudinary