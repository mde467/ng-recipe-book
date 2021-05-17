import { Ingredient } from "../shared/ingredients.model";

export class Recipe{
  
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients : Ingredient[];
    constructor(name: string, desc: string, imagePah: string, ingredients: Ingredient[]){
     
        this.name = name;
        this.description = desc;
        this.imagePath = imagePah;
        this.ingredients=ingredients;
    }
}