// noinspection DuplicatedCode

import {Injectable} from '@angular/core';
import {CtListSuperQueryInfo} from "../../../../openapi/collector";
import {QueryType, SuperQuery} from "../../common/super-query-table/super-query.model";
import {SubQuery} from "../../common/sub-query-table/sub-query.model";

@Injectable({
  providedIn: 'root'
})
export class ConvertCtQueryService {

  constructor() {
  }

  convertListQueries(superQueries: CtListSuperQueryInfo[]): SuperQuery[] {
    return superQueries.map(
      resSuperQuery => {
        let subQueries = resSuperQuery.subQueries.map(resSubQuery => {
          return new SubQuery(
            resSubQuery.id,
            resSubQuery.queryData.interval.start!!,
            resSubQuery.queryData.interval.end!!,
            resSubQuery.temporalType,
            resSubQuery.state.lastProcessingTimestamp,
            resSubQuery.state.lastCheckpointTimestamp ? resSubQuery.state.lastCheckpointTimestamp : "-1",
            resSubQuery.state.streamStatus,
            resSubQuery.state.statusText,
            resSubQuery.percentComplete,
            resSubQuery.stats.numPosts,
            resSubQuery.stats.numUniqueMediaObjects,
            resSubQuery.stats.numRemainingMediaObjects
          )
        })

        // Update super query.
        return new SuperQuery(
          resSuperQuery.id!!,
          resSuperQuery.queryData.label,
          resSuperQuery.queryData.interval.start!!,
          resSuperQuery.queryData.interval.end!!,
          resSuperQuery.fetchMultimedia.join(", "),
          resSuperQuery.indexInCineast,
          QueryType.CT_LIST,
          resSuperQuery.listData,
          subQueries
        )
      }
    )
  }

}
