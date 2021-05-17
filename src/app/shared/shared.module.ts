import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from './alert/alert.component';
import { DropDownDirective } from "./dropdown-directive";
import { LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import { PlaceHolderDirectivecomponent} from './placeholder-directive/placeholder-directive.compoents'
@NgModule({
    imports:[
        CommonModule
    ],
    declarations:[
        AlertComponent,
        DropDownDirective,
        LoadingSpinnerComponent,
        PlaceHolderDirectivecomponent
    ],
    exports:[
        AlertComponent,
        DropDownDirective,
        LoadingSpinnerComponent,
        PlaceHolderDirectivecomponent,
        CommonModule
    ]
})
export class SharedModule{

}