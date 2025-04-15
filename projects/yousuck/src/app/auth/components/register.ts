import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    RouterModule,
    RippleModule,
    AppFloatingConfigurator,
  ],
  template: `
    <app-floating-configurator />
    <div
      class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden"
    >
      <div class="flex flex-col items-center justify-center">
        <div
          style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)"
        >
          <div
            class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20"
            style="border-radius: 53px"
          >
            <div class="text-center mb-8">
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
              <div
                class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4"
              >
                Bienvenido
              </div>
              <span class="text-muted-color font-medium"
                >Registrate para continuar</span
              >
            </div>

            <div>
              <label
                for="email1"
                class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2"
                >Email</label
              >
              <input
                pInputText
                id="email1"
                type="text"
                placeholder="Email address"
                class="w-full md:w-[30rem] mb-8"
                [(ngModel)]="email"
              />

              <label
                for="password1"
                class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"
                >Password</label
              >
              <p-password
                id="password1"
                [(ngModel)]="password"
                placeholder="Password"
                [toggleMask]="true"
                styleClass="mb-4"
                [fluid]="true"
                [feedback]="false"
              ></p-password>

              <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                <div class="flex items-center">
                  <p-checkbox
                    [(ngModel)]="checked"
                    id="rememberme1"
                    binary
                    class="mr-2"
                  ></p-checkbox>
                  <label for="rememberme1">Remember me</label>
                </div>
                <span
                  class="font-medium no-underline ml-2 text-right cursor-pointer text-primary"
                  >Forgot password?</span
                >
              </div>
              <p-button
                label="Registro"
                styleClass="w-full"
                routerLink="/"
              ></p-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Register {
  email: string = '';

  password: string = '';

  checked: boolean = false;
}
