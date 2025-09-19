import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFeedbackDialog } from './project-feedback-dialog';

describe('ProjectFeedbackDialog', () => {
  let component: ProjectFeedbackDialog;
  let fixture: ComponentFixture<ProjectFeedbackDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectFeedbackDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectFeedbackDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
