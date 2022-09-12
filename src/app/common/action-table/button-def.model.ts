export interface ButtonDef<T> {

  icon: string,
  tooltip: string,
  f: (e: T) => void

}
