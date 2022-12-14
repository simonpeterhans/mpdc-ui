/**
 * 
 * MPDC Collector API
 *
 * The version of the OpenAPI document: 0.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface TwitterKeywordQueryParameter { 
    keyword: string;
    type: TwitterKeywordQueryParameter.TypeEnum;
    raw: string;
}
export namespace TwitterKeywordQueryParameter {
    export type TypeEnum = 'KEYWORD' | 'ACCOUNT';
    export const TypeEnum = {
        Keyword: 'KEYWORD' as TypeEnum,
        Account: 'ACCOUNT' as TypeEnum
    };
}


