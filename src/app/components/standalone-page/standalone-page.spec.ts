import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandalonePage } from './standalone-page';

describe('StandalonePage', () => {
  let component: StandalonePage;
  let fixture: ComponentFixture<StandalonePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandalonePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandalonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
