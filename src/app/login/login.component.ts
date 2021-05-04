import { HttpService, User } from './../services/login-service';
import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import * as Cookies from 'js-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [HttpService]
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  user: User = new User();
  receivedUser: User;
  done: boolean = false;

  constructor(private httpService: HttpService, private router: Router) { }

  onSubmit(formData: any){
    const { email, password } = formData.value;
    console.log('formData.value', formData.value)
    this.httpService.fetchLogin(formData.value)
                .subscribe(
                    (data: any) => {
                      console.log('DATA', data)
                      if (data.accessToken) {
                        Cookies.set('accessToken', data.accessToken);

                        this.router.navigate(['/form-builder']);
                      }
                      // this.receivedUser=data;
                      // this.done=true;
                    },
                    error => console.log(error)
                );

    // console.log('EVENT', email, password)

  }
 

  ngOnInit(): void {
    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
      this.router.navigate(['/form-builder']);
    }
  }

}
