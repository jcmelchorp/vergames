import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrl: './profile.scss',
  template: ` <aside *ngIf="user$ | async as user" class="profile-card">
    <header>
      <!-- here’s the avatar -->
      <img
        *ngIf="user.photoURL; else nophoto"
        class="img-fluid rounded-circle d-print-none hoverZoomLink"
        alt="Usuario conectado"
        src="{{ user.photoURL }}"
      />
      <ng-template #nophoto>
        <i class="pi pi-user"></i>
      </ng-template>

      <!-- the username -->
      <h1>
        {{ user.displayName }}
      </h1>
      <h2>
        {{ user.email }}
      </h2>

      <!-- {{user|titlecase}} -->
    </header>

    <!-- bit of a bio; who are you? -->
    <div class="profile-bio">
      <p>
        Conoce las <a [routerLink]="['/policy']">políticas de privacidad </a>de
        tus datos.
      </p>
    </div>
    <!-- some social links to show off -->
    <ul class="profile-social-links">
      <li>
        <a target="_blank" href="https://www.facebook.com/creativedonut">
          <i class="fa fa-facebook"></i>
        </a>
      </li>
      <li>
        <a target="_blank" href="https://twitter.com/dropyourbass">
          <i class="fa fa-twitter"></i>
        </a>
      </li>
      <li>
        <a target="_blank" href="https://github.com/vipulsaxena">
          <i class="fa fa-github"></i>
        </a>
      </li>
      <li>
        <a target="_blank" href="https://www.behance.net/vipulsaxena">
          <i class="fa fa-behance"></i>
        </a>
      </li>
    </ul>
  </aside>`,
})
export class Profile {
  _authService: AuthService = inject(AuthService);
  user$ = this._authService.user$;
}
