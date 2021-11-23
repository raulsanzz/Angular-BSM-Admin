import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropertyService } from '../property.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { Identifiers, ArrayType, identifierModuleUrl } from '@angular/compiler';
import { PropertyComponent } from '../property.component';
import { forEach } from '@angular/router/src/utils/collection';
import { validateConfig } from '@angular/router/src/config';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.scss']
})
export class CreatePropertyComponent implements OnInit {

  propertyForm: FormGroup;
  planForm: FormGroup;
  propertyTypeId: number;
  showInstallments = false;
  showPlanPaymnet = false;
  btnLoader = false;
  allPlans: any = [];
  Floor: any = [];
  arrayTypee = [];
  btnLoader1 = false;
  selectedItems = [];
  btnLoader7 = false;
  dropdownSettings = {};
  dropdownList = [];
  buildingId: number;
  planId: number;
  installmentList: any = [];
  floors = [];
  totalCost: number;
  planDetails;
  installmentId: number
  @Input() propertyDetails;


  // Validation Patterns
  alphaNumeric = /^[a-z\d\-_\s]+$/i;
  characterOnly = /^[a-zA-Z ]*$/;
  spaceOnly = /^[^-\s]/;
  numericOnly = /^\d+$/;

  constructor(private fb: FormBuilder, private _service: PropertyService,
    private router: Router, private parentComponent: PropertyComponent, private toastrService: ToastrService) {

  }

  ngOnInit() {
    for (let i = 1; i <= this.propertyDetails.floor; i++) {
      this.Floor.push({ id: i, itemName: i });
    }

    this.dropdownSettings = {
      singleSelection: false,
     
      text: "Select",
      selectAllText: 'Select All',
      dField: 'id',
      textField: 'itemName',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
    };

    this.initPropertyForm(this.propertyDetails);
    this.initPlanForm('');
    if (this.propertyDetails && this.propertyDetails.id) {
      this.propertyTypeId = this.propertyDetails.id;
      this.getPlan();
    }

  }

  initPropertyForm(value) {
    if (value && value.floors) {
      const values = _.cloneDeep(value);
      const allFloors = values.floors.split(',');
      const array = [];
      allFloors.forEach(fl => {
        array.push({
          id: parseInt(fl, 10),
          itemName: parseInt(fl, 10)
        });
      });
      values.floors = array;
      this.floors = array;
      console.log('this florrrrrrrr', values.floors);
      this.propertyForm = this.fb.group({
        name: [
          values.name,
          Validators.compose([Validators.required, Validators.compose([
            Validators.pattern(this.characterOnly), Validators.pattern(this.spaceOnly)])])],
        type: [
          values.type,
          Validators.compose([Validators.required, Validators.compose([
            Validators.pattern(this.alphaNumeric), Validators.pattern(this.spaceOnly)])])],
        area: [
          values.area,
          Validators.compose([
            Validators.required,
            Validators.pattern(this.numericOnly),
            Validators.pattern(this.spaceOnly)
          ])],

        floors: [values.floors]
      });
    }
    else {
      this.propertyForm = this.fb.group({
        name: ['', Validators.compose([Validators.required, Validators.compose([
          Validators.pattern(this.characterOnly), Validators.pattern(this.spaceOnly)])])],

        type:
          ['', Validators.compose([Validators.required, Validators.compose([
            Validators.pattern(this.alphaNumeric), Validators.pattern(this.spaceOnly)])])],

        area:
          ['', Validators.compose([Validators.required, Validators.compose([
            Validators.pattern(this.numericOnly), Validators.pattern(this.spaceOnly)])])],

        floors: [
          [this.propertyDetails.floor]

        ]

      });
    }

  }

  goBack() {

    this.parentComponent.createPropertyView = false;
  }

  initPlanForm(value) {
    if (value) {

      this.planForm = this.fb.group({
        name: [
          value.name,
          Validators.compose([
            Validators.required,
            Validators.pattern(this.characterOnly),
            Validators.pattern(this.spaceOnly)
          ])
        ],
        totalPrice: [
          value.totalPrice, Validators.compose([Validators.required, Validators.compose([
            Validators.pattern(this.numericOnly), Validators.pattern(this.spaceOnly)])])],
        status: [value.status]
      })
    } else {
      this.planForm = this.fb.group({
        name: ['', Validators.compose([Validators.required, Validators.compose([
          Validators.pattern(this.characterOnly), Validators.pattern(this.spaceOnly)])])],
        totalPrice: ['', Validators.compose([Validators.required, Validators.compose([
          Validators.pattern(this.numericOnly), Validators.pattern(this.spaceOnly)])])],
        status: ['']
      });
    }

  }

