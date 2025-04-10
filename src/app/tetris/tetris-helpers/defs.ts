import { Figures } from './figures.model';

export const GLASS_DIMENSIONS = {
  width: 10,
  height: 20,
};

export const NEXT_DIMENSIONS = {
  width: 4,
  height: 4,
};

export const CELL = {
  z: 'z',
  s: 's',
  l: 'l',
  j: 'j',
  t: 't',
  i: 'i',
  o: 'o',
  empty: ' ',
};

export const COLORS = {
  [CELL.z]: '#dca3c2',
  [CELL.s]: '#61aac5',
  [CELL.l]: '#7894cf',
  [CELL.j]: '#b8d1ff',
  [CELL.t]: '#f5d788',
  [CELL.i]: '#c7cef4',
  [CELL.o]: '#d1a69b',
  [CELL.empty]: '#ffffff',
};

export const FIGURES: Figures = {
  figures: [
    {  // Z
      code: CELL.z,
      shape: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
      ],
    },
    {  // S
      code: CELL.s,
      shape: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ]
    },
    { // L
      code: CELL.l,
      shape: [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
    },
    { // J
      code: CELL.j,
      shape: [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
    },
    { // T
      code: CELL.t,
      shape: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
    },
    { // Stick
      code: CELL.i,
      shape: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    },
    { // Square
      code: CELL.o,
      shape: [
        [1, 1],
        [1, 1],
      ],
    },
  ],
};


export const collapsedRowsToScore: Record<number, number> = {
  1: 1,
  2: 2,
  3: 5,
  4: 10,
};


export const speedToInterval: Record<number, number> = {
  1: 1100,
  2: 700,
  3: 400,
  4: 350,
  5: 300,
  6: 230,
  7: 150,
  8: 90,
  9: 60,
};
