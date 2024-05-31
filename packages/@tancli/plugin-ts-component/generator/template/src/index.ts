export function add(...args: number[]) {
  return args.slice(1).reduce((pre, cur) => pre + cur, args[0])
}

export function sub(...args: number[]) {
  return args.slice(1).reduce((pre, cur) => pre - cur, args[0])
}

export function mul(...args: number[]) {
  return args.slice(1).reduce((pre, cur) => pre * cur, args[0])
}

export function div(...args: number[]) {
  return args.slice(1).reduce((pre, cur) => pre / cur, args[0])
}
