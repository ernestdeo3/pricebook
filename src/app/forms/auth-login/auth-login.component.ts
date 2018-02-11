import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {
  email: string;
  password: string;
  loginForm: FormGroup;

  constructor(public authService: AuthService,
              private formBuilder: FormBuilder,
              private router:Router,) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
    this.authService.getUserState().subscribe(auth=>{
      if (auth){
        this.router.navigate(['main']);
      }
    });
  }

  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  login() {
    this.email = this.loginForm.get('email').value;
    this.password= this.loginForm.get('password').value;
    this.authService.login(this.email, this.password);
    this.email = this.password = '';    
  }

  logout() {
    this.authService.logout();
  }

}
