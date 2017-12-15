import { roster, eliminations } from './data';

var cache = {};

export function universeOf(w) {
  if (w in cache) {
      return cache[w];
  }

  for (var u in roster) {
    if (roster[u].warriors.indexOf(w) !== -1) {
      return cache[w] = u;
    }
  }
}

export function universeName(w) {
  return 'Universe ' + w.substring(1);
}
