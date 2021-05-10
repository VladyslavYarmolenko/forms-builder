import { LoginAction } from './../store-auth/store-auth.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private store: Store, private router: Router) { }

  onSubmit(formData: any){
    this.store.dispatch(new LoginAction(formData.value))
  }
  
  ngOnInit(): void {}

  redirectToRegister(){
    this.router.navigate(['/register']);
  }
}
