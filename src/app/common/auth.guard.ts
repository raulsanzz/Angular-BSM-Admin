import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    const storage = this.authService.getUser();
    if (!storage) {
      this.router.navigate(['auth/login']);
      return false;
    }
    return true;
  }

}
