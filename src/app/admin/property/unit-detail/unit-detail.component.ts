import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/common/auth.service';
import { PropertyService } from '../property.service';
import { PropertyTypeComponent } from '../property-type/property-type.component';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment'
import { from } from 'rxjs';

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.scss']
})
export class UnitDetailComponent implements OnInit {

  @Input() unitInfo;
  unitForm: FormGroup;
  uploadForm: FormGroup;
  unitsfloor: any = [];
  planInfo: {};
  btnLoader = false;
  planId: number;
  installmentList: any = [];
  totalsum: number;
  poccurance: number;
  pamount: number;
  price: number;
  installmentId: number;
  allPlans: any = [];
  unitPaymentList: any = [];
  file: File
  btnLoader2 = false;
  docId: number;
  filesId;
  imageId;
  imageUrl: any = [];
  imageUrl2: any = [];
  viewDetailsList: any = [];
  viewDetailsList2: any = [];
  paymentId: number;
  detailPayment;
  customerDetails: any = [];
  pageLoader = true;
  rentDocumentId: number;
  attributeList: any= [];
  arrayAttributes: any = [];
  // dropdownSettings = {};
  dropdownList = [];
  selectedItems = [];
  attributeId: number;
   attributeStatus = [];
  //  dropdownSettings = {
  //   singleSelection: false,
   
  //   text: "Select",
  //   selectAllText: 'Select All',
  //   dField: 'id',
  //   textField: 'itemName',
  //   unSelectAllText: 'UnSelect All',
  //   enableSearchFilter: true,
  // };

  constructor(private fb: FormBuilder, private parentComponent: PropertyTypeComponent, private service: PropertyService,
    private authService: AuthService, private toastrService: ToastrService) { 

    }

  ngOnInit() {

    console.log('unit objecccct', this.unitInfo);

    this.getAttributes();
    console.log('uniit infoooooo1111', this.unitInfo);
    for (let i = 1; i <= this.unitInfo.floor; i++) {
      this.unitsfloor.push(i);
      console.log('unit florrrrrrsssss', this.unitsfloor);

    }
    this.unitPlanINstallment();
    this.getPayments();
    // console.log('kjfhskfsh12121313131', this.getPlan());
    
    this.initUploadForm('');

    this.initunitForm();
  

  }

  initunitForm() {
    console.log('statussssss', this.attributeStatus);
    this.unitForm = this.fb.group({
      floor: [this.unitInfo.floor, Validators.required],
      name: [this.unitInfo.name, Validators.required],
      attributes: [],
      // attributes1: [],
      // arrayAttributes: this.arrayAttributes
    });
  }

  initUploadForm(value) {
    if (value) {

    }
    else {
      this.uploadForm = this.fb.group({
        url: ['']
      });
    }
  }

  goBack() {
    this.parentComponent.unitDetailsView = false;
  }
  updateUnits(value, valid) {
    if(value && valid){
      console.log('upadte value', value);
      this.btnLoader = true;
      this.service.updateUnits(value, this.unitInfo.id).subscribe
        (
          data => {
            const index = _.findIndex(this.unitsfloor, { id: this.unitInfo.id });
            if (index > -1) {
              this.unitsfloor[index] = data;
            }
            const findIndex = _.findIndex(this.parentComponent.unitList, { id: this.unitInfo.id });
            console.log('parent iddddd', findIndex);
            this.parentComponent.unitList[findIndex] = data;
            this.toastrService.success('Update Units Successfully', '', {
              timeOut: 4000
            });
            this.btnLoader = false;
          },
          error => { }
        )
    }
  
  }

