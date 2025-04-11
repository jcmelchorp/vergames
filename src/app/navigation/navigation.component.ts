import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, DOCUMENT, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ThemeService } from '../services/theme.service';
import { MatTooltipHarness } from '@angular/material/tooltip/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgIf,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  // private document = inject(DOCUMENT);
  private layoutService: LayoutService = inject(LayoutService);
  private themeService: ThemeService = inject(ThemeService);
  isDarkTheme$: Observable<boolean> = this.themeService.isThemeDark;
  isHandset$: Observable<boolean> = this.layoutService.isHandset$;

  menus: any[] = [
    {
      route: 'target',
      title: 'Tiro al blanco',
    },
    {
      route: 'stack',
      title: 'Apilador',
    },
    {
      route: 'fouronarow',
      title: '4 en línea',
    },
    {
      route: 'ppt',
      title: 'Piedra, papel o tijeras',
    },
    {
      route: 'tictactoe',
      title: 'Juego del Gato',
    },
    {
      route: 'ahorcado',
      title: 'Ahorcado',
    },
    {
      route: 'mine',
      title: 'Buscaminas',
    },
    {
      route: 'catch-the-cat',
      title: 'Atrapando al gato',
    },
    {
      route: 'tetris',
      title: 'Tetris',
    },
  ];

  loginByGoogle() {
    // Implement Google login logic here
    console.log('Login with Google');
  }

  onThemeChange() {
    // console.log(isDarkTheme)
    this.themeService.toggleDarkTheme();
    // this.document.body.classList.toggle('dark');
  }

  constructor() {}
}
