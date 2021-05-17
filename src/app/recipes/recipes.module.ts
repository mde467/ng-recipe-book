import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { RecipeDefaultComponent } from "./recipe-default/recipe-default.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesComponent } from "./recipes.component";
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from "../shared/shared.module";
@NgModule({
    declarations:[
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeDefaultComponent,
        RecipeEditComponent,
    ],
    imports:[
        RecipesRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
    ],
   
})
export class RecipesModule{

}