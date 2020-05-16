// @flow strict

/*::
declare function throttle(() => mixed, delay: number): () => mixed;
declare function throttle<A>((A) => mixed, delay: number): A => mixed;
declare function throttle<A, B>((A, B) => mixed, delay: number): (A, B) => mixed;
declare function throttle<A, B, C>((A, B, C) => mixed, delay: number): (A, B, C) => mixed;
*/

export function throttle(func: () => mixed, delay: number) {
  let timeout = null;

  return (...args) => {
    if (timeout) {
      return;
    }
    timeout = setTimeout(() => {
      func.apply(null, args);
      timeout = null;
    }, delay);
  };
}
