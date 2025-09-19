import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFeedback } from './header-feedback';

describe('HeaderFeedback', () => {
  let component: HeaderFeedback;
  let fixture: ComponentFixture<HeaderFeedback>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderFeedback]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderFeedback);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
