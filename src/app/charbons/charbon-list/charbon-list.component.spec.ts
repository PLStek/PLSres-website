import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharbonListComponent } from './charbon-list.component';

describe('CharbonListComponent', () => {
  let component: CharbonListComponent;
  let fixture: ComponentFixture<CharbonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CharbonListComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharbonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
