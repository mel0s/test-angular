import { Component, OnInit } from '@angular/core';
import { IDish } from '../../interfaces/dish'
import { CategoryService } from '../../services/category/category.service';
import { AreaService } from '../../services/area/area.service';
import { IngredientService } from '../../services/ingredient/ingredient.service';

import { DishService } from '../../services/dish/dish.service';

import { DomSanitizer } from '@angular/platform-browser';
import { captureRejections } from 'events';


@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})



export class DishComponent implements OnInit {

  dishInfo: IDish;
  areas: any[];
  categories: any[];
  ingredients: any[];

  constructor(private dishService: DishService, private categoryService: CategoryService, private areaService: AreaService, private ingredientService: IngredientService, private sanitizer: DomSanitizer) {

    this.ingredients = [];
    this.categories = [];
    this.areas = [];



  }

  ngOnInit() {
    //this.getDish();


    this.getAreas();
    this.getCategories();
    this.getIngredients();

  }


  getDish() {
    this.dishService.getDishRandom().subscribe(dish => {
      this.dishInfo = dish[0];

    });
  }


  getAreas() {
    this.areaService.getAreas().subscribe(areas => {
      this.areas = areas;
    });
  }


  getIngredients() {
    this.ingredientService.getIngredients().subscribe(ing => {
      this.ingredients = ing;
    });
  }


  getCategories() {
    this.categoryService.geCategories().subscribe(cat => {
      //this.categories = cat;

      cat.forEach(e => {
        this.categories.push(e);
      });


      //console.log(cat);
    });
  }


}
