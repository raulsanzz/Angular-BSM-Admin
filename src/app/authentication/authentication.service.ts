import { Injectable } from '@angular/core';
import { AuthService } from '../common/auth.service';

@Injectable()
export class AuthenticationService {
  constructor(private authService: AuthService) {}
  
  loginService(data) {
      return this.authService.postCall(`Admins/login`, data);
  }
  getBuilding(id) {
    return this.authService.getCall(`Admins/${id}/project`)
}

}
