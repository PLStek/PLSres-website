import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialNetworksComponent } from './social-networks.component';

describe('SocialNetworksComponent', () => {
  let component: SocialNetworksComponent;
  let fixture: ComponentFixture<SocialNetworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SocialNetworksComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialNetworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
