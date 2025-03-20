import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagerequirementComponent } from './languagerequirement.component';

describe('LanguagerequirementComponent', () => {
  let component: LanguagerequirementComponent;
  let fixture: ComponentFixture<LanguagerequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguagerequirementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguagerequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
