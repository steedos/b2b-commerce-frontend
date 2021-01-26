import type { GetProductQuery, GetProductQueryVariables } from '../../schema'
import setProductLocaleMeta from '../utils/set-product-locale-meta'
import { productInfoFragment } from '../fragments/product'
import { BigcommerceConfig, getConfig } from '..'
import { fetchSteedosGraphqlApi } from '../utils/fetch-steedos-api'
import { convertProductType, convertPriceType } from './type-convert'


export const getProductQuery = /* GraphQL */ `
  query getProduct(
    $hasLocale: Boolean = false
    $locale: String = "null"
    $path: String!
  ) {
    site {
      route(path: $path) {
        node {
          __typename
          ... on Product {
            ...productInfo
            variants {
              edges {
                node {
                  entityId
                  defaultImage {
                    urlOriginal
                    altText
                    isDefault
                  }
                  prices {
                    ...productPrices
                  }
                  inventory {
                    aggregated {
                      availableToSell
                      warningLevel
                    }
                    isInStock
                  }
                  productOptions {
                    edges {
                      node {
                        __typename
                        entityId
                        displayName
                        ...multipleChoiceOption
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  ${productInfoFragment}
`

export type ProductNode = Extract<
  GetProductQuery['site']['route']['node'],
  { __typename: 'Product' }
>

export type GetProductResult<
  T extends { product?: any } = { product?: ProductNode }
> = T

export type ProductVariables = { locale?: string } & (
  | { path: string; slug?: never }
  | { path?: never; slug: string }
)

async function getProduct(opts: {
  variables: ProductVariables
  config?: BigcommerceConfig
  preview?: boolean
}): Promise<GetProductResult>

async function getProduct<T extends { product?: any }, V = any>(opts: {
  query: string
  variables: V
  config?: BigcommerceConfig
  preview?: boolean
}): Promise<GetProductResult<T>>

async function getProduct({
  query = getProductQuery,
  variables: { slug, ...vars },
  config,
}: {
  query?: string
  variables: ProductVariables
  config?: BigcommerceConfig
  preview?: boolean
}): Promise<GetProductResult> {
  config = getConfig(config)

  const locale = vars.locale || config.locale
  const variables: GetProductQueryVariables = {
    ...vars,
    locale,
    hasLocale: !!locale,
    path: slug ? `/${slug}/` : vars.path!,
  }
  //const { data } = await config.fetch<GetProductQuery>(query, { variables })
  //const product = data.site?.route?.node
  //console.log('getProduct---variables--', variables)

  //调用steedos的fetch，通过graphql获取数据
  const productId = variables.path.split('/')[1] || null
  console.log('productId--', productId)
  const proQuery = `
        query{
          node:cc_product__c(filters:"_id eq '${productId}'"){
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
  const priceQuery = `
    query{
      node:cc_price_list__c {
        __typename
        _id
        name
        priceList:related__cc_price_list_items__c {
          _id
          name
          price_value__c
        }
      }
    }
  `
  
  const product_main  = await fetchSteedosGraphqlApi(proQuery)
  //console.log('product_main--', product_main)

  const price_list = await fetchSteedosGraphqlApi(priceQuery)
 
  //TODO convert

  const product_new = convertProductType(product_main)
  const product:any = product_new.site.route.node
  const price_all = convertPriceType(price_list)
  product.prices = price_all

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
  fs.writeFileSync(path.join(targetFolderName,'producttest.json'), JSON.stringify(product));

  if (product) {
    if (locale && config.applyLocale) {
      setProductLocaleMeta(product)
    }
    return { product }
  }

  return {}
}

export default getProduct
