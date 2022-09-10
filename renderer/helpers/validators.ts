export type ValidatorFunction = (value: string) => string | undefined

export const testHelloValidator: ValidatorFunction = (value) => {
  if (value !== 'hello') {
    return 'you should say hello'
  } else {
    return undefined
  }
}
