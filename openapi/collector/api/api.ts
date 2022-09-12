export * from './crowdtangle.service';
import { CrowdtangleService } from './crowdtangle.service';
export * from './general.service';
import { GeneralService } from './general.service';
export * from './query.service';
import { QueryService } from './query.service';
export * from './twitter.service';
import { TwitterService } from './twitter.service';
export const APIS = [CrowdtangleService, GeneralService, QueryService, TwitterService];
