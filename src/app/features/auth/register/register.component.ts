// src/app/features/auth/register/register.component.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RegisterPayload } from '@/types/auth.types';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    NgClass
  ]
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });


  loading = false;
  error = '';

  onSubmit() {
    if (this.form.invalid) return;
    const payload: RegisterPayload = {
      name: this.form.value.name ?? '',
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? ''
    };

    this.loading = true;
    this.error = '';
    this.auth.register(payload).subscribe({
      next: () => {
        this.router.navigate(['/project']);
      },
      error: err => {
        this.error = err?.error?.message || 'Registration failed';
        this.loading = false;
      }
    });
  }
}
