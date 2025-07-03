import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotDetailComponent } from './spot-detail.component';

describe('SpotDetailComponent', () => {
  let component: SpotDetailComponent;
  let fixture: ComponentFixture<SpotDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
