import {SteedosClient} from '@steedos/client'
const steedosClient = new SteedosClient()

const SERVER = 'http://127.0.0.1:5000'
steedosClient.setUrl(SERVER)


export async function fetchSteedosGraphqlApi(query:any){
    console.log('start-----------')

    const url_api = `${SERVER}/graphql`
    const token = `Bearer C6tdnBaPhEFomAWE7,6df0f7d2d0af7f9bd4c36251706dc7fedd3cfe577b5d8cc458e68b7741f04ba868528f569de0be7b5797f6`
    const bodyJson = {
        query: query
    }
    const res = await steedosClient.doFetch(url_api,{
        method: 'POST',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyJson),
    })
    
    console.log('res---fetch--', res.data.node);
    // const data =await res.json()
    // console.log('res.json()----', data)
    return res
}


