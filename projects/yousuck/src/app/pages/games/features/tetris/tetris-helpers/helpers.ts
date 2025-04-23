import { CELL, FIGURES } from './defs';
import { Figure } from './figure.model';


/**
 * Return 2D-array height
 * @param board - the board content (2D array of strings)
 */
export const getHeight = (board: string[][]|number[][]): number => board.length;


/**
 * Return 2D-array width
 * @param board - the board content (2D array of strings)
 */
export const getWidth = (board: string[][] | number[][] | null): number => {
  return board && board[0] ? board[0].length : 0;
};


/**
 * Return 2D array of strings, filled in empty cell values
 * @param width - the board width
 * @param height - the board height
 */
export const getCleanBoard = (width: number, height: number): string[][] => {
    const rows = [];
    for (let r = 0; r < height; r++) {
      const row = [];
      for (let c = 0; c < width; c++) {
        row.push(CELL.empty);
      }
      rows.push(row);
    }
    return rows;
};


/**
 * Return overlay 2D array with figure shape rendered
 * @param overlay - 2D array to render shape at
 * @param figure - figure to render
 * @param rotation - figure rotation (N * 90 degrees clock-wise)
 * @param offsetRow - initial row offset
 * @param offsetCol - initial col offset
 */
export const renderFigure = (
  overlay: string[][],
  figure: Figure | null,
  offsetRow: number = 0,
  offsetCol: number = 0,
  rotation: number = 0,
): string[][] => {
  if (!figure) {
    // in case no figure is passes — there is nothing to render
    return overlay;
  }

  const shape = rotateShapeNTimes(figure.shape, rotation);

  const overlayHeight = getHeight(overlay);
  const overlayWidth = getWidth(overlay);

  const shapeHeight = getHeight(shape);
  const shapeWidth = getWidth(shape);

  const rows = [];

  for (let r = 0; r < overlayHeight; r++) {
    const row = [];
    for (let c = 0; c < overlayWidth; c++) {
      const sR = r - offsetRow;
      const sC = c - offsetCol;
      row.push(
        (sR >= 0 && sR < shapeHeight && sC >= 0 && sC < shapeWidth)
          ? shape[sR][sC] ? figure.code : overlay[r][c]
          : overlay[r][c]
      );
    }
    rows.push(row);
  }
  return rows;
};


/**
 * Return true if the next position is valid (i.e. no collisions will occur)
 * @param board - 2D array of strings
 * @param figure - Figure
 * @param row - figure top-most row number
 * @param col - figure left-most column number
 * @param rotation - figure rotation
 */
export const isValid = (
  board: string[][],
  figure: Figure | null,
  row: number,
  col: number,
  rotation: number,
): boolean => {
  if (!figure) {
    return true;
  }

  const shape = rotateShapeNTimes(figure.shape, rotation);

  const boardHeight = getHeight(board);
  const boardWidth = getWidth(board);

  const shapeHeight = getHeight(shape);
  const shapeWidth = getWidth(shape);

  for (let r = 0; r < shapeHeight; r++) {
    for (let c = 0; c < shapeWidth; c++) {
      const shapePixel = shape[r][c];
      if (shapePixel === 1) {
        if (
          r < 0
          || r + row >= boardHeight
          || c < 0
          || c + col >= boardWidth
        ) {
          // out of board
          return false;
        }

        if (board[r + row][c + col] !== CELL.empty) {
          // overlap with board content
          return false;
        }
      }
    }
  }
  return true;
};


/**
 * Return number of fully filled rows on a board
 * @param board - 2D array of strings
 */
export const filledRowsCount = (board: string[][]): number => {
  let count = 0;
  board.map(row => {
    if (!row.find(cell => cell === CELL.empty)) {
      count++;
    }
  });
  return count;
};


/**
 * Return board with fully filled rows removed, corresponding amount of empty rows
 * added on top, and a number with amount of collapsed rows.
 * @param board - 2D array of strings
 */
export const collapseFilledRows = (board: string[][]): string[][] => {
  const boardHeight = getHeight(board);
  const boardWidth = getWidth(board);

  const collapsedBoard = board.filter(row => row.find(cell => cell === CELL.empty));
  const collapsedRowsCount = boardHeight - getHeight(collapsedBoard);

  if (collapsedRowsCount) {
    const emptyRow = [];
    for (let c = 0; c < boardWidth; c++) {
      emptyRow.push(CELL.empty);
    }

    const topRows = [];
    for (let r = 0; r < collapsedRowsCount; r++) {
      topRows.push(emptyRow);
    }

    return topRows.concat(collapsedBoard);
  }
  return collapsedBoard;
};


/**
 * Return shape, rotated 90 degrees clock-wise
 * @param shape - 2D array of numbers
 */
export const rotateShape = (shape: number[][]): number[][] => {
  const rows = [];
  for (let c = 0; c < getWidth(shape); c++) {
    const row = [];
    for (let r = getHeight(shape) - 1; r >= 0; r--) {
      row.push(shape[r][c]);
    }
    rows.push(row);
  }
  return rows;
};


/**
 * Return shape, rotated 90 degrees clock-wise N times
 * @param shape - 2D array of numbers, representing shape
 * @param n - amount of rotations to be applied
 */
export const rotateShapeNTimes = (shape: number[][], n: number): number[][] => {
  const rotation = n % 4;
  let rotatedShape = shape.slice();
  for (let i = 0; i < rotation; i++) {
    rotatedShape = rotateShape(rotatedShape);
  }
  return rotatedShape;
};

/**
 * Return random value of FIGURES.figures
 */
export const getRandomFigure = (): Figure => FIGURES.figures[Math.floor(Math.random() * FIGURES.figures.length)];
