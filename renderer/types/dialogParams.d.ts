export type DialogParams = {
  message: string
  title: string
  ok?: string
  cancel?: string
  prompt?: {
    type?: 'text' | 'password'
    value?: string
  }
}
