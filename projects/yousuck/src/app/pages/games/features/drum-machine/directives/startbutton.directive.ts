import {
  Directive,
  ElementRef,
  EventEmitter,
  AfterViewInit,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

declare var Snap: any;
declare var mina: any;

@Directive({
  selector: '[my-start-button-pusher]',
})
export class StartButtonDirective implements AfterViewInit, OnChanges {
  @Output() value = new EventEmitter();
  private el: any;
  private s: any;
  private text: any;
  private background: any;
  private start: boolean = false;
  private checkIfSnapInit: boolean = false;
  private colors: any= { 'active-text': 'yellow', 'inactive-text': 'white' };
  constructor(private _el: ElementRef) {
    this.el = _el.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.checkIfSnapInit) {
      this.check();
    }
  }

  ngAfterViewInit() {
    this.s = Snap(this.el);
    this.background = this.s.select('rect#start_button');
    this.text = this.s.selectAll('#start_text_button>path');
    console.log(this.text);
    this.checkIfSnapInit = true;
    this.check();
    
    this.s.hover((e: any) => {
      if (this.start === true) {
        this.text.forEach((x: any) => {
          x.animate(
            { fill: this.colors['active-text'] },
             100, 
             mina.easein
          );
        });
        this.s.animate({ transform: 't0,1, s.99, .98' }, 100, mina.elastic);
      }
    });

    this.s.mouseout((e: any) => {
      if (this.start === true) {
        this.text.forEach((x: any) => {
          x.animate({ fill: this.colors['inactive-text'] }, 100, mina.easein);
        });
        this.s.animate({ transform: '' }, 100, mina.elastic);
      }
    });

    this.s.click((e: any) => {
      this.valueOut();
      this.check();
    });
  }

  check() {
    if (this.start === true) {
      this.text.forEach((x: any) => {
        x.animate({ 'fill': this.colors['active-text'] }, 100, mina.easein);
      });
      this.s.animate({ 'transform': 't0,1, s.99, .98' }, 100, mina.elastic);
    }
    if (this.start === false) {
      this.text.forEach((x: any) => {
        x.animate({ 'fill': this.colors['inactive-text'] }, 100, mina.easein);
      });
      this.s.animate({ 'transform': '' }, 100, mina.elastic);
    }
    this.start = !this.start;
  }

  valueOut() {
    this.value.emit({ value:this.start.valueOf });
  }
}
