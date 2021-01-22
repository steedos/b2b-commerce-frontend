//TODO  convert Product json

export function convertProductType(productJson:any){

    let productObj = {
        site:{
            route:{
                node:{

                }
            }
        }
    } 

    if(productJson.data.node){
        
        const product = productJson.data.node[0]

        product.brand = {
            "entityId": 37
        }

        const imgList = product.related__cc_product_media__c

        for(let i = 0; i < imgList.length; i++){
            imgList[i] = {node:imgList[i]}
        }
         
        product.images = {
            edges: imgList
        }
        delete product.related__cc_product_media__c

        product.variants = {
            "edges": [
               
            ]
        }
        product.productOptions = {
            "edges": [
                {
                    "node": {
                        "__typename": "MultipleChoiceOption",
                        "entityId": 149,
                        "displayName": "Color",
                        "values": {
                            "edges": [
                                {
                                    "node": {
                                        "label": "Navy",
                                        "isDefault": false,
                                        "hexColors": [
                                            "#000080"
                                        ]
                                    }
                                },
                                {
                                    "node": {
                                        "label": "Indigo Blue",
                                        "isDefault": false,
                                        "hexColors": [
                                            "#3964C3"
                                        ]
                                    }
                                },
                                {
                                    "node": {
                                        "label": "Royal",
                                        "isDefault": false,
                                        "hexColors": [
                                            "#4169E1"
                                        ]
                                    }
                                },
                                {
                                    "node": {
                                        "label": "Red",
                                        "isDefault": false,
                                        "hexColors": [
                                            "#FF0000"
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "node": {
                        "__typename": "MultipleChoiceOption",
                        "entityId": 150,
                        "displayName": "Size",
                        "values": {
                            "edges": [
                                {
                                    "node": {
                                        "label": "S"
                                    }
                                },
                                {
                                    "node": {
                                        "label": "M"
                                    }
                                },
                                {
                                    "node": {
                                        "label": "L"
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        }

        product.localeMeta = {
            "edges": [
               
            ]
        }

        productObj.site.route.node = product
    }


    return productObj

}

function convertProductVariantsType(variantsJson:any){
    //TODO 默认显示的完整产品信息
}

function convertProductOptionsType(optionsJson:any){
    //TODO 包括选项的产品类别和规格
}

function convertProductLocaleMetaType(localeMetaJson:any){
    //TODO 本地化
}


export function convertPriceType(objJson:any){

    let priceObj = {
        price :{},
        salePrice:{},
        retailPrice:{}
    }
    if(objJson.data){
        const priceList = objJson.data.node[0].priceList
        console.log(priceList)
        priceObj.price = priceList[0] || null
        priceObj.salePrice = priceList[1] || null
        priceObj.retailPrice = priceList[2] || null
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