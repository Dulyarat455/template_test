import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodType } from './food-type';

describe('FoodType', () => {
  let component: FoodType;
  let fixture: ComponentFixture<FoodType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
