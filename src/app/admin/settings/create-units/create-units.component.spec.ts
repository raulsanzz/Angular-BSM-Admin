import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUnitsComponent } from './create-units.component';

describe('CreateUnitsComponent', () => {
  let component: CreateUnitsComponent;
  let fixture: ComponentFixture<CreateUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUnitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
