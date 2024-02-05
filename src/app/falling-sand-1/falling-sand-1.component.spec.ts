import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FallingSand1Component } from './falling-sand-1.component';

describe('FallingSand1Component', () => {
  let component: FallingSand1Component;
  let fixture: ComponentFixture<FallingSand1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FallingSand1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FallingSand1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
