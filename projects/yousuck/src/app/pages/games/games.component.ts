import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Toolbar } from 'primeng/toolbar';
import { GamesStore } from './games.store';
import { signalStore, withState } from '@ngrx/signals';

@Component({
  selector: 'app-games',
  imports: [RouterOutlet, RouterLink, Toolbar],
  template: `
    <div>
      <!-- <p-toolbar class="flex justify-center bg-gray-800 text-white p-2"> -->
      <p-toolbar styleClass="mb-6" class="flex justify-center">
        <ul class="flex gap-x-4">
          <li>
            <a routerLink="/u/pages/games">Games</a>
          </li>
          <li>
            <a routerLink="/u/pages/games/favorites">Favorites</a>
          </li>
        </ul>
      </p-toolbar>
    </div>

    <router-outlet />
  `,
})
export class Games {}
