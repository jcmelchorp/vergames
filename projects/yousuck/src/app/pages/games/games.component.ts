import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Toolbar } from 'primeng/toolbar';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [RouterOutlet, RouterLink, Toolbar],
  template: `
    <div>
      <!-- <p-toolbar class="flex justify-center bg-gray-800 text-white p-2"> -->
      <p-toolbar styleClass="mb-6" class="flex justify-center">
        <ul class="flex gap-x-4">
          <li>
            <a [routerLink]="['/pages/games']">Games</a>
          </li>
          <li>
            <a [routerLink]="['/pages/games/favorites']">Favorites</a>
          </li>
        </ul>
      </p-toolbar>
    </div>

    <router-outlet />
  `,
})
export class Games {
  title = 'games2play';
}
