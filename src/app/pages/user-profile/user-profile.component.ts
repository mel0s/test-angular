import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http/http.service';
import { BasePageComponent } from '../base-page';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent extends BasePageComponent implements OnInit {

  userForm: FormGroup;
  returnUrl: String;
  users: IUser[];
  userInfo: IUser;

  constructor(private fb: FormBuilder, httpService: HttpService) {
    super(httpService);
    this.userInfo = {
      email: '',
      lastname: '',
      name: '',
      password: '',
      user: '',
      address: '',
      avatar: "",
      city: '',
      code: '',
      country: '',
      about: ''
    };

  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      user: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      name: [{ value: '', disabled: true }],
      lastname: [{ value: '', disabled: true }],
      address: [{ value: '', disabled: true }],
      city: [{ value: '', disabled: true }],
      country: [{ value: '', disabled: true }],
      code: [{ value: '', disabled: true }],
      about: [{ value: '', disabled: true }],
    });

    this.getData('assets/data/users.json').subscribe(items => {
      this.users = items;
      let email = localStorage.getItem('test.email')


      this.userInfo = this.users.find(u => u.email === email);

      for (let u in this.userInfo) {
        let control = this.userForm.get(u);
        if (control) {
          control.setValue(this.userInfo[u]);
        }
      }

    });

  }

}
