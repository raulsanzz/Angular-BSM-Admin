import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropertyService } from '../property.service';
import { AuthService } from 'src/app/common/auth.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { CreatePropertyComponent } from '../create-property/create-property.component';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.scss']
})
export class CreatePlanComponent implements OnInit {

  @Input() planDetails;
  paymentForm: FormGroup;
  installmentList: any = [];
  installmnetLIst2: any = [];
  installmentId: number;
  btnLoader = false;
  // btnLoader1 = true;
  totalsum: number;
  poccurance: number;
  pamount: number;
  price: number;
  planAmount: number;
  pageLoader = true;
  attributeList: any = [];

  // Validation Patterns
  alphaNumeric = /^[a-z\d\-_\s]+$/i;
  characterOnly = /^[a-zA-Z ]*$/;
  spaceOnly = /^[^-\s]/;
  numericOnly = /^\d+$/;

  constructor(private fb: FormBuilder, private _service: PropertyService,
    private authService: AuthService, private router: Router, private parentComponenet: CreatePropertyComponent,
    private toastrService: ToastrService) {

  }

  ngOnInit() {
    this.inintPaymentForm('');
    this.getInstallment();
    this.price = this.planDetails.totalPrice;
    this.planAmount = this.planDetails.totalPrice;
    this.getAttributes();

  }

