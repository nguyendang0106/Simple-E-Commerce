const { default: SummaryApi } = require("../common")

const fetchAllProducts = async()=>{
    const categories = ["Mouse", "airpodes","watches","mobiles","televisions","camera","earphones","speakers","refrigerator","trimmers"]
    const dataResponse = [] // mảng sẽ chứa toàn bộ dữ liệu sản phẩm từ tất cả các danh mục.

    for(const category of categories){ // Duyệt qua từng danh mục và gửi yêu cầu API để lấy dữ liệu sản phẩm.
        const response = await fetch(SummaryApi.categoryWiseProduct.url,{ // Gửi yêu cầu đến API để lấy dữ liệu sản phẩm theo danh mục.
            method: SummaryApi.categoryWiseProduct.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category: category
            })
        })

        const categoryData  = await response.json() // Lấy kết quả JSON từ API.
        console.log("categorydata", categoryData)

        if(categoryData?.data){ // Nếu dữ liệu trả về từ API không rỗng thì thêm vào mảng dataResponse.
            dataResponse.push(...categoryData.data)
        }
        console.log("done", dataResponse)
    }

    return dataResponse;
}

export default fetchAllProducts

// lấy tất cả sản phẩm từ một danh sách các danh mục cụ thể bằng cách gửi yêu cầu API nhiều lần, 
// mỗi lần với một danh mục khác nhau