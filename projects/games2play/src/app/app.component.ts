import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <header>
      <nav class="flex justify-center bg-gray-800 text-white p-4">
        <ul class="flex gap-x-4">
          <li>
            <a [routerLink]="['/']">Home</a>
          </li>
          <li>
            <a [routerLink]="['/favorites']">Favorites</a>
          </li>
        </ul>
      </nav>
    </header>

    <router-outlet />
  `,
})
export class AppComponent {
  title = 'games2play';
}
