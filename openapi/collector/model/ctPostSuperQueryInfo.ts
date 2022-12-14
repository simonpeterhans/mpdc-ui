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
import { CtPostSubQueryInfo } from './ctPostSubQueryInfo';
import { QueryData } from './queryData';
import { CtPostQueryOptions } from './ctPostQueryOptions';


export interface CtPostSuperQueryInfo { 
    queryData: QueryData;
    postQueryData: CtPostQueryOptions;
    fetchMultimedia: Array<CtPostSuperQueryInfo.FetchMultimediaEnum>;
    indexInCineast: boolean;
    subQueries: Array<CtPostSubQueryInfo>;
    id: number;
}
export namespace CtPostSuperQueryInfo {
    export type FetchMultimediaEnum = 'UNKNOWN' | 'ANIMATED_IMAGE' | 'IMAGE' | 'VIDEO';
    export const FetchMultimediaEnum = {
        Unknown: 'UNKNOWN' as FetchMultimediaEnum,
        AnimatedImage: 'ANIMATED_IMAGE' as FetchMultimediaEnum,
        Image: 'IMAGE' as FetchMultimediaEnum,
        Video: 'VIDEO' as FetchMultimediaEnum
    };
}


