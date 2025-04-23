import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from '../interfaces/game.interface';

const games: Game[] = [
  {
    id: 1,
    route: 'maze',
    title: 'Maze',
    author: 'Changhui Xu',
    description:
      'A maze game where you can find the exit by moving through the maze.',
    sourceUrl: '',
  },
  {
    id: 2,
    route: 'snake',
    title: 'Snake',
    author: 'unknown',
    description:
      'A snake game where you can control the snake to eat food and grow longer.',
    sourceUrl: '',
  },
  {
    id: 3,
    route: 'tetris',
    title: 'Tetris',
    author: 'unknown',
    description:
      'A tetris game where you can rotate and move the blocks to fit them together.',
    sourceUrl: '',
  },
  {
    id: 4,
    route: '4-in-a-row',
    title: '4 en línea',
    author: 'unknown',
    description:
      'A 4 in a row game where you can connect four pieces in a row to win.',
    sourceUrl: '',
  },
  {
    id: 5,
    route: 'ppt',
    title: 'Piedra, papel o tijera',
    author: 'unknown',
    description:
      'A rock, paper, scissors game where you can play against the computer.',
    sourceUrl: '',
  },
  {
    id: 6,
    route: 'tic-tac-toe',
    title: 'Tic Tac Toe',
    author: 'unknown',
    description: 'A tic-tac-toe game where you can play against the computer.',
    sourceUrl: '',
  },
  {
    id: 7,
    route: 'catch-the-cat',
    title: 'Catch the Cat',
    author: 'unknown',
    description:
      'A catch the cat game where you can catch the cat by clicking on it.',
    sourceUrl: '',
  },
  {
    id: 8,
    route: 'shark-bait',
    title: 'Shark Bait',
    author: 'unknown',
    description:
      'Save the pirate from been eaten by the shark by guessing the movie title.',
    sourceUrl: '',
  },
  {
    id: 9,
    route: 'minesweeper',
    title: 'Minesweeper',
    author: 'unknown',
    description:
      ' A minesweeper game where you can clear the minefield by clicking on the squares.',
    sourceUrl: '',
  },
  {
    id: 10,
    route: 'target',
    title: 'Target',
    author: 'unknown',
    description:
      'A target game where you can shoot the target by clicking on it.',
    sourceUrl: '',
  },
];

@Injectable({ providedIn: 'root' })
export class GamesService {
  favoritesGames = signal<Game[]>([]);

  getGames(): Observable<Game[]> {
    console.log('observable');
    return of(games);
  }
}
