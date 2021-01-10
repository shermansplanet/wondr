import * as apokalypsi from './axiom_info/apokalypsi';
import * as automata from './axiom_info/automata';

export const axioms = [
  "Apokalypsi",
  "Automata",
]

export const axiomDefs = {
  "Apokalypsi" : apokalypsi,
  "Automata" : automata,
}

export const sizeBonuses = {
  0: -2,
  1: -1,
  2: 0,
  4: 1,
  6: 2,
  12: 3,
  30: 4
}