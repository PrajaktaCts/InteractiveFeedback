import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackPlan } from './feedback-plan';

describe('FeedbackPlan', () => {
  let component: FeedbackPlan;
  let fixture: ComponentFixture<FeedbackPlan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackPlan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackPlan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
