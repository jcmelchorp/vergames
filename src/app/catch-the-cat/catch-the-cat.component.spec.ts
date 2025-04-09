/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CatchTheCatComponent } from './catch-the-cat.component';

describe('CatchTheCatComponent', () => {
  let component: CatchTheCatComponent;
  let fixture: ComponentFixture<CatchTheCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatchTheCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatchTheCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
