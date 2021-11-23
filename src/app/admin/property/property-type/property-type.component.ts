import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropertyComponent } from '../property.component';
import { PropertyService } from '../property.service';
import { AuthService } from 'src/app/common/auth.service';
import { from } from 'rxjs';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment'


@Component({
  selector: 'app-property-type',
  templateUrl: './property-type.component.html',
  styleUrls: ['./property-type.component.scss']
})
export class PropertyTypeComponent implements OnInit {

  @Input() propertyDetails;
  unitForm: FormGroup;
  Floor: any = [];
  unitList: any = [];
  unitListFiltered: any = [];
  unitDetailsView = false;
  unitInfo = {};
  amountPaid;
  arrayFloors: any[];
  btnLoader = false;
  selectedFloor = 'all';
  pageLoader = true;
  fileId;
  imageUrl: any = [];
  customerDetails: any = [];
  attributeList: any = [];

   // Validation Patterns
   alphaNumeric = /^[a-z\d\-_\s]+$/i;
   characterOnly = /^[a-zA-Z ]*$/;
   spaceOnly = /^[^-\s]/;
   numericOnly = /^\d+$/;

  constructor(private fb: FormBuilder, private parentComponent: PropertyComponent, private service: PropertyService,
    private authService: AuthService, private toastrService: ToastrService) { }
  ngOnInit() {
    console.log('pid-=-===-=--=-=-==-===-', this.propertyDetails);
    this.arrayFloors = this.propertyDetails.propertyFloor.split(',');

    for (let i = 0; i < this.propertyDetails.propertyFloor.split(',').length; i++) {
      console.log('Florrrrrrsss loooopppp!!!!!!!!!!!!!', this.arrayFloors.length);
      this.Floor.push(this.arrayFloors[i]);
    }
    

    this.initUnitForm('');
    this.getUnits();
  }

  initUnitForm(value) {
    if (value) {
      this.unitForm = this.fb.group({
        floor: [this.propertyDetails.floors],
        name: ['',Validators.compose([Validators.required, Validators.compose([
          Validators.pattern(this.numericOnly), Validators.pattern(this.spaceOnly)
        ])])]
      })
    }
    else {
      console.log('Florrrrrrsss', this.Floor);
      this.unitForm = this.fb.group({
        floor: [this.propertyDetails.floor],
        name: ['',Validators.compose([Validators.required, Validators.compose([
          Validators.pattern(this.numericOnly), Validators.pattern(this.spaceOnly)
        ])])]
      });
    }
  }

  goBack() {
    this.parentComponent.propertyType = false;
  }
  searchByName(unitName) {
    this.unitListFiltered = this.unitList.filter(a => a.name.toLowerCase().indexOf(unitName) > -1);
  }
  searchByFloor(floor: any) {
    if (floor) {
      this.unitListFiltered = this.unitList.filter(value => {
        return value.floor == floor;
      });
    } else {
      this.unitListFiltered = this.unitList;
    }

  }

  saveUnits(value, valid) {
    if (value && valid) {
      this.btnLoader = true;
      const array = [];
      for (let i = 1; i <= value.name; i++) {
        array.push(i);
      }
      console.log('arrayayyyyyyyyyyyy', array);
      const arraySource = from(array);
      arraySource.subscribe(
        val => {
          const obj = {
            floor: value.floor,
            name: `${this.propertyDetails.propertyName}-F${value.floor}-U${val}`,
            propertyId: this.propertyDetails.propertyId,
            status: 'open'

          }

          console.log('vallllllllllllllllaaaaa', obj.name);
          this.service.saveUnits(obj, obj.propertyId).subscribe
            (
              data => {
                console.log('vallllllllllllllllaaaaa+++++', data);
                this.getUnits();
                document.getElementById('closePlanPopup').click();
                this.unitForm.reset();
                this.toastrService.success('Save Units Successfully', '', {
                  timeOut: 4000
                });
                this.btnLoader = false;
              },
              error => {
                console.log(error);
              }
            )
        }
      )

    }
  }

  closePopUp(){
    this.unitForm.reset();
    document.getElementById('closePlanPopup').click();
  }

  getUnits() {
    this.service.getUnits(this.propertyDetails.propertyId).subscribe
      (
        data => {
          this.unitList = data;

          this.unitList.forEach(element => {
            this.amountPaid = 0;
            element.installmentPayments.forEach(element => {
              this.amountPaid = this.amountPaid + element.amount;
            });
            element.paidAmount = this.amountPaid;
         
          });
          this.getAttributes();
          this.unitList.sort(function (a, b) {
            if (a.floor < b.floor) { return -1; }
            if (a.floor > b.floor) { return 1; }
            return 0;
          });
          this.pageLoader = false
       
          this.unitListFiltered = this.unitList;
        },
        error => {
        }
      )
  }
  getAttributes(){
    this.service.getUnitAttributes().subscribe
    (
      data =>{
        this.attributeList = data;
        console.log('listt atrributessss', this.attributeList);
      },
      error =>{}
    )
  }

  getSingleUnit(value) {
    console.log('single unit value', value);
    // if unit status is "open"
    if (value.status === 'booked' && value.status != 'inactive') {
      // console.log('condition not equal to zero ====', value.status);
      this.unitInfo = {
        id: value.id, floor: value.floor, name: value.name, propertyId: value.propertyId,
        planId: value.planId, status: value.status, userName: value.booking.customer.username, imageId: value.booking.customer.imageid,
        occupation: value.booking.customer.occupation, phNumber: value.booking.customer.number, address: value.booking.customer.address, imageUrl: '',
         amount: value.paidAmount,rentDocumentId: value.rentDocumentId
      };
      console.log('In if condtionnnn', this.unitInfo);
      if(value.booking.customer.imageid){
        this.fileId = value.booking.customer.imageid.split(',');
        this.service.getViewDetail(this.fileId).subscribe
        (
          data => {
            this.customerDetails = data;
            console.log('detail customer', this.customerDetails);
            let imageUrlTemp = data['url'].split('/');
            console.log('detai;s55555', imageUrlTemp);
            imageUrlTemp.splice(0, 2);
            let imageUrll = imageUrlTemp.join('/');

            console.log('imageeeeeeee', environment.baseURL + '/' + imageUrll);
            this.imageUrl = (environment.baseURL + '/' + imageUrll);
            console.log('image urlll', this.imageUrl);
            this.unitInfo['imageUrl'] = this.imageUrl;
            console.log('image this.unitInfo', this.unitInfo);
          },
          error => { }
        )
      }
  
     

    }
    else {
      console.log('condition not equal to zero ====', value.status);
      this.unitInfo = {
        id: value.id, floor: value.floor, name: value.name, propertyId: value.propertyId,
        planId: value.planId, status: value.status,rentDocumentId: value.rentDocumentId
      };
    }
    this.unitDetailsView = true;

  }

}
