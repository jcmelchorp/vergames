import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'footer-widget',
  imports: [RouterModule],
  template: `
    <div class="py-12 px-12 mx-0 mt-20 lg:mx-20">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-2">
          <a
            (click)="router.navigate(['/'], { fragment: 'home' })"
            class="flex flex-wrap items-center justify-center md:justify-start md:mb-0 mb-6 cursor-pointer"
          >
            <svg
              fill="var(--primary-color)"
              width="50px"
              height="50px"
              viewBox="0 0 30 30"
              xmlns="http://www.w3.org/2000/svg"
              class="h-14 mr-2"
            >
              <path
                d="M21.56,9.54c.25-.65,.38-1.36,.38-2.08,0-3.27-2.66-5.93-5.93-5.93s-5.94,2.66-5.94,5.93c0,.72,.13,1.43,.38,2.08-.59,.45-.95,1.15-.95,1.93,0,1.14,.78,2.08,1.83,2.36l3.94,16.06c.08,.34,.38,.57,.73,.57s.65-.24,.73-.57l3.95-16.06c1.05-.27,1.83-1.22,1.83-2.35,0-.79-.37-1.49-.95-1.93Zm-5.55-6.51c2.44,0,4.43,1.99,4.43,4.43,0,.55-.1,1.08-.29,1.57-.03,0-.06,0-.08,0H11.94s-.06,0-.08,0c-.19-.49-.29-1.02-.29-1.57,0-2.44,1.99-4.43,4.44-4.43Zm0,23.53l-3.11-12.65h6.21l-3.11,12.65Zm4.06-14.15H11.94c-.52,0-.94-.42-.94-.94,0-.41,.26-.76,.68-.9,.07-.03,.16-.04,.26-.04h8.13c.09,0,.18,.02,.3,.06,.38,.12,.64,.47,.64,.88,0,.52-.42,.94-.94,.94Z"
              />
              <circle cx="13.46" cy="6.34" r="1.39" />
              <circle cx="16" cy="4.54" r="1.39" />
              <circle cx="18.17" cy="6.55" r="1.39" />
            </svg>
            <h4
              class="font-medium text-3xl text-surface-900 dark:text-surface-0"
            >
              U&nbsp;suck
            </h4>
          </a>
        </div>

        <div class="col-span-12 md:col-span-10">
          <div class="grid grid-cols-12 gap-8 text-center md:text-left">
            <div class="col-span-12 md:col-span-3">
              <h4
                class="font-medium text-2xl leading-normal mb-6 text-surface-900 dark:text-surface-0"
              >
                Company
              </h4>
              <a
                class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100"
                >Nosotros</a
              >
              <a
                class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100"
                >News</a
              >
              <a
                class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100"
                >Investor Relations</a
              >
              <a
                class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100"
                >Careers</a
              >
              <a
                class="leading-normal text-xl block cursor-pointer text-surface-700 dark:text-surface-100"
                >Media Kit</a
              >
            </div>

            <div class="col-span-12 md:col-span-3">
              <h4
                class="font-medium text-2xl leading-normal mb-6 text-surface-900 dark:text-surface-0"
              >
                Resources
              </h4>
              <a
                class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100"
                >Get Started</a
              >
              <a
                class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100"
                >Learn</a
              >
              <a
                class="leading-normal text-xl block cursor-pointer text-surface-700 dark:text-surface-100"
                >Case Studies</a
              >
            </div>

            <div class="col-span-12 md:col-span-3">
              <h4
                class="font-medium text-2xl leading-normal mb-6 text-surface-900 dark:text-surface-0"
              >
                Community
              </h4>
              <a
                class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100"
                >Discord</a
              >
              <a
                class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100"
                >Eventos<img
                  src="https://primefaces.org/cdn/templates/sakai/landing/new-badge.svg"
                  alt="badge"
                  class="ml-2"
              /></a>
              <a
                class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100"
                >FAQ</a
              >
              <a
                class="leading-normal text-xl block cursor-pointer text-surface-700 dark:text-surface-100"
                >Blog</a
              >
            </div>

            <div class="col-span-12 md:col-span-3">
              <h4
                class="font-medium text-2xl leading-normal mb-6 text-surface-900 dark:text-surface-0"
              >
                Legal
              </h4>
              <a
                class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100"
                >Licencias de uso</a
              >
              <a
                class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100"
                >Políticas de privacidad</a
              >
              <a
                class="leading-normal text-xl block cursor-pointer text-surface-700 dark:text-surface-100"
                >Términos y condiciones</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class FooterWidget {
  constructor(public router: Router) {}
}
