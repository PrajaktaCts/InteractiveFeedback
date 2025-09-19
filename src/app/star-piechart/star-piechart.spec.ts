import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarPiechart } from './star-piechart';

describe('StarPiechart', () => {
  let component: StarPiechart;
  let fixture: ComponentFixture<StarPiechart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarPiechart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarPiechart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
