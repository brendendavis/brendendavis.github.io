// utils.js
export const formatMod = mod => (mod >= 0 ? `+${mod}` : `${mod}`);

export function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}