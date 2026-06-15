import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
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

    this.auth.login({
      username:'emilys',
      password:'emilyspass'
    }).subscribe({
      next: (res) => {
        this.auth.saveToken(res.accessToken);
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Invalid username or password';
      },
    });
  }
}
