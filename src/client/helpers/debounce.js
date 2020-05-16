// @flow strict

/*::
declare function debounce(() => mixed, delay: number): () => mixed;
declare function debounce<A>((A) => mixed, delay: number): A => mixed;
declare function debounce<A, B>((A, B) => mixed, delay: number): (A, B) => mixed;
declare function debounce<A, B, C>((A, B, C) => mixed, delay: number): (A, B, C) => mixed;
*/

export function debounce(func: () => mixed, delay: number) {
  let timerId = null;

  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
}
