import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../common/auth.service';
import { AuthenticationService } from '../authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  btnLoader = false;
  loginList: any = [];
  tok;
  buldingList: any = [];
  domain: any;
  url: any;
  emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  constructor(private router: Router, private service: AuthenticationService,
    private authservice: AuthService, private fb: FormBuilder,
    private toastrService: ToastrService) {
    // this.domain = window.location.href.split('/');
    //  this.url = 'www';
    //  this.domain = window.location.hostname;
    this.domain = 'webtesting';
     this.domain = this.domain.split('.');
     if(this.domain[0] === 'www'){
       this.domain.shift();
     }
     this.domain = this.domain.join('.');
    
    console.log('url', this.domain);
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.pattern(this.emailRegex),
          Validators.required,
        ])
      ],
      password: [
        '', Validators.required
      ],
      subdomain:[this.domain]
    });
  }

  // Login functionality
  saveData(value, valid) {
    if (value && valid) {
      this.btnLoader = true;
      this.service.loginService(value)
        .subscribe(
          data => {
            //this.btnLoader = false;
            this.getBuilding(data);
            console.log('get token here ' , data);
            localStorage.setItem('tok' , data['id']);
            this.tok = localStorage.getItem('tok');
            console.log( 'token' , this.tok);
          },
          error => {
            this.btnLoader = false;
            this.toastrService.error('Email and Password', 'Invaild', {
              timeOut: 4000
            });
          }
        );
    }
    else {
      Object.keys(this.loginForm.controls).map((controlName) => {
        this.loginForm.get(controlName).markAsTouched({ onlySelf: true });
      });
    }
  }

  // Fetching buildings
  getBuilding(domain) {
    //this.btnLoader = true;
    this.service.getBuilding(domain['userId']).subscribe(
      val => {
        this.btnLoader = false;
        this.buldingList = val;
        domain['projectId'] = val['id'];
        domain['name'] = val['name'];
        this.authservice.setUser(domain);
        this.router.navigate(['/admin/property']);
      },
      error => {
        this.btnLoader = false;
      }
    );
  }
}
