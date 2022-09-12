import {ButtonDef} from "../action-table/button-def.model";
import {SubQuery} from "../sub-query-table/sub-query.model";
import * as dayjs from "dayjs";
import {StateEval} from "../state-eval";

export enum QueryType {

  CT_LIST,
  TWITTER_TWEET,
  TWITTER_SAMPLE_STREAM // This can only be a stream.

}

// No platform-specific stuff here.
export class SuperQuery {

  superId: number;
  numSubQueries: number;
  label: string;
  from: string;
  to: string;
  lastProcessed: string;
  health: string;
  progress: number;
  numPosts: number;
  uniqueMedia: number;
  mediaJobs: number;
  multimediaDownload: string; // Due to OpenAPI not creating a single MediaType enum.
  indexInCineast: string;

  specificData: any;
  queryType: QueryType; // Needed to forward to proper query edit/inspect component.
  subQueries: SubQuery[]

  // Set manually later on.
  actions: ButtonDef<SuperQuery>[]

  constructor(
    superId: number,
    label: string,
    from: string,
    to: string,
    multimediaDownload: string,
    indexInCineast: boolean,
    queryType: QueryType,
    specificData: any,
    subQueries: SubQuery[]
  ) {
    this.superId = superId;
    this.numSubQueries = subQueries.length;
    this.label = label;
    this.from = from;
    this.to = to;
    this.multimediaDownload = multimediaDownload;
    this.indexInCineast = indexInCineast.toString().toUpperCase();
    this.queryType = queryType;
    this.specificData = specificData;
    this.subQueries = subQueries;

    // Date.
    this.lastProcessed = "0";
    subQueries.forEach(it => {
      dayjs(it.lastProcessed).isAfter(this.lastProcessed)
      this.lastProcessed = it.lastProcessed
    });

    // Health.
    this.health = "GOOD";
    subQueries.forEach(it => {
      if (StateEval.isRecoverable(it.state)) {
        this.health = "ACTION NEEDED";
      }
    });

    // TODO Health for unrecoverable queries.

    // Progress.
    let totalDuration = +this.to - +this.from;
    if (totalDuration > 0) {
      let processedDuration = subQueries
        .map(it => (+it.to - +it.from) * it.progress)
        .reduce((sum, current) => sum + current);
      this.progress = processedDuration / totalDuration;
    } else {
      this.progress = 1.0;
    }

    // Posts.
    this.numPosts = this.subQueries
      .map(it => it.numPosts)
      .reduce((sum, current) => sum + current);

    // Unique media.
    this.uniqueMedia = this.subQueries
      .map(it => it.uniqueMedia)
      .reduce((sum, current) => sum + current);

    // Unique media.
    this.mediaJobs = this.subQueries
      .map(it => it.mediaJobs)
      .reduce((sum, current) => sum + current);

    this.actions = [];
  }

  getSubIds() {
    return this.subQueries.map(it => it.subId);
  }

}
