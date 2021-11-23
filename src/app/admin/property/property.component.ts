import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/auth.service';
import { PropertyService } from './property.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
})
export class PropertyComponent implements OnInit {

  PropertyList: any = [];
  buildingList: any = [];
  buildingId: number;
  propertyDetails;
  propertyId: number;
  buildingInfo: any = {};
  propertyInfo: any = {};
  createPropertyView = false;
  pageLoader = true;
  viewList = true;
  editList = false;
  propertyType = false;

  constructor(private service: PropertyService, private authService: AuthService) {

  }

  ngOnInit() {

    this.getBuilding();
  }

  propertyViewList() {
    this.viewList = true;
  }

  propertyEditList() {
    this.viewList = false;
    this.editList = true;
  }

  // Get BUildings
  getBuilding() {
    this.service.getbuilding().subscribe(
      data => {
        this.buildingId = data['id'];
        this.buildingList = data;
        this.getProperties();
        const user = this.authService.getUser();
        user.buildingId = this.buildingId;
        this.authService.setUser(user);
      },
      error => {
      },
    );
  }

  // Get Properties
  getProperties() {
    this.service.getProperty(this.buildingId).subscribe(
      data => {
        this.PropertyList = data;
     
        this.PropertyList.sort(function(a, b) {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
        console.log('listttttt', this.PropertyList);
        this.pageLoader = false;
      },
      error => {
      },
    );
  }

  // Get Single property
  getSingleProperty(value) {
    this.propertyDetails = value;
    console.log('valueeeee', this.propertyDetails);
    const obj = {
      buildingId: this.buildingList.id,
      floor: this.buildingList.floor,
    };
    this.propertyDetails = Object.assign(this.propertyDetails, obj);
    this.createPropertyView = true;
  }

  // Property Create View
  goCreateView() {
    this.buildingInfo.id = this.buildingList.id;
    this.buildingInfo.floor = this.buildingList.floor;
    const obj = {
      buildingId: this.buildingList.id,
      floor: this.buildingList.floor,
    };
    this.propertyDetails = obj;
    this.createPropertyView = true;
  }

  // Property Object for property type
  getPropertyId(data) {
    this.propertyDetails = {
      propertyId: data.id,
      propertyFloor: data.floors,
      propertyName: data.name,
      planId: data.planId
    };
    this.propertyType = true;
  }
}
