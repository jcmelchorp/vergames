import { Observable, Subject, Subscription, timer } from 'rxjs';

export class Timer {
  private timeElapsed = 0;
  private timer?: Observable<number>;
  private subscription?: Subscription;

  private readonly step: number;

  update = new Subject<number>();

  constructor(step: number) {
    this.timeElapsed = 0;
    this.step = step;
  }

  private unsubscribe(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
    if (this.timer) {
      this.timer = undefined;
    }
  }

  start(): void {
    this.timer = timer(this.step, this.step);
    this.subscription = this.timer.subscribe(() => {
      this.timeElapsed = this.timeElapsed + this.step;
      this.update.next(this.timeElapsed);
    });
  }

  pause(): void {
    if (this.timer) {
      this.unsubscribe();
    } else {
      this.start();
    }
  }

  isPaused(): boolean {
    return this.timer === null;
  }

  stop(): void {
    if (this.timer) {
      this.unsubscribe();
    }
  }
}
