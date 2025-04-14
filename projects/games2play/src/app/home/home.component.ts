import { Component, inject, linkedSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { GameCardComponent } from '../components/game-card.component';
import { GamesService } from '../services/games.service';
import { Game } from '../interfaces/game.interface';

@Component({
  selector: 'app-home',
  template: `
    <div class="w-full max-w-4xl mt-12 mx-auto px-4">
      <h1 class="text-2xl font-bold mb-4">Games2play</h1>

      <p>Welcome to the Ngrx Signal Games app!</p>

      <div class="grid grid-cols-2  lg:grid-cols-3 gap-4 mt-8">
        @for(game of gamesToShow(); track game.id) {
        <app-game-card [game]="game" (onFavorite)="favoriteGame($event)" />
        }
      </div>
    </div>
  `,
  imports: [GameCardComponent],
})
export default class HomeComponent {
  gamesService = inject(GamesService);

  games = toSignal(this.gamesService.getGames(), { initialValue: [] });

  gamesToShow = linkedSignal<Game[]>(() => this.games());

  favoriteGame(game: Game) {
    this.gamesToShow.update((games) => {
      return games.filter((b) => b.id !== game.id);
    });

    this.gamesService.favoritesGames.update((games) => {
      return [...games, { ...game, isFavorite: true }];
    });
  }
}
