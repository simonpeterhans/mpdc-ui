import {QueryState} from "../../../openapi/collector";

// TODO Convert this to a service instead.
export class StateEval {

  static isRecoverable(state: string): boolean {
    return (state == QueryState.StreamStatusEnum.Interrupted
      || state == QueryState.StreamStatusEnum.ErrorInterrupt
      || state == QueryState.StreamStatusEnum.Recoverable)
  }

  static isInterruptible(state: string): boolean {
    return (state == QueryState.StreamStatusEnum.New
      || state == QueryState.StreamStatusEnum.Waiting
      || state == QueryState.StreamStatusEnum.Starting
      || state == QueryState.StreamStatusEnum.Running)
  }

  static isUnrecoverable(state: string): boolean {
    return (state == QueryState.StreamStatusEnum.Unrecoverable
      || state == QueryState.StreamStatusEnum.Aborted
      || state == QueryState.StreamStatusEnum.ErrorAbort)
  }

}
