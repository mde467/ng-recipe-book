import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptor } from "./auth/auth-inerceptor.service";
import { LoggingService } from "./logging.service";
import { RecipeService } from "./recipes/recipe.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";

@NgModule({
    providers: [
        ShoppingListService, 
        RecipeService, 
        {
          provide: HTTP_INTERCEPTORS, 
          useClass: AuthInterceptor, 
          multi:true
        },
        LoggingService
    ],
})
export class CoreModule{

}