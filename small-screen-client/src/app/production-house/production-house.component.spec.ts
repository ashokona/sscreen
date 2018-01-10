import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionHouseComponent } from './production-house.component';

describe('ProductionHouseComponent', () => {
  let component: ProductionHouseComponent;
  let fixture: ComponentFixture<ProductionHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
