export type DialogParams = {
  message: string
  title: string
  ok?: string
  cancel?: string
  callback?: (value: boolean) => void
}
