export type ClassName =
  | string
  | undefined
  | { [className: string]: boolean }
  | ClassName[]
