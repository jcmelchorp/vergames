import { Component, OnInit } from '@angular/core';
import { TimerComponent } from './timer/timer.component';
import { QuestionsComponent } from './questions/questions.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [NgIf, TimerComponent, QuestionsComponent],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  isQuizToBeStarted: boolean = false;
  onStart() {
    this.isQuizToBeStarted = !this.isQuizToBeStarted;
  }
  constructor() {}

  ngOnInit() {}
}
