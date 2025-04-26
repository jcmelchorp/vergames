import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';

declare global {
  interface Window {
    CatchTheCatGame: any;
  }
}

@Component({
  selector: 'app-catch-the-cat',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <div class="flex flex-col items-center justify-center">
      <h1 class="font-bold text-3xl">Catch the cat</h1>
      <p class="font-semibold text-lg">Play 'till you get sick.</p>
      <p-button
        raised
        size="large"
        label="Inicio"
        icon="pi pi-play"
        type="button"
        onclick="start()"
      >
      </p-button>
      <!-- <button mat-raised-button color="accent">Instructions</button> -->

      <div class="catch-the-cat" id="catch-the-cat"></div>
    </div>
  `,
})
export class CatchTheCatComponent implements OnInit {
  public blocked: boolean;
  constructor() {
    this.blocked = false;
    const script = document.createElement('script') as HTMLScriptElement;
    script.type = 'text/javascript';
    script.src = 'catch-the-cat/catch-the-cat.js';
    script.async = true;

    document.getElementsByTagName('head')[0].appendChild(script);

    const config = document.createElement('script') as HTMLScriptElement;
    config.type = 'text/javascript';
    config.text = `
    function start() {
    window.CatchTheCatGame = new CatchTheCatGame({
      w: 20,
      h: 15,
      r: 12,
      backgroundColor: 0xfafafaff,
      parent: 'catch-the-cat',
      statusBarAlign: 'center',
      credit: '2025 © Pete Sahatt',
    });
  }
    `;

    document.getElementsByTagName('head')[0].appendChild(config);
  }

  ngOnInit() {}
}
