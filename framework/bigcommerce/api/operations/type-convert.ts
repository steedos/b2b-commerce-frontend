//TODO  convert Product json

export function convertObjType(objJson:any){

    let productObj = {
        site:{
            route:{
                node:{

                }
            }
        }
    } 

    productObj.site.route.node = objJson.data

    return productObj

}

export function convertPriceType(objJson:any){

    let priceObj = {
        price :{},
        salePrice:{},
        retailPrice:{}
    }
    if(objJson.data){
        priceObj.price = objJson.data[0]
        priceObj.salePrice = objJson.data[1] || null
        priceObj.retailPrice = objJson.data[2] || null
    }

    return priceObj
}


// "prices": {
//     "price": {
//         "value": 25,
//         "currencyCode": "USD"
//     },
//     "salePrice": null,
//     "retailPrice": null
// }