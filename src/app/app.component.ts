import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '@/shared/sidebar/sidebar.component';
import { AuthService } from '@/features/auth/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterModule, SidebarComponent, CommonModule]
})
export class AppComponent {
  auth = inject(AuthService);
  isLoggedIn$ = this.auth.isLoggedIn$;
}