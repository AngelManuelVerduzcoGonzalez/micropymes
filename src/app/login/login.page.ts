// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  username: string = ""
  password: string = ""
  rememberMe: boolean = false

  constructor() {}

  onSubmit() {
  }

  register() {
    // Add your registration navigation logic here
    console.log('Navigate to registration');
  }
}