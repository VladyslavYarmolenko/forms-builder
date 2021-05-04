import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';



export class User{
  email: string;
  password: string;
}

@Injectable()
export class HttpService{
   
    constructor(private http: HttpClient){ }
 
    fetchLogin(user: User){
          
        const body = {email: user.email, password: user.password};
        return this.http.post('http://localhost:3000/login', body); 
    }
}