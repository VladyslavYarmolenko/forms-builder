import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from '../../interfaces/interfaces';


@Injectable()
export class HttpService{
   
    constructor(private http: HttpClient){ }
 
    fetchLogin(user: User){
          
        let body = {email: user.email, password: user.password};
        return this.http.post('http://localhost:3000/login', body); 
    }

    registr(user: User){
        
        let body = {email: user.email, password: user.password};
        return this.http.post('http://localhost:3000/register', body)
    }
}