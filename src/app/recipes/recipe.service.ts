import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import {Recipe} from "./recipe.model";
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
@Injectable()
export class RecipeService{
  constructor(private shoppingService: ShoppingListService){}
recipesChanges = new Subject<Recipe[]>();
 // new Recipe('Straberry Cake', 
    // 'Simple Straberry Cake Recipe', 
    // 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/strawberry-cake-jpg-1522267153.jpg?crop=0.928xw:0.784xh;0.0698xw,0.123xh&resize=768:*'
    // , [
    //   {
    //     name:'Straberry',
    //     amount: 5}
    // ]),
    // new Recipe('Blueberry Cake', 
    // 'Simple Blueberry Cake Recipe', 
    // 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/strawberry-cake-jpg-1522267153.jpg?crop=0.928xw:0.784xh;0.0698xw,0.123xh&resize=768:*',
    // [{
    //   name: "blueberry",
    //   amount: 10
    // }])

private recipes: Recipe[] = [];

  setRecipes(recipes: Recipe[]){
      this.recipes = recipes;
      this.recipesChanges.next(this.recipes.slice());
  }
  getRecipes(){
      return this.recipes;
  }
  getRecipe(id:number){
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe)
  {
    this.recipes.push(recipe);
    this.recipesChanges.next(this.recipes);
  }

  updateRecipe(index:number, newRecipe: Recipe){
    this.recipes[index] = newRecipe
    this.recipesChanges.next(this.recipes);
  }

addIngredientsToShoppingList(ingredients: Ingredient[]) {
  this.shoppingService.addIngredients(ingredients);
}
deleteRecipe(index:number){
  this.recipes.splice(index, 1);
  this.recipesChanges.next(this.recipes);
}
}