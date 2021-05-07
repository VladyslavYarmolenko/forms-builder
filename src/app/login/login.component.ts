import { HttpService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [HttpService]
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  form: FormGroup;

  constructor(private httpService: HttpService, private router: Router) { }

  onSubmit(formData: any){
    const { email, password } = formData.value;
    this.httpService.fetchLogin(formData.value)
                .subscribe(
                    (data: any) => {
                      if (data.accessToken) {
                        localStorage.setItem('token', data.accessToken)
                        this.router.navigate(['/form-builder']);
                      }
                    },
                    error => console.log(error)
                );
  }

  ngOnInit(): void {
    const accessToken = localStorage.getItem('token');

    if (accessToken) {
      this.router.navigate(['/form-builder']);
    }
  }
}
