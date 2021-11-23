import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    const storage = this.authService.getUser();
    if (storage && storage.token) {
      this.router.navigate(['/admin/overview']);
      return false;
    }
    return true;
  }

}
