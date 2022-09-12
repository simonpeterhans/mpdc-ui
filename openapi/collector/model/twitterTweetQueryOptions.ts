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
import { TwitterKeywordQueryParameter } from './twitterKeywordQueryParameter';
import { TwitterAccountQueryParameter } from './twitterAccountQueryParameter';


export interface TwitterTweetQueryOptions { 
    accounts: Array<TwitterAccountQueryParameter>;
    queryDelayMinutes: number;
    referencedTweetsDepth: number;
    useStreamingApiIfPossible: boolean;
    keywords: Array<TwitterKeywordQueryParameter>;
}

