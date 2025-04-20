import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
  OnInit,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { GameCardComponent } from '../components/game-card.component';
import { GamesService } from '../services/games.service';
import { Game } from '../interfaces/game.interface';
import { GamesStore } from '../games.store';

@Component({
  selector: 'app-home-games',
  template: `
    <div class="w-full max-w-4xl mt-12 mx-auto px-4">
      <h1 class="text-2xl font-bold mb-4">Games2play</h1>

      <p>Welcome to the Ngrx Signal Games app!</p>
      @if (gamesStore.isLoading()) {
        <p>Loading...</p>
      } @else {
        <div class="grid grid-cols-2  lg:grid-cols-3 gap-4 mt-8">
          @for (game of gamesStore.games(); track game.id) {
            <app-game-card [game]="game" (onFavorite)="favoriteGame($event)" />
            <!-- <app-game-card [game]="game" /> -->
          }
        </div>
      }
    </div>
  `,
  imports: [GameCardComponent],
})
export default class HomeGamesComponent {
  gamesStore = inject(GamesStore);

  favoriteGame(game: Game) {
    this.gamesStore.addFavorite(game);
  }
}
