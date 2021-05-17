import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { Form, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthService } from "./auth.service";
import { authResponseData }  from './auth.service';
import {AlertComponent} from "../shared/alert/alert.component"
import { PlaceHolderDirectivecomponent } from "../shared/placeholder-directive/placeholder-directive.compoents";
@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls:['./auth.component.css']
})
export class AuthComponent implements OnDestroy{
    isLoginMode= true;
    isLoading =false;
    error: string= null;

    authObs: Observable<authResponseData>
    alertClose :Subscription;
    @ViewChild(PlaceHolderDirectivecomponent) alertHost: PlaceHolderDirectivecomponent;

    constructor(private authService:AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver){}
  

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm){
        if(!form.valid){
            return;
        }

        const email=  form.value.email;
        const password=  form.value.password;
        this.isLoading = true;
        
        if(!this.isLoginMode){
            this.authObs = this.authService.signUp(email,password);
        }else{
            this.authObs = this.authService.login(email,password);
        }

        this.authObs.subscribe(respData=>{
            console.log(respData);
            this.isLoading = false
            this.router.navigate(['/recipes'])
        },errorMessage=>{
            console.log(errorMessage);
            this.isLoading = false;
            this.showErrorAlert(errorMessage)
            this.error = errorMessage;
        });

        form.reset();
    }
    ngOnDestroy(){
        if( this.alertClose)
        {
            this.alertClose.unsubscribe();
        }
    }
    private showErrorAlert(message:string){
        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const _viewcontainerRef = this.alertHost.viewContainerRef;
        _viewcontainerRef.clear();
        const compoenentRef =_viewcontainerRef.createComponent(alertComponentFactory);
        compoenentRef.instance.message=message;
        this.alertClose = compoenentRef.instance.close.subscribe(()=>{
            this.alertClose.unsubscribe();
            _viewcontainerRef.clear()
        })
       
    }
}