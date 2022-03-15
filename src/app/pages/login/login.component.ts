import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILogin } from 'src/app/interfaces/login';
import { IUser } from 'src/app/interfaces/user';
import { Router } from '@angular/router'
import { BasePageComponent } from '../base-page';
import { HttpService } from '../../services/http/http.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../app/services/auth/auth.service';

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
  constructor(private fb: FormBuilder, httpService: HttpService, private router: Router, private toastr: ToastrService, private authService: AuthService) {
    //this.changes = false;
    super(httpService);
    this.users = [];
    this.returnUrl = 'dashboard';

  }

  ngOnInit() {
    this.initForm();
    this.authService.logout();
  }

  initForm() {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  ngOnDestroy() {
  }

  login(form: FormGroup) {

    if (form.valid) {
      this.loginInfo = form.value;

      this.getData('assets/data/users.json').subscribe(items => {
        this.users = items;
        let user = this.users.find(u => u.user === this.loginInfo.user && u.password == this.loginInfo.password)

        if (user) {
          localStorage.setItem('test.isLoggedIn', "true");
          localStorage.setItem('test.email', user.email);
          setTimeout(() => {
            this.router.navigate([this.returnUrl]);
          }, 200);
        }
        else {
          this.toastr.error('Credenciales incorrectas!', 'El usuario y la contraseña no coinciden!');
        }
      });

    }
  }

}