  savePropertyType(value, valid) {
    if (value && valid) {
      this.btnLoader7 = true;
      console.log('save propety data', value);

      if (value.floors.length > 0) {
        this._service.saveProperty(value, this.propertyDetails.buildingId)
          .subscribe(
            data => {
              this.toastrService.success('Save Property Successfully', '', {
                timeOut: 4000
              });
              this.propertyTypeId = data['id'];
          
              this.parentComponent.PropertyList.unshift(data);
              console.log('save proprtyyyyyy===', data);
              this.btnLoader7 = false;


              
              this.parentComponent.createPropertyView = false;

            },
            error => {
              console.log(error);
              this.btnLoader7 = false;
            }
          )
      }
      else {
        this.btnLoader1 = false;
        this.toastrService.error('Floor Required', '', {
          timeOut: 4000
        });

      }

    }
    else {
      Object.keys(this.propertyForm.controls).map((controlName) => {
        this.propertyForm.get(controlName).markAsTouched({ onlySelf: true });
      })
    }
  }

  // Update Properties
  updatePropertyType(value, valid) {
    console.log('Floors Array2323232', value.floors );
    if (value && valid) {
      this.btnLoader1 = true;
      // const array = [];
      // for (var k = 0; k < value.floors.length; k++) {
      //   array.push(value.floors[k].itemName);
      //   console.log('Floors Array2323232', value.floors );
      // }
      console.log('Floors Array', value.floors );
      // value.floors = array;
      if (value.floors.length) {
        this._service.editProperty(value, this.propertyDetails.id).subscribe
          (
            data => {
              this.propertyDetails = value;
              console.log('indexxxxxxxxxxx detauilssssss', this.propertyDetails);
              this.propertyDetails.floors = value.floors.join(',');
              const index = _.findIndex(this.parentComponent.PropertyList, {id: this.propertyTypeId  })
              console.log('indexxxxxxxxxxx', index);
         
                this.parentComponent.PropertyList[index]=data;
              
            
              this.toastrService.success('Update Property Successfully', '', {
                timeOut: 4000
              });
              this.btnLoader1 = false;
            },

            error => {
              this.btnLoader1 = false;
            }
          )
      }
      else {
        this.btnLoader1 = false;
        this.toastrService.error('Floor Required', '', {
          timeOut: 4000
        });
      }
    }
  }

  savePlan(value, valid) {
    if (value && valid) {
      console.log('plan iiiiiddddddd', this.planId);
      this.btnLoader = true;
      if (this.allPlans.length == 0) {
        this._service.postPlan(value, this.propertyTypeId)
          .subscribe(
            data => {

              console.log('allplanssssss', this.allPlans);
              this.allPlans.push(JSON.parse(JSON.stringify(data)));
              this.planForm.reset();
              document.getElementById('closePlanPopup').click();
              this.planId = this.allPlans['id'];
              console.log('plan iddddddd', this.planId)
              this.planId = null;
              this.btnLoader = false;
              this.toastrService.success('Property Plan saved successfully', '', {
                timeOut: 4000
              });


            },

            error => {
              this.btnLoader = false;
              console.log(error);
            }
          )

      }
      else {
        this.toastrService.error(' Plan already exit', '', {
          timeOut: 4000
        });
        this.btnLoader = false;
      }
    }
    else {
      Object.keys(this.planForm.controls).map((controlName) => {
        this.planForm.get(controlName).markAsTouched({ onlySelf: true });
      })
    }
  }

  onClickEditPlan(data) {
    this.initPlanForm(data);
    this.planId = data.id;
  }
  onClickUpdate(value, valid) {
    if (value && valid) {
      this.btnLoader = true;
      this._service.updatePostPlan(value, this.planId)
        .subscribe(
          data => {

            const index = _.findIndex(this.allPlans, { id: this.planId });
            if (index > -1) {
              this.allPlans[index] = JSON.parse(JSON.stringify(data));
              // this.allPlans.push(data);

            }

            this.toastrService.success('Update Plan Successfully', '', {
              timeOut: 4000
            });
            this.planForm.reset();
            this.planId = null;
            this.btnLoader = false;
            document.getElementById('closePlanPopup').click();

          },
          error => {
            this.btnLoader = false;
            console.log(error);
          }
        )
    }
  }


  createInstallment(data) {
    this.planDetails = data;
    console.log('plan idddddrdrdrdrdr', data);
    this.showInstallments = true;


  }

  getPlan() {
    this._service.getPostPlans(this.propertyTypeId).subscribe
      (
        data => {
          this.allPlans = data;
          if (this.allPlans.length > 0) {
            this.planId = data[0].id;


            console.log('plan id in instllment get', this.planId);
            this._service.getpaymentPlan(this.planId).subscribe

              (
                data => {
                  this.installmentId = data['id'];
                  // const index = _.findIndex(this.installmentList, { id: this.installmentId })
                  this.installmentList = data;
                  this.installmentList.sort(function (a, b) {
                    if (a.installmentNumber < b.installmentNumber) { return -1; }
                    if (a.installmentNumber > b.installmentNumber) { return 1; }
                    return 0;
                  });
                  // this.installmentList[index] = data;
                  this.planId = null;
                  console.log('installmetn dataaaaaaaa00000', data);
                },
                error => {
                  console.log('get installemt error', error);
                }
              )
            console.log('there is getsss plan data', data);
          }
        },
        error => {
          console.log('thre is  get plan error', error);
        }
      )

  }
  cancelButton() {
    this.planForm.reset();
    this.planId = null;
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }

}
