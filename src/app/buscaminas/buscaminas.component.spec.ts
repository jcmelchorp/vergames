/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BuscaminasComponent } from './buscaminas.component';

describe('BuscaminasComponent', () => {
  let component: BuscaminasComponent;
  let fixture: ComponentFixture<BuscaminasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscaminasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaminasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
