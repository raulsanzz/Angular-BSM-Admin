import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SettingsService } from '../settings.service';
import { AuthService } from 'src/app/common/auth.service';
import { SettingsUnitsComponent } from '../settings-units/settings-units.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-create-units',
  templateUrl: './create-units.component.html',
  styleUrls: ['./create-units.component.scss']
})
export class CreateUnitsComponent implements OnInit {

  @Input() unitDetails;
  UnitsForm: FormGroup;
  type: any;
  projectId: number;
  unitLIst: any = [];
  unitId: number;

  constructor(private fb: FormBuilder, private service: SettingsService,
     private authService: AuthService, private parentComponent: SettingsUnitsComponent) { }

  ngOnInit() {
    if(this.unitDetails){
      this.unitId = this.unitDetails.id;
    }
    
    console.log(' project iddddd', this.unitDetails);
    this.type = 'unitAttribute';
    const local = this.authService.getUser();
    this.projectId =  local.projectId;
 
    this.inintUnitForm(this.unitDetails);
 

  }
  inintUnitForm(value) {
    
    if (value) {
      this.UnitsForm = this.fb.group({
        status: [value.status],
        type:[this.type],
        projectId:[this.projectId]
        
      });

    }
    else {
      this.UnitsForm = this.fb.group({
        status: [''],

        type:[this.type],
        projectId:[this.projectId]
     
      });
    }
  }
  saveUnits(value){
    console.log('unit value', value);
    if(value){
      this.service.saveunits(value).subscribe
      (
        data =>{
          this.unitLIst = data;
          this.parentComponent.viewCreate = false;
          
          console.log('save unit', data);
        },
        error =>{}
      )
    }

  }
  updateUnits(value){
    console.log('updated value', value);
    if(value){
      this.service.updateUnits(value, this.unitId).subscribe
      (
        data =>{
          const index = _.findIndex(this.parentComponent.unitList, {id: this.unitDetails.id  })
          console.log('indexxxxxxxxxxx', index);
    
            this.parentComponent.unitList[index]=data;
            this.parentComponent.viewCreate = false;
        },
        error =>{}
      )
    }

  }

}
