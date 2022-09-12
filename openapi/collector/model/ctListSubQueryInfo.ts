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
import { QueryData } from './queryData';
import { CtListQueryOptions } from './ctListQueryOptions';
import { QueryState } from './queryState';
import { SubQueryStats } from './subQueryStats';


export interface CtListSubQueryInfo { 
    apiKey: string;
    temporalType: CtListSubQueryInfo.TemporalTypeEnum;
    queryData: QueryData;
    listData: CtListQueryOptions;
    state: QueryState;
    stats: SubQueryStats;
    id: number;
    percentComplete: number;
}
export namespace CtListSubQueryInfo {
    export type TemporalTypeEnum = 'SEARCH' | 'STREAM';
    export const TemporalTypeEnum = {
        Search: 'SEARCH' as TemporalTypeEnum,
        Stream: 'STREAM' as TemporalTypeEnum
    };
}

