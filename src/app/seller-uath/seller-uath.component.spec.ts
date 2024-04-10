import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerUathComponent } from './seller-uath.component';

describe('SellerUathComponent', () => {
  let component: SellerUathComponent;
  let fixture: ComponentFixture<SellerUathComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerUathComponent]
    });
    fixture = TestBed.createComponent(SellerUathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
