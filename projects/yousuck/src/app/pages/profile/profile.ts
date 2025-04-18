import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/models/user.model';
import { Observable } from 'rxjs';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, OverlayBadgeModule, AvatarModule],
  // styleUrl: './profile.scss',
  template: ` <aside *ngIf="user() as user">
    <header>
      <!-- here’s the avatar -->
      <div class="card">
        <div class="flex flex-row justify-around">
          <p-overlaybadge
            value="{{ user.isVerified ? 'Verified' : 'Unverified' }}"
            [severity]="user.isVerified ? 'success' : 'danger'"
            class="inline-flex"
          >
            <p-avatar
              *ngIf="user.photoURL; else nophoto"
              class="img-fluid rounded-circle"
              [image]="user.photoURL"
              size="xlarge"
              shape="circle"
            ></p-avatar>
          </p-overlaybadge>
          <p-avatar
            *ngIf="user.avatarURL; else nophoto"
            class="img-fluid rounded-circle"
            [image]="user.avatarURL"
            size="xlarge"
            shape="circle"
          ></p-avatar>
          <ng-template #nophoto>
            <p-avatar label="U" size="xlarge" shape="circle"></p-avatar>
          </ng-template>
        </div>

        <!-- the username -->
        <h1>
          {{ user.displayName }}
        </h1>
        <h5>
          {{ user.username }}
        </h5>
        <h2>
          {{ user.email }}
        </h2>
      </div>
    </header>
  </aside>`,
})
export class Profile {
  authService: AuthService = inject(AuthService);
  user = this.authService.userAuthProfile;
}
