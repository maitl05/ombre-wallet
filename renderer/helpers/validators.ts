import _ from 'lodash'

export type ValidatorFunction = (value: string) => string | undefined

export const testHelloValidator: ValidatorFunction = (value) => {
  if (value !== 'hello') {
    return 'you should say hello'
  } else {
    return undefined
  }
}

// TODO WARNING this code is incorrect fix later
export const paymentIdValidator: ValidatorFunction = (value) => {
  if (value.length !== 0) {
    if (
      /^[0-9A-Fa-f]+$/.test(value) &&
      (value.length == 16 || value.length == 64)
    ) {
      return undefined
    } else {
      return 'Invalid Payment ID'
    }
  } else {
    return undefined
  }
}

// TODO WARNING this code is incorrect fix later
export const privkeyValidator: ValidatorFunction = (value) => {
  if (value.length !== 0) {
    if (/^[0-9A-Fa-f]+$/.test(value) && value.length == 64) {
      return undefined
    } else {
      return 'Invalid Private Key'
    }
  } else {
    return undefined
  }
}

// TODO WARNING this code is incorrect fix later
export const addressValidator: ValidatorFunction = (value) => {
  if (!/^[0-9A-Za-z]+$/.test(value)) return 'Address must be base58'

  switch (value.substring(0, 4)) {
    case 'Shade':
    case 'cash':
    case 'Suto':
    case 'Te':
      return value.length === 98 ? undefined : 'Invalid Address'

    case 'Suba':
    case 'Ts':
      return value.length == 98 ? undefined : 'Invalid Address'

    case 'Shadow':
    case 'casi':
    case 'Suti':
    case 'Ti':
      return value.length === 109 ? undefined : 'Invalid Address'

    case 'Shad3':
    case 'Tu':
      return value.length === 54 ? undefined : 'Invalid Address'

    default:
      return 'Invalid Address'
  }
}

export const portValidator: ValidatorFunction = (value) => {
  if (String(parseInt(value)) !== String(value)) {
    return 'Port must be number'
  } else if (parseInt(value) < 1024 || parseInt(value) > 65535) {
    return 'Port must be in range'
  } else {
    return undefined
  }
}

export const walletNameValidator: ValidatorFunction = (val) => {
  return !/^[\w\-. ]+$/.test(val) ? 'not a valid filename' : undefined
}

export const passwordValidator: ValidatorFunction = (val) => {
  return !val.length ? 'password must not be empty' : undefined
}

export const walletHeightValidator: ValidatorFunction = (val) => {
  return String(parseInt(val)) !== val
    ? 'should be a number'
    : parseInt(val) < 0
    ? 'should be greater than or equal to zero'
    : undefined
}

export const seedPhraseValidator: ValidatorFunction = (val) => {
  const seed = val
    .trim()
    .replace(/\s{2,}/g, ' ')
    .split(' ')
  if (
    seed.length !== 14 &&
    seed.length !== 24 &&
    seed.length !== 25 &&
    seed.length !== 26
  ) {
    return 'invalid seed word length'
  }
  return undefined
}

export const amountValidatorFactory: (max?: number) => ValidatorFunction =
  (max) => (val) => {
    return String(parseFloat(val)) !== val
      ? 'should be a number'
      : parseFloat(val) <= 0
      ? 'should be greater than zero'
      : !_.isUndefined(max)
      ? parseFloat(val) > max
        ? 'exceeds unlocked balance'
        : undefined
      : undefined
  }
