import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;


  constructor() { }
  onSubmit(formData: any){
    const { username, password } = formData.value;
    
    console.log('EVENT', username, password)

  }
 

  ngOnInit(): void {
  }

}
