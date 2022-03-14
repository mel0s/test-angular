import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILogin } from 'src/app/interfaces/login';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginInfo: ILogin;
  //changes: boolean = false;
  constructor(private fb: FormBuilder, private router: Router) {
    //this.changes = false;
    this.initForm();
  }

  ngOnInit() { }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  ngOnDestroy() {
  }

  login(form: FormGroup) {



    //   if (form.valid) {
    //     this.loginInfo = form.value;
    //     // this.accesoService.login(this.loginInfo, d => {
    //     //   localStorage.setItem('isLoggedIn', "true");
    //     //   localStorage.setItem('token', this.f.email.value);
    //     //   localStorage.setItem('avatar', d.avatar);
    //     //   localStorage.setItem('id', d.id);
    //     //   localStorage.setItem('token-cosentyx', d.access_token);

    //     //   this.accesoService.getUser(d.id).then((d: any) => {
    //     //     localStorage.setItem('avatar', d.data.avatar);
    //     //   });


    //     //   setTimeout(() => {
    //     //     this.router.navigate([this.returnUrl]);
    //     //   }, 200);

    //     // }, e => {
    //     //   this.changes = false;
    //     // });



    //   }
  }

}
