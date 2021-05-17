import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature: string;
  txtName:string="";
  isHidden: boolean=true;
  logs: string[]= []

  constructor(private authService:AuthService, private logginService: LoggingService){}

  onReset(){
    this.txtName = '';
  }
  displayPara(){
    this.isHidden =  this.isHidden===true ? false: true;
    this.logs.push(new Date().toLocaleTimeString())
  }
  featurehandler(feature){
    console.log(feature);
    this.loadedFeature = feature;

  }

  ngOnInit(){
    this.authService.autoLogin();
    this.logginService .printLog("Hello from ng on init - Appcomponent");
  }
}
