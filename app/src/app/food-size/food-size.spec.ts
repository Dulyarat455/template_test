import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodSize } from './food-size';

describe('FoodSize', () => {
  let component: FoodSize;
  let fixture: ComponentFixture<FoodSize>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodSize]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodSize);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
