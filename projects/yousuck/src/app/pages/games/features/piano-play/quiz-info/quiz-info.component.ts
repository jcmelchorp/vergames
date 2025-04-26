import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { PianoNote } from '../core/piano-note';
import { QuizService } from '../core/quiz.service';
import { QuizStatus } from '../core/quiz-status.enum';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'quiz-info',
  imports: [CommonModule,FormsModule,ButtonModule,SelectButtonModule],

  templateUrl: './quiz-info.component.html',
  styleUrls: ['./quiz-info.component.scss'],
})
export class QuizInfoComponent implements OnInit {
  QuizStatus = QuizStatus; // allows template access to QuizStatus enum
  @Input()
  correct!: number;
  @Input()
  incorrect!: number;
  @Input()
  total!: number;
  @Input()
  status!: QuizStatus;
  @Input()
  description!: string;
  @Output() buttonClicked = new EventEmitter();
  subscription: Subscription;
  message!: string;

  selectButtonValue: any = null;

  selectButtonValues: any = [
    { name: 'Fácil', value:'easy' },
    { name: 'Intermedio', value:'medium' },
    { name: 'Avanzado', value:'hard' },
  ];

  constructor(private quizService: QuizService) {
    this.subscription = quizService.quizResult$.subscribe((result) => {
      if (result.selectedKeyId == result.actualNote.keyId) {
        this.message = '\u2714 Correcto!';
      } else {
        this.message = '\u2718 Incorrecto';
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  handleStartBtnClick(value: string) {
    this.buttonClicked.emit({ button: 'start', level: value });
  }

  handleTryAgainBtnClick() {
    this.buttonClicked.emit({ button: 'try-again' });
    this.message = '';
  }
}
