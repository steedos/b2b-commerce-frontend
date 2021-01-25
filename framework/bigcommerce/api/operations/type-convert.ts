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
        const specList = product.related__cc_product_spec__c  

        let images = convertProductImagesType(imgList)
        product.images = images

        // let productOptions = convertProductOptionsType(specList)
        // product.productOptions = productOptions
        
   
        delete product.related__cc_product_media__c
        delete product.related__cc_product_spec__c

        product.variants = {
            "edges": [
               
            ]
        }
        product.productOptions = {
            "edges": [
                {
                    "node": {
                        "__typename": "MultipleChoiceOption",
                        //"entityId": 128,
                        "displayName": "size",
                        "values": {
                            "edges": [
                                {
                                    "node": {
                                        "label": "XS",
                                    }
                                },
                                {
                                    "node": {
                                        "label": "S",
                                    }
                                },
                                {
                                    "node": {
                                        "label": "XXX",
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "node": {
                        "__typename": "MultipleChoiceOption",
                        //"entityId": 127,
                        "displayName": "Color",
                        "values": {
                            "edges": [
                                {
                                    "node": {
                                        "label": "优惠券",
                                    }
                                },
                                {
                                    "node": {
                                        "label": "一般",
                                    }
                                },
                                {
                                    "node": {
                                        "label": "测试",
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

function convertProductImagesType(imgList:any){
    //TODO 包括产品的图片
    for(let i = 0; i < imgList.length; i++){
        imgList[i] = {node:imgList[i]}
    }
    return {edges:imgList}
}

function convertProductVariantsType(variantsJson:any){
    //TODO 默认显示的完整产品信息
}

function convertProductOptionsType(optionsList:any){
    //TODO 包括选项的产品类别和规格

    for(let i = 0; i < optionsList.length; i++){
        
        let options = optionsList[i].spec__c
        for(let j = 0; j < options.length; j++){
            options[j] = {node:options[j]}
        }
        optionsList[i].values = {edges:options}
        delete optionsList[i].spec__c
        optionsList[i] = {node:optionsList[i]}
    }
    return {edges:optionsList}
}

function convertProductLocaleMetaType(localeMetaJson:any){
    //TODO 本地化
}

//TODO 传入价格所属产品信息
export function convertPriceType(objJson:any){

    let priceObj = {
        price :{},
        salePrice:{},
        retailPrice:{}
    }
    if(objJson.data){
        const priceList = objJson.data.node[0].priceList
        //console.log(priceList)
        priceObj.price = priceList[0] || null
        priceObj.salePrice = priceList[1] || null
        priceObj.retailPrice = priceList[2] || null
    }

    return priceObj
}

