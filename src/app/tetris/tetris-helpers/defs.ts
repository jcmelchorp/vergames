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
  [CELL.z]: '#c33389',
  [CELL.s]: '#09759c',
  [CELL.l]: '#253e73',
  [CELL.j]: '#1660c6',
  [CELL.t]: '#ffc635',
  [CELL.i]: '#321caf',
  [CELL.o]: '#ec7f26',
  [CELL.empty]: '#ffffff',
};

export const FIGURES: Figures = {
  figures: [
    {
      // Z
      code: CELL.z,
      shape: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
    },
    {
      // S
      code: CELL.s,
      shape: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
    },
    {
      // L
      code: CELL.l,
      shape: [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
    },
    {
      // J
      code: CELL.j,
      shape: [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
    },
    {
      // T
      code: CELL.t,
      shape: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
    },
    {
      // Stick
      code: CELL.i,
      shape: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    },
    {
      // Square
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
