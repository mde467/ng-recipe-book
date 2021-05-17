
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "../shared/shared.module";
import { EditComponent } from "./edit/edit.component";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations:[
        ShoppingListComponent,
        EditComponent,
    ],
    imports:[
        ShoppingListRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class ShoppingListModule{

}