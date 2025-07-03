import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotFormComponent } from './spot-form.component';

describe('SpotFormComponent', () => {
  let component: SpotFormComponent;
  let fixture: ComponentFixture<SpotFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
