import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
// import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';

@Injectable()
export class AuthService {
  currentUser: any = null;
  // token = localStorage.getItem('tok');
  // token1 = sessionStorage.getItem('BMs.id');

  constructor(private http: HttpClient, private router: Router) {}

  // set user data in local storage
  setUser(data) {
    this.currentUser = data;
    sessionStorage.setItem('BMs', JSON.stringify(data));
  }

  // get user data from from local storage
  getUser() {

    if (this.currentUser) {
      return this.currentUser;
    } else {
      this.currentUser = JSON.parse(sessionStorage.getItem('BMs'));
      return this.currentUser ? this.currentUser : null;
    }
  }

  // http get call
  getCall(url) {
    return this.http
      .get(`${environment.baseURL}/${url}`)
      .pipe(
        catchError(err => {
          if (err.error === 'Unauthorized') {
            this.setUser(null);
            this.router.navigate(['/auth/facilities']);
            return;
          }
          return throwError(err);
        }),
      );
  }

  // http post call
  postCall(url, data) {

    data =data || {};
    data.params = {access_token: localStorage.getItem('tok')};
    return this.http.post(`${environment.baseURL}/${url}`, data).pipe(
      catchError(err => {
        if (err.error === 'Unauthorized') {
          this.setUser(null);
          this.router.navigate(['/auth/facilities']);
          return;
        }
        return throwError(err);
      }),
    );
  }

  // http update call
  updateCall(url, data) {
    return this.http.patch(`${environment.baseURL}/${url}`, data).pipe(
      catchError(err => {
        if (err.error === 'Unauthorized') {
          this.setUser(null);
          this.router.navigate(['/auth/facilities']);
          return;
        }
        return throwError(err);
      }),
    );
  }

  // http delete call
  deleteCall(url, id) {
    return this.http.delete(`${environment.baseURL}/${url}/${id}`).pipe(
      catchError(err => {
        if (err.error === 'Unauthorized') {
          this.setUser(null);
          this.router.navigate(['/auth/facilities']);
          return;
        }
        return throwError(err);
      }),
    );
  }

  getGallery(){
    let params = {access_token: localStorage.getItem('tok')};
      return this.http.get(environment.baseURL + '/Projects/5/customFiles', {params: params}).pipe(
          catchError(err => {
              if (err.error === 'Unauthorized') {
                  this.setUser(null);
                  this.router.navigate(['/auth/facilities']);
                  return;
              }
              return throwError(err);
          }),
      );
  }

    postCall2(url, data) {

      data =data || {};
      data.params = {access_token: localStorage.getItem('tok')};
        return this.http.post(`${environment.baseURL}/${url}`, data).pipe(
            catchError(err => {
                if (err.error === 'Unauthorized') {
                    this.setUser(null);
                    this.router.navigate(['/auth/facilities']);
                    return;
                }
                return throwError(err);
            }),
        );
    }


}
