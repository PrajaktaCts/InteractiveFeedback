import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackDailog } from './feedback-dailog';

describe('FeedbackDailog', () => {
  let component: FeedbackDailog;
  let fixture: ComponentFixture<FeedbackDailog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackDailog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackDailog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
