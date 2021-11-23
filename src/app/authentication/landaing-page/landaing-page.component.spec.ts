import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandaingPageComponent } from './landaing-page.component';

describe('LandaingPageComponent', () => {
  let component: LandaingPageComponent;
  let fixture: ComponentFixture<LandaingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandaingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandaingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
