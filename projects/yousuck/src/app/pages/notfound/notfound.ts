import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [RouterModule, AppFloatingConfigurator, ButtonModule],
  template: ` <app-floating-configurator />
    <div class="flex items-center justify-center min-h-screen overflow-hidden">
      <div class="flex flex-col items-center justify-center">
        <svg
          fill="var(--primary-color)"
          width="50px"
          height="50px"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          data-name="Layer 1"
        >
          <path
            d="M21.56,9.54c.25-.65,.38-1.36,.38-2.08,0-3.27-2.66-5.93-5.93-5.93s-5.94,2.66-5.94,5.93c0,.72,.13,1.43,.38,2.08-.59,.45-.95,1.15-.95,1.93,0,1.14,.78,2.08,1.83,2.36l3.94,16.06c.08,.34,.38,.57,.73,.57s.65-.24,.73-.57l3.95-16.06c1.05-.27,1.83-1.22,1.83-2.35,0-.79-.37-1.49-.95-1.93Zm-5.55-6.51c2.44,0,4.43,1.99,4.43,4.43,0,.55-.1,1.08-.29,1.57-.03,0-.06,0-.08,0H11.94s-.06,0-.08,0c-.19-.49-.29-1.02-.29-1.57,0-2.44,1.99-4.43,4.44-4.43Zm0,23.53l-3.11-12.65h6.21l-3.11,12.65Zm4.06-14.15H11.94c-.52,0-.94-.42-.94-.94,0-.41,.26-.76,.68-.9,.07-.03,.16-.04,.26-.04h8.13c.09,0,.18,.02,.3,.06,.38,.12,.64,.47,.64,.88,0,.52-.42,.94-.94,.94Z"
          />
          <circle cx="13.46" cy="6.34" r="1.39" />
          <circle cx="16" cy="4.54" r="1.39" />
          <circle cx="18.17" cy="6.55" r="1.39" />
        </svg>
        <div
          style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, color-mix(in srgb, var(--primary-color), transparent 60%) 10%, var(--surface-ground) 30%)"
        >
          <div
            class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 flex flex-col items-center"
            style="border-radius: 53px"
          >
            <span class="text-primary font-bold text-3xl">404</span>
            <h1
              class="text-surface-900 dark:text-surface-0 font-bold text-3xl lg:text-5xl mb-2"
            >
              No encontrado
            </h1>
            <div class="text-surface-600 dark:text-surface-200 mb-8">
              No encontramos lo que buscas.
            </div>
            <a
              routerLink="/"
              class="w-full flex items-center py-8 border-surface-300 dark:border-surface-500 border-b"
            >
              <span
                class="flex justify-center items-center border-2 border-primary text-primary rounded-border"
                style="height: 3.5rem; width: 3.5rem"
              >
                <i class="pi pi-fw pi-table !text-2xl"></i>
              </span>
              <span class="ml-6 flex flex-col">
                <span
                  class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0 block"
                  >Preguntas frecuentes</span
                >
                <span class="text-surface-600 dark:text-surface-200 lg:text-xl"
                  >Ultricies mi quis hendrerit dolor.</span
                >
              </span>
            </a>
            <a
              routerLink="/"
              class="w-full flex items-center py-8 border-surface-300 dark:border-surface-500 border-b"
            >
              <span
                class="flex justify-center items-center border-2 border-primary text-primary rounded-border"
                style="height: 3.5rem; width: 3.5rem"
              >
                <i class="pi pi-fw pi-question-circle !text-2xl"></i>
              </span>
              <span class="ml-6 flex flex-col">
                <span
                  class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0"
                  >Centro de soluciones</span
                >
                <span class="text-surface-600 dark:text-surface-200 lg:text-xl"
                  >Phasellus faucibus scelerisque eleifend.</span
                >
              </span>
            </a>
            <a
              routerLink="/"
              class="w-full flex items-center mb-8 py-8 border-surface-300 dark:border-surface-500 border-b"
            >
              <span
                class="flex justify-center items-center border-2 border-primary text-primary rounded-border"
                style="height: 3.5rem; width: 3.5rem"
              >
                <i class="pi pi-fw pi-unlock !text-2xl"></i>
              </span>
              <span class="ml-6 flex flex-col">
                <span
                  class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0"
                  >Permission Manager</span
                >
                <span class="text-surface-600 dark:text-surface-200 lg:text-xl"
                  >Accumsan in nisl nisi scelerisque</span
                >
              </span>
            </a>
            <j-button label="Go to Dashboard" routerLink="/u/" />
          </div>
        </div>
      </div>
    </div>`,
})
export class Notfound {}
