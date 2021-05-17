import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients:Ingredient[];
  private chngsubscription: Subscription
  constructor(private shoppingService: ShoppingListService, private logginService: LoggingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.chngsubscription  = this.shoppingService.latestIngredients.subscribe((list)=>{
      this.ingredients = list;
    })
    this.logginService .printLog("Hello from ng on init - ShoppingListComponent");
  }
 
  ngOnDestroy(): void{
    this.chngsubscription.unsubscribe();
  }
  onEditItem(index:number){
    this.shoppingService.startedEditing.next(index);
  }
}
