import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopdashboardComponent } from './shopdashboard.component';

describe('ShopdashboardComponent', () => {
  let component: ShopdashboardComponent;
  let fixture: ComponentFixture<ShopdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
