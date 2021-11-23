import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  
  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getUser() ? this.authService.getUser().id : null;
    const authReq = req.clone({
      setHeaders: {
        Authorization: `${token}`,
      }
    });
    return next.handle(authReq);
  }
}
