/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FouronarowComponent } from './fouronarow.component';

describe('FouronarowComponent', () => {
  let component: FouronarowComponent;
  let fixture: ComponentFixture<FouronarowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FouronarowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FouronarowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
