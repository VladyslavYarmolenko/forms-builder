import { HttpService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [HttpService]
})

export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(private httpService: HttpService, private router: Router) { }

  onSubmit(formData: any){
    const { email, password } = formData.value;
    this.httpService.registr(formData.value)
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
  ngOnInit()  {
  }
}
