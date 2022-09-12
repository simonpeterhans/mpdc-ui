import {ButtonDef} from "../action-table/button-def.model";

// No platform-specific stuff here.
export class SubQuery {

  subId: number;
  from: string;
  to: string;
  temporalType: string
  lastProcessed: string;
  lastCheckpoint: string;
  state: string;
  statusText: string;
  progress: number;
  numPosts: number;
  uniqueMedia: number;
  mediaJobs: number;

  actions: ButtonDef<SubQuery>[]

  constructor(
    subId: number,
    from: string,
    to: string,
    temporalType: string,
    lastProcessed: string,
    lastCheckpoint: string,
    state: string,
    statusText: string,
    progress: number,
    numPosts: number,
    mediaProgress: number,
    mediaJobs: number,
  ) {
    this.subId = subId;
    this.from = from;
    this.to = to;
    this.temporalType = temporalType;
    this.lastProcessed = lastProcessed;
    this.lastCheckpoint = lastCheckpoint;
    this.state = state;
    this.statusText = statusText;
    this.progress = progress;
    this.numPosts = numPosts;
    this.uniqueMedia = mediaProgress
    this.mediaJobs = mediaJobs;

    this.actions = [];
  }

}
