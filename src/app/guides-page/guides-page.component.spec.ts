import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidesPageComponent } from './guides-page.component';

describe('GuidesPageComponent', () => {
  let component: GuidesPageComponent;
  let fixture: ComponentFixture<GuidesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuidesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
