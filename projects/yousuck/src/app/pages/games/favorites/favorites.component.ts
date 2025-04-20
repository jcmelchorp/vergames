import { Component, computed, inject, signal } from '@angular/core';
import { GameCardComponent } from '../components/game-card.component';
import { GamesService } from '../services/games.service';
import { GamesStore } from '../games.store';

@Component({
  selector: 'app-home',
  template: `
    <div class="w-full max-w-4xl mt-12 mx-auto px-4">
      <h1 class="text-2xl font-bold mb-4">Favorites Games!</h1>

      <div class="bg-white rounded-lg p-4 flex items-center">
        <input
          type="text"
          class="w-full border border-gray-200 rounded-lg p-2"
          placeholder="Search for a game..."
          (input)="search($any($event.target).value)"
        />
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
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
