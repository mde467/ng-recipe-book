import { Component, ElementRef,  OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import {Ingredient} from '../../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @ViewChild('f') slform: NgForm;
  editSubscription: Subscription;
  editMode: boolean= false;
  editedItemIndex: number;
  editedItem : Ingredient;
  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit(): void {
    this.editSubscription =this.shoppingService.startedEditing.subscribe(editItem=>{
      this.editedItemIndex = editItem;
      this.editMode = true;
      this.editedItem = this.shoppingService.getIngredient(this.editedItemIndex);
      this.slform.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
      
    })
  }
  onSubmit(form:NgForm){
    const name = form.value.name;
    const amount = form.value.amount;
    let ingredient =  new Ingredient(name,amount);
    if(this.editMode)
      this.shoppingService.updateIngredient(ingredient, this.editedItemIndex);
    else
      this.shoppingService.addIngredient(ingredient);this.slform.reset();
    this.editMode = false;
    this.slform.reset();
  }
  
  ngOnDestroy()
  {
    this.editSubscription.unsubscribe();
  }

  onClear(){
    this.slform.reset();
    this.editMode= false;
  }
  onDelete(){
    this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.slform.reset();
  }
}
