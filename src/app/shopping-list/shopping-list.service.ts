import { ThrowStmt } from "@angular/compiler";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";

export class ShoppingListService{
    latestIngredients = new Subject<Ingredient[]>();
    startedEditing =new Subject<number>();
    private ingredients : Ingredient[] =[
        new Ingredient("apples", 5),
        new Ingredient("cinamon", 5)
      ]; ;

    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredient(newIngerd){
        this.ingredients.push(newIngerd);
        this.latestIngredients.next(this.ingredients.slice());
      }
  getIngredient(index: number){
  return this.ingredients[index];
  }

  updateIngredient(newIngredient: Ingredient, index: number){
    this.ingredients[index] = newIngredient;
    this.latestIngredients.next(this.ingredients.slice());
}
deleteIngredient(index:number){
  this.ingredients.splice(index,1);
  this.latestIngredients.next(this.ingredients.slice())
}
addIngredients(ingredients: Ingredient[]) {
  // for (let ingredient of ingredients) {
  //   this.addIngredient(ingredient);
  // }
  this.ingredients.push(...ingredients);
  this.latestIngredients.next(this.ingredients.slice());
}
}