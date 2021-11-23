import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/auth.service';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  pid = this.authService.getUser();
  projectId = this.pid['projectId'];
  token = localStorage.getItem('tok');
  Customers;
  detailsArray: any = [];
  unitInfo = {};
  unitDetailsView= false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log('pr id', this.projectId);
    this.getCustomersList();
  }

  getCustomersList() {
    const url =
      'Projects/' +
      this.projectId +
      '/customers?access_token=' +
      this.token +
      '&filter={"include":{"relation":"bookings","scope":{"where":{"projectId":' + this.projectId + '},"include":{"relation":"units","scope":{"include":["plan"]}}}}}';

    this.authService.getCall(url).subscribe(
      data => {
        console.log('here is data customer', data);
        this.Customers = data;
        this.Customers.forEach(obj => {
          obj.bookings.forEach(book => {
            this.detailsArray.push({
              userName: obj.username,
              address: obj.address,
              imageId: obj.imageid,
              phNumber: obj.number,
              occupation: obj.occupation,
              id: book.units.id,
              propertyId: book.units.propertyId,
              name: book.units.name,
              planId: book.units.plan.id,
              floor: book.units.floor,
              status: book.units.status,
              rentDocumentId: book.units.rentDocumentId,
              planAmount: book.units.plan.totalPrice
            });
          });
        });
        console.log('this is data=========', this.detailsArray);
        // this.detailsArray.push({})

      },
      error => {
        console.log('here is erroroor', error);
      },
    );
  }

  onClickDetails(value){
    console.log('unit infoooo valueeee', value);
   this.unitInfo = {
    userName: value.userName,
    address: value.address,
    imageId: value.imageId,
    phNumber: value.phNumber,
    occupation: value.occupation,
    id: value.id,
    floor: value.floor,
    propertyId: value.propertyId,
    name: value.name,
    planId:value.id,
    status: value.status,
    rentDocumentId: value.rentDocumentId,
   }
   
   this.unitDetailsView = true;
   document.getElementById('closePoppppup').click();
   console.log('unit infoooo', this.unitInfo);
  }
}
