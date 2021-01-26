//TODO  convert Product json

function convertProduct(productJson:any){
    let product = productJson
    product.brand = {
        "entityId": 37
    }
    product.path = '/' + product._id +'/'
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
    product.prices = {
        "price": {
            "value": 20,
            "currencyCode": "USD"
        },
        "salePrice": null,
        "retailPrice": null
    }
    return product
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


export function convertProductType(dataJson:any){

    let productObj = {
        site:{
            route:{
                node:{

                }
            }
        }
    } 

    if(dataJson.data.node){
        
        const productJson = dataJson.data.node[0]

        const product = convertProduct(productJson)

        productObj.site.route.node = product
    }
    return productObj
}

//TODO 传入价格所属产品信息
export function convertPriceType(objJson:any){

    let priceObj = {
        price :{},
        salePrice:{},
        retailPrice:{}
    }
    if(objJson.data){
        const priceList = objJson.data.node
        //console.log(priceList)
        priceObj.price = priceList[0] || null
        priceObj.salePrice = priceList[1] || null
        priceObj.retailPrice = priceList[2] || null

        // "prices": {
        //     "price": {
        //         "value": 60.12,
        //         "currencyCode": "USD"
        //     },
        //     "salePrice": null,
        //     "retailPrice": null
        // },
    }

    return priceObj
}

export function convertAllProdcutsType(productsJson:any){
    let productList = productsJson.data.node
    if(productList){
        const cursors = ['YXJyYXljb25uZWN0aW9uOjA','YXJyYXljb25uZWN0aW9uOjE=','YXJyYXljb25uZWN0aW9uOjI=']
        for(let i = 0; i< productList.length; i++){
            productList[i] = {node:convertProduct(productList[i])}
            productList[i].node.cursor = cursors[i]
        }
        let pageInfo = {
            "startCursor": "YXJyYXljb25uZWN0aW9uOjA=",
            "endCursor": "YXJyYXljb25uZWN0aW9uOjE="
        }
        
        // let products = {
        //     pageInfo:pageInfo,
        //     edges:productList
        // }
        // allProducts.site = products
    }
    return productList
}


export function convertCategoryTreeType(categorysJson:any){
    const categoryTrees = categorysJson.cc_category__c
    const paths = ['/shop-all/', '/bath/', '/garden/', '/kitchen/', '/publications/']
    for(let i = 0; i < categoryTrees.length; i++){
        categoryTrees[i].path = paths[i]
    }
    return categoryTrees
} 

export function convertBrandTreeType(brandsJson:any){
    const brandTrees = brandsJson.cc_category__c
    const paths = ['/shop-all/', '/bath/', '/garden/', '/kitchen/', '/publications/']
    for(let i = 0; i < brandTrees.length; i++){
        brandTrees[i].path = paths[i]
    }
    return brandTrees
} 

export function convertAllProdcutsPathType(productsJson:any){
    let productList = productsJson.data.node
    if(productList){
        for(let i = 0; i< productList.length; i++){
            const path = '/' +productList[i]._id + '/'
            productList[i].path = path
            delete productList[i]._id
            productList[i] = {node: productList[i]}
        }
    }
    return productList
}