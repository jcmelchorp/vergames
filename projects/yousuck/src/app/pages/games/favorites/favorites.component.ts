import { Component, computed, inject, signal } from '@angular/core';
import { GameCardComponent } from '../components/game-card.component';
import { GamesService } from '../services/games.service';
import { GamesStore } from '../games.store';

@Component({
  selector: 'app-home',
  template: `
    <div class="w-full max-w-8xl mt-4 mx-auto px-4">
      <h1 class="text-2xl font-bold mb-2">
        Favorites Games!
        <input
          type="text"
          class="border border-gray-200 rounded-lg p-2 text-lg"
          placeholder="Search for a game..."
          (input)="search($any($event.target).value)"
        />
      </h1>

      <!-- <div class="p-2 flex items-center"> -->

      <!-- </div> -->

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-2 mt-2"
      >
        @for (game of gamesStore.gamesToShow(); track game.id) {
          <app-game-card [game]="game" />
        }
      </div>
    </div>
  `,
  imports: [GameCardComponent],
})
export default class FavoritesComponent {
  gamesStore = inject(GamesStore);

  search(value: string) {
    this.gamesStore.setQuery(value);
  }
}
