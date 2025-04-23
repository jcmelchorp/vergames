import { Component, inject, isDevMode, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AuthService } from '../services/auth.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { of, Subscription } from 'rxjs';
import { KeyFilterModule } from 'primeng/keyfilter';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    FloatLabelModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    IconFieldModule,
    InputIconModule,
    FormsModule,
    RouterModule,
    ToastModule,
    RippleModule,
    MessageModule,
    KeyFilterModule,
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
            class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-30 sm:px-20"
            style="border-radius: 53px"
          >
            <div class="text-center mb-2">
              <svg
                fill="var(--primary-color)"
                width="50px"
                height="50px"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
                class="mb-8 w-16 shrink-0 mx-auto"
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
                Registro
              </div>
              <span
                class="text-surface-700 dark:text-surface-0 font-medium dark:font-normal text-l"
                >Si ya estás inscrito, ingresa
                <a
                  (click)="router.navigate(['/a/login'])"
                  class="no-underline text-right cursor-pointer text-primary"
                  >aquí</a
                >.
              </span>
            </div>

            <form
              [formGroup]="formGroup"
              (ngSubmit)="registerByEmail()"
              novalidate
            >
              <div class="my-4">
                <p-floatlabel variant="on">
                  <input
                    pInputText
                    type="text"
                    styleClass="w-full md:w-[30rem]"
                    [fluid]="true"
                    formControlName="email"
                    class="form-control"
                    inputId="email"
                    [ngClass]="{
                      'is-invalid': formFields['email'].errors,
                    }"
                    [pKeyFilter]="blockSpace"
                  />
                  <label for="email">Correo electrónico</label>
                </p-floatlabel>
                <div
                  *ngIf="
                    formFields['email'].errors && formFields['email'].dirty
                  "
                  class="invalid-feedback"
                >
                  <p-message
                    *ngIf="formFields['email'].errors['required']"
                    severity="error"
                    size="small"
                    variant="simple"
                    class="p-error p-inline-message p-inline-message-error"
                    >Se requiere un correo electrónico</p-message
                  >

                  <p-message
                    *ngIf="formFields['email'].errors['email']"
                    severity="error"
                    size="small"
                    variant="simple"
                    class="p-error p-inline-message p-inline-message-error"
                    >Correo electrónico no válido</p-message
                  >
                </div>
              </div>

              <div class="my-4">
                <p-floatlabel variant="on">
                  <p-password
                    formControlName="password1"
                    [toggleMask]="true"
                    styleClass="w-full"
                    [ngClass]="{
                      'is-invalid': formFields['password1'].errors,
                    }"
                    [fluid]="true"
                    [feedback]="true"
                    inputId="password1"
                    promptLabel="Choose a password"
                    weakLabel="Débil"
                    mediumLabel="Aceptable"
                    strongLabel="Seguro"
                  />
                  <label for="password1">Contraseña</label>
                </p-floatlabel>
                <div
                  *ngIf="
                    formFields['password1'].errors &&
                    formFields['password1'].dirty
                  "
                  class="invalid-feedback"
                >
                  <p-message
                    *ngIf="formFields['password1'].errors['required']"
                    severity="error"
                    size="small"
                    variant="simple"
                    class="p-error p-inline-message p-inline-message-error"
                  >
                    Se requiere una contraseña
                  </p-message>
                  <p-message
                    *ngIf="formFields['password1'].errors['minlength']"
                    severity="error"
                    size="small"
                    variant="simple"
                    class="p-error p-inline-message p-inline-message-error"
                  >
                    La contraseña debe tener al menos 6 caracteres (mayúsculas,
                    minúsculas, números y signos de puntuacion.)
                  </p-message>
                </div>
              </div>

              <div class="my-4">
                <p-floatlabel variant="on">
                  <!-- <p-iconfield>
                    <p-inputicon
                      *ngIf="
                        formGroup.get('password2')?.value ===
                          formGroup.get('password1')?.value &&
                        formGroup.get('password2')?.dirty &&
                        formGroup.get('password1')?.dirty
                      "
                      class="pi pi-check"
                    /> -->
                  <p-password
                    inputId="password2"
                    formControlName="password2"
                    [ngClass]="{
                      'is-invalid': formFields['password2'].errors,
                    }"
                    [toggleMask]="true"
                    styleClass="w-full"
                    [fluid]="true"
                    [feedback]="false"
                  ></p-password>
                  <!-- </p-iconfield> -->

                  <label for="password2">Confirma tu contraseña</label>
                </p-floatlabel>
                <div
                  *ngIf="
                    formFields['password2'].errors &&
                    formFields['password2'].dirty
                  "
                  class="invalid-feedback"
                >
                  <p-message
                    *ngIf="formGroup.get('password2')?.hasError('required')"
                    severity="error"
                    size="small"
                    variant="simple"
                    class="p-error p-inline-message p-inline-message-error"
                  >
                    Se requiere una confirmación de la contraseña
                  </p-message>
                  <p-message
                    *ngIf="formGroup.get('password2')?.hasError('minlength')"
                    severity="error"
                    size="small"
                    variant="simple"
                    class="p-error p-inline-message p-inline-message-error"
                  >
                    La confirmación de la contraseña debe tener al menos 6
                    caracteres (mayúsculas, minúsculas, números y signos de
                    puntuacion.)
                  </p-message>
                </div>
                <p-message
                  *ngIf="
                    formGroup.get('password2')?.value ===
                      formGroup.get('password1')?.value &&
                    formGroup.get('password2')?.dirty &&
                    formGroup.get('password1')?.dirty
                  "
                  icon="pi pi-check"
                  severity="success"
                  size="small"
                  class="float p-error p-inline-message p-inline-message-error"
                >
                  Contraseña confirmada
                </p-message>
              </div>

              <p-button
                [disabled]="
                  formGroup.invalid ||
                  formGroup.get('password2')?.value !==
                    formGroup.get('password1')?.value
                "
                label="Registro"
                styleClass="w-full my-4"
                raised
                type="submit"
              ></p-button>
            </form>
            <!-- <pre>{{ disabled$ | async }}</pre> -->
            <!-- <pre
              >{{ getFormValidationErrors() | async | json }}
