import { Component, input, output } from '@angular/core';
import { Game } from '../interfaces/game.interface';
import { GamesStore } from '../games.store';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-card',
  imports: [CommonModule, RouterLink],
  template: `
    <div
      class="bg-surface-0 dark:bg-surface-900 border border-gray-500 shadow-xs rounded-lg p-4 flex flex-col"
    >
      <div class="flex gap-x-0 items-start justify-between">
        <div>
          <p class="font-semibold text-xl">{{ game().title }}</p>
          <p class="font-normal">{{ game().author }}</p>
          <!-- <p class="font-normal">{{ game().isFavorite }}</p> -->
        </div>

        <i
          [ngClass]="game().isFavorite ? 'pi pi-heart-fill' : 'pi pi-heart'"
          [ngStyle]="{ color: game().isFavorite ? 'darkred' : 'none' }"
          (click)="clickButton()"
        >
        </i>
        <i
          [routerLink]="['/u/pages/games/', game().route]"
          class="pi pi-play"
          style="color: green"
        ></i>
      </div>
    </div>
  `,
})
export class GameCardComponent {
  game = input.required<Game>();
  onFavorite = output<Game>();

  clickButton() {
    this.onFavorite.emit(this.game());
  }
}
