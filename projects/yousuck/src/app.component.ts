import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './app/pages/shell/shell';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ShellComponent],
  template: `<prmsc-shell></prmsc-shell> <router-outlet></router-outlet>`,
})
export class AppComponent {}
