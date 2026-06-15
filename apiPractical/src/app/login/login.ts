import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{
  errorMessage = '';
  loading = false;

  loginForm;

  constructor(
    private auth: Auth,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.nonNullable.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {
  this.auth.logout();
}

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const loginData =this.loginForm.getRawValue();
    if(!this.auth.isRegisteredUser(loginData.username, loginData.password)){
     this.loading = false;
     this.errorMessage = ' No user found Please Register ' 
     return
    }

    this.auth.saveToken('local-token');
    this.auth.saveCurrentUser(loginData.username);
    this.loading = false;
    this.router.navigate(['/dashboard'], { replaceUrl: true });
    
  }
}