  getPlanInstallments() {
    this.service.getpaymentPlan(this.planId)
      .subscribe(
        data => {
          this.installmentList = data;
          this.planId = null;
          // if(data[1]['dueDate'] == (new Date()).getMonth() ){
          // console.log('hi there===',data[1].dueDate,(new Date()).getMonth());
          // }
          // const  highlightDate= _.findIndex(this.installmentList, {dueDate:1})
          let i=0;
          this.installmentList.forEach(element => {
          // let  highlightDate= element.dueDate;
          // console.log('due dateeeeeee', highlightDate);
          // element.dueDate.getMonth() === (new Date()).getMonth()  
          
          if((new Date(element.dueDate)).getMonth() === (new Date()).getMonth()){
              element.highlightDate = true;
              
              console.log('in the condition',(new Date(element.dueDate)).getMonth());
            }
          });
          this.installmentList.sort(function (a, b) {
            if (a.installmentNumber < b.installmentNumber) { return -1; }
            if (a.installmentNumber > b.installmentNumber) { return 1; }
            return 0;
          });
          console.log('installmetn data', data);
          this.pageLoader = false;
        },
        error => {
          console.log('get installemt error', error);
        }
      )
  }

  unitPlanINstallment() {
    console.log('infooooooo', this.unitInfo);

    if (this.unitInfo.planId == null) {
      console.log('in the if condition');
      this.service.getPostPlans(this.unitInfo.propertyId).subscribe
        (
          data => {
            this.allPlans = data;
            // if (this.allPlans.length > 0) {
            //   this.planId = data[0].id;

            // }
            this.planId = this.allPlans[0].id;
            this.getPlanInstallments();
            console.log('null plan idddddddddd', this.planId);
            console.log('plan id in instllment get', this.planId);

          },
          error => {
            console.log('thre is  get plan error', error);
          }
        )
    }
    else {
      this.unitInfo.planId;
      this.service.getUnitPlan(this.unitInfo.planId).subscribe
        (
          value => {
            this.allPlans[0] = value;
            this.getPlanInstallments();
            console.log('unit planssss', value);
            console.log('plan id in instllment get', this.planId);

          },
          error => { }
        )
      this.planId = this.unitInfo.planId;

    }

  }

  getPlan() {
    this.service.getPostPlans(this.unitInfo.propertyId).subscribe
      (
        data => {
          console.log('data===++++++', data);
          this.planId = data[0].id;
          console.log('old plan id------', this.planId)
          this.service.getpaymentPlan(this.planId).subscribe
            (
              value => {
                this.planId = null;
                this.planInfo = data[0];
                delete this.planInfo['id'];
                console.log('planInfo))))))))))', this.planInfo);
                this.installmentList = value;
                this.installmentList.sort(function (a, b) {
                  if (a.installmentNumber < b.installmentNumber) { return -1; }
                  if (a.installmentNumber > b.installmentNumber) { return 1; }
                  return 0;
                });
                this.service.saveUnitPlan(this.planInfo).subscribe
                  (
                    val => {
                      this.planId = val['id'];
                      console.log('idddddddddddddd', this.installmentList.length);

                      for (let i = 0; i < this.installmentList.length; i++) {
                        console.log('old installmetn id+++++', this.installmentList[i].id);
                        delete this.installmentList[i].id;
                        console.log('ghgjhgjh00000', this.installmentList[i]);
                        this.service.savePaymentPlan(this.installmentList[i], this.planId).subscribe
                          (
                            abc => {

                            },
                            error => { }
                          )
                      }

                      let data = {};
                      data['planId'] = this.planId;
                      console.log('fadiiiiiiiiiiiiiiii', data)
                      this.service.updateUnits(data, this.unitInfo.id).subscribe
                        (
                          xyz => {
                            console.log('kjsfhskfhkdsh&^^^^^^^%%%%%%%%', xyz);

                            console.log('kjsfhskfhkdsh&^^^^^^^00000000', this.unitsfloor);

                          },
                          error => { }
                        )
                      console.log('valeeeeeeeeeeeee', this.price);
                      console.log('5454545454======', this.planId)

                    },
                    error => { }
                  )

              },
              error => { }
            )

        },
        error => { }
      )
  }


