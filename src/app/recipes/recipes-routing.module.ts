import { Route } from "@angular/compiler/src/core";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeDefaultComponent } from "./recipe-default/recipe-default.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";

const childRoutes:Routes = [
    {
        path : '', component: RecipesComponent,canActivate: [AuthGuard],children:[{
            path: '',  component: RecipeDefaultComponent
        },
        {
            path: 'new', component: RecipeEditComponent
        },
        {
            path: ':id', component: RecipeDetailComponent, resolve:[RecipeResolverService]
        },
        {
            path: ':id/edit', component: RecipeEditComponent,
            resolve:[RecipeResolverService]
        }
    ]
    },
]

@NgModule({
    imports:[
       RouterModule.forChild(childRoutes)
    ],
    exports: [RouterModule]
})
export class RecipesRoutingModule{

}
