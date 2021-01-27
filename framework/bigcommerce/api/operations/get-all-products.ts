import type {
  GetAllProductsQuery,
  GetAllProductsQueryVariables,
} from '../../schema'
import type { RecursivePartial, RecursiveRequired } from '../utils/types'
import filterEdges from '../utils/filter-edges'
import setProductLocaleMeta from '../utils/set-product-locale-meta'
import { productConnectionFragment } from '../fragments/product'
import { BigcommerceConfig, getConfig } from '..'
import { fetchSteedosGraphqlApi } from '../utils/fetch-steedos-api'
import { convertAllProdcutsType, convertPriceType } from './type-convert'

export const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts(
    $hasLocale: Boolean = false
    $locale: String = "null"
    $entityIds: [Int!]
    $first: Int = 10
    $products: Boolean = false
    $featuredProducts: Boolean = false
    $bestSellingProducts: Boolean = false
    $newestProducts: Boolean = false
  ) {
    site {
      products(first: $first, entityIds: $entityIds) @include(if: $products) {
        ...productConnnection
      }
      featuredProducts(first: $first) @include(if: $featuredProducts) {
        ...productConnnection
      }
      bestSellingProducts(first: $first) @include(if: $bestSellingProducts) {
        ...productConnnection
      }
      newestProducts(first: $first) @include(if: $newestProducts) {
        ...productConnnection
      }
    }
  }

  ${productConnectionFragment}
`

export type ProductEdge = NonNullable<
  NonNullable<GetAllProductsQuery['site']['products']['edges']>[0]
>

export type ProductNode = ProductEdge['node']

export type GetAllProductsResult<
  T extends Record<keyof GetAllProductsResult, any[]> = {
    products: ProductEdge[]
  }
> = T

const FIELDS = [
  'products',
  'featuredProducts',
  'bestSellingProducts',
  'newestProducts',
]

export type ProductTypes =
  | 'products'
  | 'featuredProducts'
  | 'bestSellingProducts'
  | 'newestProducts'

export type ProductVariables = { field?: ProductTypes } & Omit<
  GetAllProductsQueryVariables,
  ProductTypes | 'hasLocale'
>

async function getAllProducts(opts?: {
  variables?: ProductVariables
  config?: BigcommerceConfig
  preview?: boolean
}): Promise<GetAllProductsResult>

async function getAllProducts<
  T extends Record<keyof GetAllProductsResult, any[]>,
  V = any
>(opts: {
  query: string
  variables?: V
  config?: BigcommerceConfig
  preview?: boolean
}): Promise<GetAllProductsResult<T>>

async function getAllProducts({
  query = getAllProductsQuery,
  variables: { field = 'products', ...vars } = {},
  config,
}: {
  query?: string
  variables?: ProductVariables
  config?: BigcommerceConfig
  preview?: boolean
} = {}): Promise<GetAllProductsResult> {
  config = getConfig(config)

  const locale = vars.locale || config.locale
  const variables: GetAllProductsQueryVariables = {
    ...vars,
    locale,
    hasLocale: !!locale,
  }

  if (!FIELDS.includes(field)) {
    throw new Error(
      `The field variable has to match one of ${FIELDS.join(', ')}`
    )
  }

  variables[field] = true

  console.log("getAllProducts---variables---", variables)

  // RecursivePartial forces the method to check for every prop in the data, which is
  // required in case there's a custom `query`
  // const { data } = await config.fetch<RecursivePartial<GetAllProductsQuery>>(
  //   query,
  //   { variables }
  // )
  // const edges = data.site?.[field]?.edges

   //调用steedos的fetch，通过graphql获取数据
   const proQuery = `
   query{
          node:cc_product__c{
            _id
            name
            related__cc_product_media__c{
              _id
              name
              urlOriginal:url__c
            }
            related__cc_product_spec__c {
              __typename
              name
              displayName:spec_value__c
              spec__c {
                _id
                name
                label:spec_group__c__label
                isDefault:is_visible_in_cataiog__c
              } 
            }
        }          
    }
  `
  // let productId = ''
  // const priceQ = `
  //   query{
  //     node:cc_price_list_items__c(filters: "product__c eq '${productId}'") {
  //       _id
  //       price_value__c
  //     }
  //   }
  // `
  const products_main  = await fetchSteedosGraphqlApi(proQuery)
  const products = convertAllProdcutsType(products_main)

  for(let i = 0; i < products.length; i++){
    if (products[i].node){
      const productId = products[i].node._id
      const priceQ = `
        query{
          node:cc_price_list_items__c(filters: "product__c eq '${productId}'") {
            value:price_value__c
          }
        }
      `
      const prices = await fetchSteedosGraphqlApi(priceQ)
      const price_all = convertPriceType(prices)
      products[i].node.prices = price_all
      //console.log('products[i].node.prices', products[i].node.prices)
    }
  }
  
  //const products = filterEdges(edges as RecursiveRequired<typeof edges>)

  if (locale && config.applyLocale) {
    products.forEach((product: RecursivePartial<ProductEdge>) => {
      if (product.node) setProductLocaleMeta(product.node)
    })
  }

   // 生成json文件，查看数据结构
   const fs = require('fs')
   const path = require('path')
   let targetFolderName = './docs';
   try{
       fs.statSync(targetFolderName);
   }catch(e){
       //目录不存在的情况下       
       if(e.code == "ENOENT"){
           fs.mkdirSync(targetFolderName);
       }  
   }
   fs.writeFileSync(path.join(targetFolderName,'products.json'), JSON.stringify(products));
  return { products }
}

export default getAllProducts
