import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
 selectedRecipe : Recipe;
  id : number;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
   

    this.route.params.subscribe(data=>{
      this.id = +data["id"];
      this.selectedRecipe = this.recipeService.getRecipe(+data["id"]);
    })
  }

  onEdit(){
      this.router.navigate(['edit'], {relativeTo: this.route});
  }


  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.selectedRecipe.ingredients);
    this.router.navigate(['/shopping-list']);
  }

  onDeleteRecipe(){
    console.log("On Delete");
      this.recipeService.deleteRecipe(this.id);
  }

}
