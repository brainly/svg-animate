// @flow strict

export function not<A>(fn: (arg: A) => boolean): (arg: A) => boolean {
  return value => !fn(value);
}
