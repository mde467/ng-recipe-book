import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, pipe, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User} from './auth.model';
import { environment } from '../../environments/environment';
export interface authResponseData{
    idToken	:string;
    email	:string;
    refreshToken:	string;
    expiresIn:	string;
    localId:	string;
    registered? : boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService{
    user  = new BehaviorSubject<User>(null);
    tokenExpirationTimer : any;
    constructor(private http: HttpClient, private router:Router){}
    signUp(email: string, password: string){
        return this.http.post<authResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +environment.firebaseAPIKey,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError(errorResp=>{
           return this.handleError(errorResp);
        }), tap(resData=>{
            this.handleAuthenticaltion(resData.email, resData.localId, resData.idToken, resData.expiresIn)
        }))

    }

    login(email: string, password: string){
        return this.http.post<authResponseData>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.firebaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(errorResp=>{
           return this.handleError(errorResp);
        }), tap(resData=>{
            this.handleAuthenticaltion(resData.email, resData.localId, resData.idToken, resData.expiresIn)
        }))
    }

    autoLogin(){
        const user: {
             id:string,
             email : string,
             _token: string,
             _tokenExpiration: string
        } = JSON.parse(localStorage.getItem('user'))
        if(!user){
                return;
        }else{
            const loadedUser = new User(user.id, user.email, user._token, new Date(user._tokenExpiration))
            if(loadedUser.token)
            {
                this.user.next(loadedUser);
                const expirationDate =  new Date(user._tokenExpiration).getTime() - new Date().getTime()
                this.autoLogOut(expirationDate);
            }
        }

        
    }

    autoLogOut(expirationduration: number){
       this.tokenExpirationTimer= setTimeout(()=>{
            this.logout();
        }, expirationduration)
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth'])
        localStorage.removeItem('user');
        if(this.tokenExpirationTimer){
            clearInterval(this.tokenExpirationTimer);
        }
    }
    
    private handleError(errorResp: HttpErrorResponse){
        let errorMessage = "An unknown error occurred"
        console.log(errorResp);
        if(!errorResp.error || !errorResp.error.error)
        {
            return throwError(errorMessage);
        }else{
            switch(errorResp.error.error.message){
                case 'EMAIL_EXISTS':
                        errorMessage = 'This email already exists.'
                        break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'This email not found.'
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'Invalid password'
                    break;
            }
            return throwError(errorMessage);
        }
    }

    private handleAuthenticaltion(email:string, id:string, token:string, expiresIn: string)
    {
        const expirationDate = new Date(new  Date().getTime()+ +expiresIn* 1000)
        const user = new User(id, email, token,expirationDate)
        this.user.next(user);
        this.autoLogOut(+expiresIn*1000)
        localStorage.setItem('user', JSON.stringify(user));
    }
}