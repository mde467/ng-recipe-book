import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector:'[place-holder]'
})
export class PlaceHolderDirectivecomponent{
    constructor(public viewContainerRef : ViewContainerRef){}
}