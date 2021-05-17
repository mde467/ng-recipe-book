import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';

import { WarningComponent } from './warning/warning.component';
import { HeaderComponent} from './header/header.component';

import { CockpitComponent } from './cockpit/cockpit.component'
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule} from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';

import { AuthInterceptor } from './auth/auth-inerceptor.service';
import { RecipesModule} from './recipes/recipes.module';
import { ShoppingListModule} from './shopping-list/shopping-list.module'
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import {AuthModule} from './auth/auth.module'
@NgModule({ 
  declarations: [
    AppComponent,
    WarningComponent,
    HeaderComponent,
    CockpitComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
