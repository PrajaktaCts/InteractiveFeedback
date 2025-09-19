import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikePiechart } from './like-piechart';

describe('LikePiechart', () => {
  let component: LikePiechart;
  let fixture: ComponentFixture<LikePiechart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikePiechart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikePiechart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
