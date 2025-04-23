import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from '../interfaces/game.interface';

const games: Game[] = [
  { id: 1, route: 'maze', title: 'Maze', author: 'Changhui Xu' },
];

@Injectable({ providedIn: 'root' })
export class GamesService {
  favoritesGames = signal<Game[]>([]);

  getGames(): Observable<Game[]> {
    console.log('observable');
    return of(games);
  }
}
