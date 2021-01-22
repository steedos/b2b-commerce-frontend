import {SteedosClient} from '@steedos/client'
const steedosClient = new SteedosClient()


async function fetchSteedosGraphqlApi(){
    const url_api = 'http://127.0.0.1:5000/graphql'
    const token = `Bearer C6tdnBaPhEFomAWE7,6df0f7d2d0af7f9bd4c36251706dc7fedd3cfe577b5d8cc458e68b7741f04ba868528f569de0be7b5797f6`
    const query = `
        query{
            __typename
            cc_product__c{
                __typename
                entity_id:_id
                prices__c {
                _id
                price:price__c{
                    value: price_value__c
                    currencyCode: _id
                }
                salePrice:sale_price__c {
                    value: price_value__c
                    currencyCode: _id
                }
                retailPrice:retail_price__c {
                    value: price_value__c
                    currencyCode: _id
                }
                
                }
                images__c {
                _id
                name
                related__cc_product_media__c {
                    _id
                    name
                    url__c
                }
                }
                productOptions:product_options__c {
                __typename
                edges:related__cc_category__c {
                    __typename
                    displayName:name
                    values:values__c {
                    __typename
                    edges:related__cc_spec__c {
                        _id
                        name
                    } 
                    }
                }
                } 
            }  
        }
    `
    const bodyJson = {
        query: query
    }

    const res = await steedosClient.doFetch(url_api, {
        method: 'POST',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyJson),
    })
    
    console.log('res-----', res);
    // const data =await res.json()
    // console.log('res.json()----', data)
    return res
}
export default fetchSteedosGraphqlApi


