import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginPayload } from '@/types/auth.types';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    NgClass
  ]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  loading = false;
  error = '';

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    const { email, password } = this.form.value;
    if (!email || !password) {
      this.error = 'All fields are required.';
      this.loading = false;
      return;
    }
    const payload: LoginPayload = { email, password };
    this.auth.login(payload).subscribe({
      next: res => {
        this.router.navigate(['/projects']);
      },
      error: err => {
        this.error = err?.error?.message || 'Login failed';
        this.loading = false;
      }
    });
  }
}
