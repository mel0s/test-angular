import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILogin } from 'src/app/interfaces/login';
import { IUser } from 'src/app/interfaces/user';
import { Router } from '@angular/router'
import { BasePageComponent } from '../base-page';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BasePageComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginInfo: ILogin;
  returnUrl: String;
  users: IUser[];
  //changes: boolean = false;
  constructor(private fb: FormBuilder, httpService: HttpService, private router: Router) {
    //this.changes = false;
    super(httpService);
    this.users = [];
    this.returnUrl = 'dashboard';

  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    console.log('Init');
  }
  ngOnDestroy() {
  }

  login(form: FormGroup) {

    console.log(form.value);
    if (form.valid) {

      this.getData('assets/data/users.json', 'users').subscribe(items => {
        this.users = items;
        console.log("Encadenado xD")
      });

      console.log(this.users);
      this.loginInfo = form.value;

      localStorage.setItem('test.isLoggedIn', "true");


      // setTimeout(() => {
      //   this.router.navigate([this.returnUrl]);
      // }, 200);

    }
  }

}
