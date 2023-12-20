import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCharbonActionneurComponent } from './edit-charbon-actionneur.component';

describe('EditCharbonActionneurComponent', () => {
  let component: EditCharbonActionneurComponent;
  let fixture: ComponentFixture<EditCharbonActionneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCharbonActionneurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCharbonActionneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
