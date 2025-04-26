import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { PianoMode } from '../core/piano-mode.enum';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'play-control',
  imports: [ButtonModule],

  template: `
  <p class="font-semibold text-xl">{{ title }}</p>
  <div class="text-wrap">
     <span>Una forma sencilla y divertida para que los principiantes aprendan notación musical.</span>
  </div>
  <div class="flex flex-row justify-center items-center">
     <p-button text label="Teclado libre" icon="pi pi-sparkles" (click)="handlePlayBtnClick()"></p-button>
     <p-button text label="Práctica" icon="pi pi-question" (click)="handleQuizBtnClick()"></p-button>
  </div>
  `,
  styleUrls: ['./play-control.component.scss'],
})
export class PlayControlComponent implements OnInit {
  PianoMode = PianoMode; // allows template access to PianoMode enum
  @Input()
  title!: string;
  @Input()
  mode!: PianoMode;
  @Output() modeSelected = new EventEmitter<PianoMode>();

  constructor() {}

  ngOnInit() {}

  handlePlayBtnClick() {
    this.modeSelected.emit(PianoMode.Play);
  }

  handleQuizBtnClick() {
    this.modeSelected.emit(PianoMode.Quiz);
  }
}
