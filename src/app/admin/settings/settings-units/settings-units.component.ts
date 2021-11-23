import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-settings-units',
  templateUrl: './settings-units.component.html',
  styleUrls: ['./settings-units.component.scss']
})
export class SettingsUnitsComponent implements OnInit {
  viewCreate = false;
  unitList: any= [];
  unitDetails;
  deleteId: number;
  unitId: number;

  constructor(private service: SettingsService) { }

  ngOnInit() {
    this.getUnits();
  }



  getUnits(){
    this.service.getunits().subscribe
    (
      data =>{
        this.unitList = data;
        this.unitId = this.unitList['id'];
        console.log('unit list', this.unitId);
      },
      error =>{}
    )
  }
  getSingleUnit(value){
    console.log('single recorddd', value);
    // this.unitId = this.unitDetails.id;
    this.unitDetails = value;
    console.log('single recorddd',this.unitDetails);
    this.viewCreate = true;
  }
  createUnits(){
// this.unitDetails = this.proj
// this.unitDetails = this.unitId;
   console.log('detailll create', this.unitDetails);
    this.viewCreate = true;
  }

  selectForDelete(value){
    console.log('delete valueeee', value);
    this.deleteId = value;

  }
  deleteUnits(){
    this.service.deleteUnits(this.deleteId).subscribe
    (
      data =>{
        _.remove(this.unitList, {id: this.deleteId});
        document.getElementById('closeUnitPopup').click();
      },
      error =>{}
    )
  }

}
