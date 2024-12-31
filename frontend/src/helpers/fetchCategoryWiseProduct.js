const { default: SummaryApi } = require("../common")

const fetchCategoryWiseProduct = async(category)=>{ // category: Tên danh mục sản phẩm.
    const response = await fetch(SummaryApi.categoryWiseProduct.url,{ // Gửi yêu cầu đến API để lấy dữ liệu sản phẩm theo danh mục.
        method : SummaryApi.categoryWiseProduct.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            category : category
        })
    })

    const dataResponse = await response.json() // Lấy kết quả JSON từ API.

    return dataResponse
}

export default fetchCategoryWiseProduct

// gửi yêu cầu đến API để lấy dữ liệu sản phẩm theo danh mục cụ thể.