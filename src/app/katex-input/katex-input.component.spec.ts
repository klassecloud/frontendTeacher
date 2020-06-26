import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KatexInputComponent } from './katex-input.component';

describe('KatexInputComponent', () => {
  let component: KatexInputComponent;
  let fixture: ComponentFixture<KatexInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KatexInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KatexInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
