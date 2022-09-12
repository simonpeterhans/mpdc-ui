export interface ColumnDef {

  key: string,
  label: string,
  show: boolean,
  /* This should be PipeTransform but since we're assigning an interface,
   * that's not possible. */
  pipe: any,
  pipeArgs: any[]

}
