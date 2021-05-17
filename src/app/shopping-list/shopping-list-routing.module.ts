import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";

const childRoute: Routes=[
    {
        path: '', component: ShoppingListComponent
    }
]

@NgModule({
    imports:[
       RouterModule.forChild(childRoute)
    ],
    exports: [RouterModule]
})
export class ShoppingListRoutingModule{

}
