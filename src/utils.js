import { roster, eliminations } from './data';

export function universeOf(w) {
  for (var u in roster) {
    if (roster[u].warriors.indexOf(w) !== -1) {
      return u;
    }
  }
}
