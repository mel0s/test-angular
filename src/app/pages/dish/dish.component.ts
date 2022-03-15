import { Component, OnInit } from '@angular/core';
import { IDish } from '../../interfaces/dish'
import { DishService } from '../../services/dish/dish.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';





@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})



export class DishComponent implements OnInit, PipeTransform {

  dishInfo: IDish;
  ingredients: any[];
  youtube: any;
  constructor(private dishService: DishService, private sanitizer: DomSanitizer) {
    this.dishInfo = {
      "idMeal": "53033",
      "strMeal": "Japanese gohan rice",
      "strDrinkAlternate": null,
      "strCategory": "Side",
      "strArea": "Japanese",
      "strInstructions": "STEP 1\r\nRinsing and soaking your rice is key to achieving the perfect texture. Measure the rice into a bowl, cover with cold water, then use your fingers to massage the grains of rice \u2013 the water will become cloudy. Drain and rinse again with fresh water. Repeat five more times until the water stays clear.\r\n\r\nSTEP 2\r\nTip the rinsed rice into a saucepan with 400ml water, or 200ml dashi and 200ml water, bring to the boil, then turn down the heat to a low simmer, cover with a tight-fitting lid with a steam hole and cook for 15 mins. Remove from the heat and leave to sit for another 15 mins, then stir through the mirin. Remove the lid and give it a good stir. Serve with any or all of the optional toppings.",
      "strMealThumb": "https:\/\/www.themealdb.com\/images\/media\/meals\/kw92t41604181871.jpg",
      "strTags": null,
      "strYoutube": "https:\/\/www.youtube.com\/watch?v=rZO86_-MIp0",
      "strIngredient1": "Sushi Rice",
      "strIngredient2": "Mirin",
      "strIngredient3": "Pickle Juice",
      "strIngredient4": "Spring Onions",
      "strIngredient5": "",
      "strIngredient6": "",
      "strIngredient7": "",
      "strIngredient8": "",
      "strIngredient9": "",
      "strIngredient10": "",
      "strIngredient11": "",
      "strIngredient12": "",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "300g",
      "strMeasure2": "1 tbs",
      "strMeasure3": "Garnish",
      "strMeasure4": "Garnish",
      "strMeasure5": " ",
      "strMeasure6": " ",
      "strMeasure7": " ",
      "strMeasure8": " ",
      "strMeasure9": " ",
      "strMeasure10": " ",
      "strMeasure11": " ",
      "strMeasure12": " ",
      "strMeasure13": " ",
      "strMeasure14": " ",
      "strMeasure15": " ",
      "strMeasure16": " ",
      "strMeasure17": " ",
      "strMeasure18": " ",
      "strMeasure19": " ",
      "strMeasure20": " ",
      "strSource": "https:\/\/www.bbcgoodfood.com\/recipes\/japanese-rice-gohan",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    };
    this.ingredients = [];
  }

  ngOnInit() {
    this.getDish();

  }


  getDish() {
    this.dishService.getDishRandom().subscribe(dish => {
      this.dishInfo = dish[0];
      this.getIngredients();
      this.transform();

    });
  }

  getIngredients() {
    for (let i = 1; i <= 20; i++) {

      let ing = this.dishInfo['strIngredient' + i];

      if (ing) {
        this.ingredients.push({
          'ingredient': this.dishInfo['strIngredient' + i],
          measure: this.dishInfo['strMeasure' + i]
        })

      }

    }
  }

  transform() {
    this.youtube = this.sanitizer.bypassSecurityTrustHtml(` <iframe width="420" height="315" src="${this.dishInfo.strYoutube}"></iframe>`);
  }

}
