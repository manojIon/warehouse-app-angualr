import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopinventoryComponent } from './shopinventory.component';

describe('ShopinventoryComponent', () => {
  let component: ShopinventoryComponent;
  let fixture: ComponentFixture<ShopinventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopinventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopinventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
