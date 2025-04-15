import { Component } from '@angular/core';

@Component({
  selector: 'app-empty',
  standalone: true,
  template: ` <div class="card">
    <div class="font-semibold text-xl mb-4">Página en blanco</div>
    <p>Una invitación abierta a la creatividad.</p>
  </div>`,
})
export class Empty {}
