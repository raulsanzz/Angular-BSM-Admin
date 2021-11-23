import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/common/auth.service';
import { PropertyComponent } from '../property/property.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  buildingName: string;
  constructor(private authService: AuthService) { 
 
  }

  ngOnInit() {
    const local = this.authService.getUser();
    this.buildingName =  local.name;
     console.log('++++++++++', this.authService.getUser());
  }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';

  }

  

}
