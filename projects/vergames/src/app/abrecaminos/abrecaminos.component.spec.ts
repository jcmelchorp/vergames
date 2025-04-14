/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AbrecaminosComponent } from './abrecaminos.component';

describe('AbrecaminosComponent', () => {
  let component: AbrecaminosComponent;
  let fixture: ComponentFixture<AbrecaminosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbrecaminosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbrecaminosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
