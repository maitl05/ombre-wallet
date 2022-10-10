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
      return value.length === 99 ? undefined : 'Invalid Address'

      return value.length == 98 ? undefined : 'Invalid Address'

    case 'Suba':
    case 'Ts':
      return value.length == 99 ? undefined : 'Invalid Address'

    case 'Shadow':
    case 'casi':
    case 'Suti':
    case 'Ti':
      return value.length === 110 ? undefined : 'Invalid Address'

    case 'Shad3':
    case 'Tu':
      return value.length === 55 ? undefined : 'Invalid Address'

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
