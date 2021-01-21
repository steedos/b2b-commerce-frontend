import { SteedosClient } from '../../../../node_modules/@steedos/client'

var steedosClient = new SteedosClient()


async function fetchSteedosGraphqlApi(){
    const url_api = 'http://127.0.0.1:5000/graphql'
    const token = `Bearer C6tdnBaPhEFomAWE7,6df0f7d2d0af7f9bd4c36251706dc7fedd3cfe577b5d8cc458e68b7741f04ba868528f569de0be7b5797f6`)

    const query = `
        query{
            __typename
            cc_product__c{
            __typename
            entity_id:_id
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

    const data =await res.json()
    console.log(data)

}
export default fetchSteedosGraphqlApi