</pre
            > -->
          </div>
        </div>
      </div>
    </div>
  `,
  providers: [MessageService],
})
export class Register implements OnDestroy {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  formGroup: FormGroup;
  blockSpace: RegExp = /[^s]/;
  subscription: Subscription;
  get formFields() {
    return this.formGroup.controls;
  }

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group(
      {
        email: [null, [Validators.required, Validators.email]],
        password1: [null, [Validators.required, Validators.minLength(6)]],
        password2: [null, [Validators.required, Validators.minLength(6)]],
      },
      { updateOn: 'blur' },
    );
    this.formGroup.get('password2')?.disable();
    this.subscription = this.formGroup.controls[
      'password1'
    ].valueChanges.subscribe(() =>
      this.formGroup.controls['password1'].invalid
        ? this.formGroup.get('password2')?.disable()
        : this.formGroup.get('password2')?.enable(),
    );
    // this.isDisabled = toSignal(this.disabled$);
  }
  ngOnDestroy(): void {
    this.subscription.closed;
    this.subscription.unsubscribe();
  }
  // checked: boolean = false;

  registerByEmail(): void {
    // this.submitted = true;

    if (this.formGroup.invalid) {
      // this.formGroup.markAllAsTouched();
      return;
    }
    let email = this.formGroup.controls['email'].value;
    let password1 = this.formGroup.controls['password1'].value;
    let password2 = this.formGroup.controls['password2'].value;
    if (password1 === password2) {
      this.authService.signup(email, password1);
      this.router.navigateByUrl('/a/verification');
    }
  }

  getFormValidationErrors() {
    if (isDevMode()) {
      const result: { key: string; errors?: {}[] }[] = [];
      Object.keys(this.formGroup.controls).forEach((key) => {
        const controlErrors = this.formGroup.get(key)!.errors;
        let errors: any[] = [];
        if (controlErrors !== null) {
          Object.keys(controlErrors!).forEach((keyError) => {
            let error = keyError;
            let value = controlErrors![keyError];
            errors.push({ error, value });
          });
          result.push({
            key,
            errors,
          });
        }
      });
      return of(result);
    } else {
      return of([]);
    }
  }
}
