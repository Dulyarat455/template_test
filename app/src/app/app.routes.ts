import { Routes } from '@angular/router';
import { SignIn } from './sign-in/sign-in';
import { FoodType } from './food-type/food-type';
import { FoodSize } from './food-size/food-size';
import { Taste } from './taste/taste';
import { Food } from './food/food';
import { Sale } from './sale/sale';

export const routes: Routes = [
    {
        path: '',
        component : SignIn,
    },
    {
        path: 'foodType',
        component:  FoodType,
    }, 
    {
        path: 'foodSize',
        component:  FoodSize,
    }, 
    {
        path: 'taste',
        component: Taste
    },
    {
        path: 'food',
        component:Food,
    },
    {
        path: 'sale',
        component: Sale,
    }
];
