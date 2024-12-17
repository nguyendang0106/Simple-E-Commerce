const { default: SummaryApi } = require("../common")

const fetchAllProducts = async()=>{
    const categories = ["Mouse", "airpodes","watches","mobiles","televisions","camera","earphones","speakers","refrigerator","trimmers"]
    const dataResponse = []

    for(const category of categories){
        const response = await fetch(SummaryApi.categoryWiseProduct.url,{
            method: SummaryApi.categoryWiseProduct.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category: category
            })
        })

        const categoryData  = await response.json()
        console.log("categorydata", categoryData)

        if(categoryData?.data){
            dataResponse.push(...categoryData.data)
        }
        console.log("done", dataResponse)
    }

    return dataResponse;
}

export default fetchAllProducts