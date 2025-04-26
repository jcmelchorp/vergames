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

@Directive({ selector: '[my-instrument-button-pusher]' })
export class InstrumentSelectorDirective implements AfterViewInit, OnChanges {
  @Output() value = new EventEmitter();
  @Input('type') instrument: string = 'default';
  @Input('current') currentInstrument: string = '';
  @Input('kit') kit: string = 'default';
  @Input('current-kit') currentKit: string='';
  private el: any;
  private s: any;
  private activeIndicator: any;
  private text: any;
  private background: any;
  private colors: {'active': string, 'inactive': string, 'light-active': string, 'light-inactive': string, 'background': string, 'background-hover': string} = {
    'active': '#39B54A',
    'inactive': '#003B05',
    'light-active': 'white',
    'light-inactive': 'black',
    'background':'',
    'background-hover': 'lightgray',
  };
  private checkIfSnapInit: boolean = false;
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
    this.background = this.s.select('rect');
    this.activeIndicator = this.s.select('circle');
    this.text = this.s.selectAll('path');
    this.colors['background'] = this.background.attr('fill');
    this.checkIfSnapInit = true;
    this.check();
    this.s.hover((e: any) => {
      if (this.instrument !== this.currentInstrument) {
        this.background.animate(
          { 'fill': this.colors['background-hover'] },
          100,
          mina.easein,
        );
        this.s.animate({ 'transform': 't0,1, s.99, .98' }, 100, mina.elastic);
      }
    });

    this.s.mouseout((e: any) => {
      if (this.instrument !== this.currentInstrument) {
        this.background.animate(
          {
            'fill': this.colors['background'],
            'transform': '',
          },
          100,
          mina.easein,
        );
        this.s.animate({ 'transform': '' }, 100, mina.elastic);
      }
    });

    this.s.click((e: any) => {
      this.valueOut();
      this.check();
    });
  }

  check() {
    if (this.instrument === this.currentInstrument) {
      this.s.animate({ 'transform': 't0,1.2, s.98, .97' }, 100, mina.elastic);
      this.activeIndicator.animate(
        { 'fill': this.colors['active'] },
        100,
        mina.easein,
      );
      this.text.forEach((elem: any) => {
        elem.animate({ 'fill': this.colors['light-active'] }, 100, mina.easein);
      });
    } else {
      this.activeIndicator.attr({ 'fill': this.colors['inactive'] });
      this.text.forEach((elem: any) => {
        elem.attr({ 'fill': this.colors['light-inactive'] });
      });
      this.s.animate({ 'transform': '' }, 100, mina.elastic);
    }
  }

  valueOut() {
    this.value.emit({ 'value': this.instrument });
  }
}