  inintPaymentForm(value) {
    if (value) {
      this.paymentForm = this.fb.group({
        name: [
          value.name, Validators.required
        ],
        description: [value.description, Validators.required],
        amount: [
          value.amount],
        occurrence: [value.occurrence, Validators.compose([Validators.required, Validators.compose([
          Validators.pattern(this.numericOnly), Validators.pattern(this.spaceOnly)
        ])])],
        paymentType: [value.paymentType, Validators.required],
        installmentNumber: [value.installmentNumber],
        interval: [value.interval],
        intervalType: [value.intervalType],
        percentage: [value.percentage]
      });

    }
    else {
      this.paymentForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        amount: [''],
        occurrence: ['', Validators.compose([Validators.required, Validators.compose([
          Validators.pattern(this.numericOnly), Validators.pattern(this.spaceOnly)
        ])])],
        paymentType: ['', Validators.required],
        installmentNumber: [''],
        interval: [''],
        intervalType: [''],
        percentage: ['']
      });
    }
  }
  goBack() {
    this.parentComponenet.showInstallments = false;
  }

  percentageValue(value: string) {
    const discount = (this.planAmount * parseInt(value, 10)) / 100;

    this.paymentForm.controls.amount.setValue(discount);
    console.log('amountttttt4444444tt', this.paymentForm.controls.amount.value);
  }

  savePaymentPlan(value, valid) {


    if (value && valid) {
      this.btnLoader = true;
      
      console.log('value of the occurrence', value, value.occurrence);
    
      if(!value.occurrence){
        value.occurrence = 1;
      }
      let occurence = parseInt(value.occurrence, 10);

      console.log('value of the occurrence========111', occurence);
      if (value.interval ==  undefined && value.intervalType ==  undefined){
        value.interval = '';
        value.intervalType ='';
      }
      if (occurence <= 200) {
        if (this.price > 0 && (value.amount * occurence) <= this.price) {
          console.log('value and occurence', value.amount * value.occurrence);
          const array = [];
          for (let i = 1; i <= occurence; i++) {
            array.push(i);
          }
          console.log('installmen object', array);
          const iterateArray = from(array);
          iterateArray.subscribe
            (
              abc => {
                const obj = {
                  occurence: 1,
                  name: `${value.name}`,
                  amount: `${value.amount}`,
                  description: `${value.description}`,
                  paymentType: `${value.paymentType}`,
                  interval: `${value.interval}`,
                  intervalType: `${value.intervalType}`,
                  planId: this.planDetails.id,
                  installmentNumber: this.installmentList.length + abc

                }
                this._service.savePaymentPlan(obj, obj.planId).subscribe
                  (
                    data => {
                      this.installmentId = data['id'];

                      //  this.getInstallment();
                      this.price -= parseInt(value.amount, 10);//* parseInt(abc, 10);
                      this.installmentList.push(data);
                      this.parentComponenet.installmentList.push(data);
                      this.installmnetLIst2.push(data);
                      console.log('dskjfldsfjdls))))))))))-----------', this.installmnetLIst2);
                      this.installmentList.sort(function (a, b) {
                        if (a.installmentNumber < b.installmentNumber) { return -1; }
                        if (a.installmentNumber > b.installmentNumber) { return 1; }
                        return 0;
                      });
                      this.paymentForm.reset();
                      // this.getInstallment();
                      // this.ngOnInit();
                      this.dynamicUpdateFields();
                      this.installmentId = null;
                      this.toastrService.success('Save Installment Successfully', '', {
                        timeOut: 4000
                      });
                      this.btnLoader = false;
                      //  this.parentComponenet.showInstallments = false;
                    },
                    error => {
                      this.btnLoader = false;
                      console.log('paymne tworks', error);
                    }
                  )
              },
              error => {
                this.btnLoader = false;
              }
            )


        }

        else {
          this.toastrService.error('Amount Exceeds Total Price', '', {
            timeOut: 4000
          });
          this.btnLoader = false;
        }
      }
      else {
        console.log('occennrce value exeddsss', value.occurrence);
        this.toastrService.error('Occurrence value exceeds limit', '', {
          timeOut: 4000
        });
        this.btnLoader = false;
      }
    



    }
    else {
      Object.keys(this.paymentForm.controls).map((controlName) => {
        this.paymentForm.get(controlName).markAsTouched({ onlySelf: true });
      })
    }
  }

  getInstallment() {
    console.log('installment get');
    let sum = 0;
    this._service.getpaymentPlan(this.planDetails.id).subscribe
      (
        data => {
          // this.installmentList = data;
          // sum = parseInt(this.planDetails.amount, 10);
          console.log('hjskhf******444444', sum);
          this.installmentList = data;
          for (let i = 0; i < this.installmentList.length; i++) {
            var b = parseInt(this.installmentList[i].amount);
            console.log('hjskhf******7878787', b);
            sum = sum + b;

            console.log('hjskhf******', sum);
          }
          this.price = this.price - sum;

          this.installmentList.sort(function (a, b) {
            if (a.installmentNumber < b.installmentNumber) { return -1; }
            if (a.installmentNumber > b.installmentNumber) { return 1; }
            return 0;
          });
          this.pageLoader = false;
          this.dynamicUpdateFields();

          console.log('installmetn data', data);
        },
        error => {
          console.log('get installemt error', error);
        }
      )
    // (
    //   data =>{
    //     //sum = parseInt(this.planDetails.amount, 10);
    //   this.installmentList = data;
    //   for(let i = 0; i <this.installmentList.length;i++){
    //   var b = parseInt(this.installmentList[i].amount);

    //     sum = sum + b;
    //     }
    //     this.price = this.price - sum;
    //     const installemntLength = _.groupBy(data, 'name');
    //     console.log('this is group', _.groupBy(data, 'name'));
    //       this.installmentList = _.uniqBy(data, 'name');
    //       this.installmentList.forEach((val, i) => {
    //         for (const key in installemntLength) {
    //           if (val.name === key) {
    //             this.installmentList[i].occurrence = installemntLength[key].length;
    //           }
    //         }
    //       });
    //       console.log('this is installment========', this.installmentList);


    //   },
    //   error =>{
    //     console.log('get installemt error', error);
    //   }
    // )

  }

  dynamicUpdateFields() {
    if (this.installmentList.length > 0) {
      this.paymentForm.controls.interval.enable();
      this.paymentForm.controls.intervalType.enable();
      this.paymentForm.controls.occurrence.enable();
      this.paymentForm.controls['interval'].setValidators([Validators.required, Validators.pattern(this.numericOnly),Validators.pattern(this.spaceOnly)]);
      this.paymentForm.controls['intervalType'].setValidators([Validators.required]);
    } else {
   
      this.paymentForm.controls.interval.disable();
      this.paymentForm.controls.intervalType.disable();
     
     this.paymentForm.controls.occurrence.setValue(1);
     this.paymentForm.controls.occurrence.disable();
      this.paymentForm.controls['interval'].setValidators([Validators.required, Validators.pattern(this.numericOnly),Validators.pattern(this.spaceOnly)]);
      this.paymentForm.controls['intervalType'].setValidators([]);
    }
    this.paymentForm.controls['interval'].updateValueAndValidity();
    this.paymentForm.controls['intervalType'].updateValueAndValidity();
  }

  getSingleInstallment(data) {
    this.paymentForm.controls['occurrence'].disable();

    data.percentage = (data.amount / this.planAmount) * 100;
    console.log('this is data percentage', data);
    this.inintPaymentForm(data);
    this.installmentId = data.id;


  }


  updatePaymentPlan(value, valid) {


    if (value && valid) {
      let occurence = parseInt(value.occurrence, 10);
      console.log('value of the occurrence========', occurence);
      if (occurence <= 200) {
        if (this.price > 0 && (value.amount * occurence) <= this.price) {
          this.price -= parseInt(value.amount, 10);
          console.log('updsteeeeeee=-======', this.installmentList);
          this.btnLoader = true;
          console.log('value here update', value);
          this._service.updatepaymentPlan(value, this.installmentId).subscribe
            (
              data => {
                console.log('dskjfldsfjdls))))))))))', this.installmnetLIst2);
                const index = _.findIndex(this.installmentList, { id: this.installmentId });
                if (index > -1) {
                  this.installmentList[index] = data;


                  console.log('zzzzzzzzzzzzzzz666612', this.installmentList[index]);
                }
                this.btnLoader = false;
                const findIndex = _.findIndex(this.parentComponenet.installmentList, { id: this.installmentId });
                console.log('indexxx', findIndex);
                if (findIndex > -1) {
                  this.parentComponenet.installmentList[findIndex] = data;
                }
                //  this.parentComponenet.installmentList.replace(this.installmentList[index]);
                this.paymentForm.reset();
                this.toastrService.success('Save Installment Successfully', '', {
                  timeOut: 4000
                });
                this.installmentId = null;
              },
              error => {
                this.btnLoader = false;
                console.log('error update ', error);
              }
            )
        }
        else{
          this.toastrService.error('Amount Exceeds Total Price', '', {
            timeOut: 4000
          });
          this.btnLoader = false;
        }
        
      }
      else{
        this.toastrService.error('Occurrence should be less than 200', '', {
          timeOut: 4000
        });
      }
    }

``
  }
  cancelButton() {
    this.paymentForm.reset();
    this.installmentId = null;
  }


  getAttributes(){
    this._service.getUnitAttributes().subscribe
    (
      data =>{
        this.attributeList = data;
        console.log('listt atrributessss', this.attributeList);
      },
      error =>{}
    )
  }

}
