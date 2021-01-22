import type { GetProductQuery, GetProductQueryVariables } from '../../schema'
import setProductLocaleMeta from '../utils/set-product-locale-meta'
import { productInfoFragment } from '../fragments/product'
import { BigcommerceConfig, getConfig } from '..'
import { fetchSteedosGraphqlApi } from '../utils/fetch-steedos-api'
import { convertObjType, convertPriceType } from './type-convert'


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
  const { data } = await config.fetch<GetProductQuery>(query, { variables })
  const product = data.site?.route?.node


  //调用steedos的fetch，通过graphql获取数据
  const proQuery = `
        query{
            node:cc_product__c{
                __typename
                _id
                name
                short_desc__c:description
                related__cc_product_category__c {
                  _id
                  name
                }
                related__cc_product_spec__c {
                  _id
                  name
                  spec_value__c
                }
                related__cc_product_media__c{
                  _id
                  name
                  url__c
                }
            }          
        }
    `
  const priceQuery = `
    query{
      cc_price_list__c {
        __typename
        _id
        name
        related__cc_price_list_items__c {
          _id
          name
          price_value__c
        }
      }
    }
  `
  
  const product_main  = await fetchSteedosGraphqlApi(proQuery)
    console.log('product_main--', product_main)

  const price_list = await fetchSteedosGraphqlApi(priceQuery)
 
  //TODO convert
  const product_all = convertObjType(product_main)
  const price_all = convertPriceType(price_list)
  

  console.log('product_new---', product_all)
  console.log('product_price---', price_all)
  if (product?.__typename === 'Product') {
    if (locale && config.applyLocale) {
      setProductLocaleMeta(product)
    }
    return { product }
  }

  return {}
}

export default getProduct
