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
                {
                    "node": {
                        "entityId": 230,
                        "defaultImage": {
                            "urlOriginal": "https://cdn11.bigcommerce.com/s-7buacsh1p4/images/stencil/original/attribute_rule_images/133_source_1610347039.png",
                            "altText": "",
                            "isDefault": true
                        },
                        "prices": {
                            "price": {
                                "value": 25,
                                "currencyCode": "USD"
                            },
                            "salePrice": null,
                            "retailPrice": null
                        },
                        "inventory": null,
                        "productOptions": {
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
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "node": {
                        "entityId": 232,
                        "defaultImage": {
                            "urlOriginal": "https://cdn11.bigcommerce.com/s-7buacsh1p4/images/stencil/original/attribute_rule_images/135_source_1610347039.png",
                            "altText": "",
                            "isDefault": true
                        },
                        "prices": {
                            "price": {
                                "value": 25,
                                "currencyCode": "USD"
                            },
                            "salePrice": null,
                            "retailPrice": null
                        },
                        "inventory": null,
                        "productOptions": {
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
                                                        "label": "M"
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "node": {
                        "entityId": 235,
                        "defaultImage": {
                            "urlOriginal": "https://cdn11.bigcommerce.com/s-7buacsh1p4/images/stencil/original/attribute_rule_images/137_source_1610347039.png",
                            "altText": "",
                            "isDefault": true
                        },
                        "prices": {
                            "price": {
                                "value": 25,
                                "currencyCode": "USD"
                            },
                            "salePrice": null,
                            "retailPrice": null
                        },
                        "inventory": null,
                        "productOptions": {
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
                                                        "label": "L"
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "node": {
                        "entityId": 237,
                        "defaultImage": {
                            "urlOriginal": "https://cdn11.bigcommerce.com/s-7buacsh1p4/images/stencil/original/attribute_rule_images/139_source_1610347039.png",
                            "altText": "",
                            "isDefault": true
                        },
                        "prices": {
                            "price": {
                                "value": 25,
                                "currencyCode": "USD"
                            },
                            "salePrice": null,
                            "retailPrice": null
                        },
                        "inventory": null,
                        "productOptions": {
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
                                                        "label": "Indigo Blue",
                                                        "isDefault": false,
                                                        "hexColors": [
                                                            "#3964C3"
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
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "node": {
                        "entityId": 239,
                        "defaultImage": {
                            "urlOriginal": "https://cdn11.bigcommerce.com/s-7buacsh1p4/images/stencil/original/attribute_rule_images/141_source_1610347039.png",
                            "altText": "",
                            "isDefault": true
                        },
                        "prices": {
                            "price": {
                                "value": 25,
                                "currencyCode": "USD"
                            },
                            "salePrice": null,
                            "retailPrice": null
                        },
                        "inventory": null,
                        "productOptions": {
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
                                                        "label": "Indigo Blue",
                                                        "isDefault": false,
                                                        "hexColors": [
                                                            "#3964C3"
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
                                                        "label": "M"
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "node": {
                        "entityId": 241,
                        "defaultImage": {
                            "urlOriginal": "https://cdn11.bigcommerce.com/s-7buacsh1p4/images/stencil/original/attribute_rule_images/143_source_1610347039.png",
                            "altText": "",
                            "isDefault": true
                        },
                        "prices": {
                            "price": {
                                "value": 25,
                                "currencyCode": "USD"
                            },
                            "salePrice": null,
                            "retailPrice": null
                        },
                        "inventory": null,
                        "productOptions": {
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
                                                        "label": "Indigo Blue",
                                                        "isDefault": false,
                                                        "hexColors": [
                                                            "#3964C3"
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
                                                        "label": "L"
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "node": {
                        "entityId": 243,
                        "defaultImage": {
                            "urlOriginal": "https://cdn11.bigcommerce.com/s-7buacsh1p4/images/stencil/original/attribute_rule_images/145_source_1610347040.png",
                            "altText": "",
                            "isDefault": true
                        },
                        "prices": {
                            "price": {
                                "value": 25,
                                "currencyCode": "USD"
                            },
                            "salePrice": null,
                            "retailPrice": null
                        },
                        "inventory": null,
                        "productOptions": {
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
                                                        "label": "Royal",
                                                        "isDefault": false,
                                                        "hexColors": [
                                                            "#4169E1"
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
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "node": {
                        "entityId": 245,
                        "defaultImage": {
                            "urlOriginal": "https://cdn11.bigcommerce.com/s-7buacsh1p4/images/stencil/original/attribute_rule_images/147_source_1610347040.png",
                            "altText": "",
                            "isDefault": true
                        },
                        "prices": {
                            "price": {
                                "value": 25,
                                "currencyCode": "USD"
                            },
                            "salePrice": null,
                            "retailPrice": null
                        },
                        "inventory": null,
                        "productOptions": {
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
                                                        "label": "Royal",
                                                        "isDefault": false,
                                                        "hexColors": [
                                                            "#4169E1"
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
                                                        "label": "M"
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "node": {
                        "entityId": 247,
                        "defaultImage": {
                            "urlOriginal": "https://cdn11.bigcommerce.com/s-7buacsh1p4/images/stencil/original/attribute_rule_images/149_source_1610347040.png",
                            "altText": "",
                            "isDefault": true
                        },
                        "prices": {
                            "price": {
                                "value": 25,
                                "currencyCode": "USD"
                            },
                            "salePrice": null,
                            "retailPrice": null
                        },
                        "inventory": null,
                        "productOptions": {
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
                                                        "label": "Royal",
                                                        "isDefault": false,
                                                        "hexColors": [
                                                            "#4169E1"
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
                                                        "label": "L"
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "node": {
                        "entityId": 248,
                        "defaultImage": {
                            "urlOriginal": "https://cdn11.bigcommerce.com/s-7buacsh1p4/images/stencil/original/attribute_rule_images/150_source_1610347040.png",
                            "altText": "",
                            "isDefault": true
                        },
                        "prices": {
                            "price": {
                                "value": 25,
                                "currencyCode": "USD"
                            },
                            "salePrice": null,
                            "retailPrice": null
                        },
                        "inventory": null,
                        "productOptions": {
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
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
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

        productObj.site.route.node = product
    }


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