  getPayments() {
    this.service.getUnitPayment(this.unitInfo.id).subscribe
      (
        data => {
          this.unitPaymentList = data;
          // this.paymentId = data[0]['id'];
          console.log('paymentsunitssssss pppp', this.unitPaymentList);
          this.pageLoader = false;
        },
        error => { }
      )
  }
  onUploadFile(event) {
    this.file = event.target.files[0];
    // let formData:FormData = new FormData();
    // formData.append('File', this.file, this.file.name);
  }

  saveData(value) {
    let formData = new FormData();
    if (value) {
      this.btnLoader2 = true;
      formData.append('file', this.file);
      this.service.saveUploadFile(formData).subscribe
        (
          data => {
            this.docId = data['id'];
            console.log('idddddddddddddddooo', this.docId);
            let a = {
              rentDocumentId: this.docId,
              status: 'rented'
            };


            this.service.updateUnits(a, this.unitInfo.id).subscribe
              (
                data => {
                  this.btnLoader2 = false;
                  console.log('datataaaaerer', data);
                },
                error => { }
              )
            this.toastrService.success('Upload File Successfully', '', {
              timeOut: 4000

            });
            document.getElementById('closeUpload').click();
            this.btnLoader2 = false;
            console.log('dahkjdhkh', data);
          },
          error => {
            this.btnLoader2 = false;
          }
        )
    }

  }

  viewDetails(value) {
    this.paymentId = value.id;
    this.detailPayment = value;
    this.filesId = value.fileids.split(',');

    console.log('length of the file ids===========', this.filesId);

    this.filesId.forEach(element => {

      this.service.getViewDetail(element).subscribe
        (
          data => {
            this.viewDetailsList = data;
            let imageUrlTemp = data['url'].split('/');
  
            imageUrlTemp.splice(0, 2);
            let imageUrll = imageUrlTemp.join('/');

            this.imageUrl.push(environment.baseURL + '/' + imageUrll);


          },
          error => { }
        )
    });

  }

  viewRentDetail(id){
   console.log('view detaill rented', id);
   this.service.getViewDetail(id).subscribe
   (
   data => {
    this.viewDetailsList2 = data;
    console.log('detai;s555554444444', this.viewDetailsList2);
    let imageUrlTemp = data['url'].split('/');
    console.log('detai;s55555', imageUrlTemp);
    imageUrlTemp.splice(0, 2);
    let imageUrll = imageUrlTemp.join('/');

    console.log('imageeeeeeee', environment.baseURL + '/' + imageUrll);
    this.imageUrl2.push(environment.baseURL + '/' + imageUrll);
    console.log('dsajhggggggaaa', this.imageUrl2);


  },
  error => { }
)
  }

  getAttributes(){
 
 
    this.service.getUnitAttributes().subscribe
    (
      data =>{
        this.attributeList = data;
        this.attributeList.forEach((element, i) => {
           this.attributeId = element.id;
           this.attributeStatus = element.status;
         
           this.arrayAttributes.push({ id:i, itemName:  this.attributeStatus});
          console.log('idddddghgggf',this.attributeId,  this.attributeStatus);
        });
        console.log('attributes===============', this.arrayAttributes);
        // this.unitForm.controls.attributes.setValue(this.arrayAttributes);
        // this.initunitForm();
      
        console.log('bind atrributed aray', this.arrayAttributes);
        // this.dropdownSettings = {
        //   singleSelection: false,
         
        //   text: "Select",
        //   selectAllText: 'Select All',
        //   dField: 'id',
        //   textField: 'itemName',
        //   unSelectAllText: 'UnSelect All',
        //   enableSearchFilter: true,
        // };
      },
      error =>{}
    )
  }
 

  // onItemSelect(item: any) {
  //   console.log(item);
  //   console.log(this.selectedItems);
  // }
  // OnItemDeSelect(item: any) {
  //   console.log(item);
  //   console.log(this.selectedItems);
  // }
  // onSelectAll(items: any) {
  //   console.log(items);
  // }
  // onDeSelectAll(items: any) {
  //   console.log(items);
  // }

}