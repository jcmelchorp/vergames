import { Component } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { Router, RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'topbar-widget',
  imports: [RouterModule, StyleClassModule, ButtonModule, RippleModule],
  template: `<a class="flex items-center" href="#">
      <svg
        fill="var(--primary-color)"
        width="50px"
        height="50px"
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
        class="h-12 mr-2"
      >
        <path
          d="M21.56,9.54c.25-.65,.38-1.36,.38-2.08,0-3.27-2.66-5.93-5.93-5.93s-5.94,2.66-5.94,5.93c0,.72,.13,1.43,.38,2.08-.59,.45-.95,1.15-.95,1.93,0,1.14,.78,2.08,1.83,2.36l3.94,16.06c.08,.34,.38,.57,.73,.57s.65-.24,.73-.57l3.95-16.06c1.05-.27,1.83-1.22,1.83-2.35,0-.79-.37-1.49-.95-1.93Zm-5.55-6.51c2.44,0,4.43,1.99,4.43,4.43,0,.55-.1,1.08-.29,1.57-.03,0-.06,0-.08,0H11.94s-.06,0-.08,0c-.19-.49-.29-1.02-.29-1.57,0-2.44,1.99-4.43,4.44-4.43Zm0,23.53l-3.11-12.65h6.21l-3.11,12.65Zm4.06-14.15H11.94c-.52,0-.94-.42-.94-.94,0-.41,.26-.76,.68-.9,.07-.03,.16-.04,.26-.04h8.13c.09,0,.18,.02,.3,.06,.38,.12,.64,.47,.64,.88,0,.52-.42,.94-.94,.94Z"
        />
        <circle cx="13.46" cy="6.34" r="1.39" />
        <circle cx="16" cy="4.54" r="1.39" />
        <circle cx="18.17" cy="6.55" r="1.39" />
      </svg>
      <span
        class="text-surface-900 dark:text-surface-0 font-medium text-2xl leading-normal mr-20"
        >U&nbsp;suck</span
      >
    </a>

    <a
      pButton
      [text]="true"
      severity="secondary"
      [rounded]="true"
      pRipple
      class="lg:!hidden"
      pStyleClass="@next"
      enterClass="hidden"
      leaveToClass="hidden"
      [hideOnOutsideClick]="true"
    >
      <i class="pi pi-bars !text-2xl"></i>
    </a>

    <div
      class="items-center bg-surface-0 dark:bg-surface-900 grow justify-between hidden lg:flex absolute lg:static w-full left-0 top-full px-12 lg:px-0 z-20 rounded-border"
    >
      <ul
        class="list-none p-0 m-0 flex lg:items-center select-none flex-col lg:flex-row cursor-pointer gap-8"
      >
        <li>
          <a
            (click)="router.navigate(['/'], { fragment: 'home' })"
            pRipple
            class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl"
          >
            <span>Home</span>
          </a>
        </li>
        <li>
          <a
            (click)="router.navigate(['/'], { fragment: 'features' })"
            pRipple
            class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl"
          >
            <span>Features</span>
          </a>
        </li>
        <li>
          <a
            (click)="router.navigate(['/'], { fragment: 'highlights' })"
            pRipple
            class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl"
          >
            <span>Highlights</span>
          </a>
        </li>
        <li>
          <a
            (click)="router.navigate(['/'], { fragment: 'pricing' })"
            pRipple
            class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl"
          >
            <span>Pricing</span>
          </a>
        </li>
      </ul>
      <div
        class="flex border-t lg:border-t-0 border-surface py-4 lg:py-0 mt-4 lg:mt-0 gap-2"
      >
        <button
          pButton
          pRipple
          label="Login"
          routerLink="/a/login"
          [rounded]="true"
          [text]="true"
        ></button>
        <button
          pButton
          pRipple
          label="Register"
          routerLink="/a/register"
          [rounded]="true"
        ></button>
      </div>
    </div> `,
})
export class TopbarWidget {
  constructor(public router: Router) {}
}
