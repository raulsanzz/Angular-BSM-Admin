import { Component, OnInit } from '@angular/core';
import { PaymentService } from './payments.service';
import * as _ from 'lodash';
import { AuthService } from 'src/app/common/auth.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment'
import { DatePipe } from '@angular/common';
import { element } from '@angular/core/src/render3';
import { concat } from 'rxjs/operators';



@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  bookingId: number;
  installmentPaymentList: any = [];
  installmentList: any = [];
  planList: any = [];
  unitList: any = [];
  unitId: number;
  propertyId: number;
  planId: number;
  projectId: number;
  customerId: number;
  installmentPaymentId: number;
  planInfo;
  unitIdInfo: number;
  name: string;
  frontVlaue;
  historyList: any = [];
  propertyList: any = [];
  Filtered: any = [];
  FilterdTwo: any = [];
  historyValue: any = [];
  filesId: any;
  imageUrl: any = [];
  paymentId: number
  viewDetailsList: any = [];
  rejectedList: any = [];
  btnLoader = false;
  btnLoader1 = false;
  btnLoader2 = false;
  detailPayment: any;
  ddMMyyyy;
  planAmount: number;
  installmentAmount: number = 0;
  addAmount: any;
  pageLoader = true;


  constructor(private service: PaymentService, private authService: AuthService,
    private toastrService: ToastrService) { }

  ngOnInit() {

    this.getinstallmentPayment();
    this.getInstallmentPayments();

    this.getProperty();

    // this.getPlanPayment();
  }




  getInstallmentPayments() {
    const array = [];
    const val = this.authService.getUser();
    this.projectId = val['projectId'];
    console.log('here is 43435355rrrrrrr', this.projectId);
    this.service.getInstallmentPayments().subscribe
      (
        data => {
          console.log('here is 43435355', data);
          // this.projectId = data['projectId'];
          // console.log('here is 43435355rrrrrrr', this.projectId);
          this.installmentPaymentList = data;

          this.FilterdTwo = this.installmentPaymentList;
          this.pageLoader = false;

        },
        error => {
          console.log('here is erroroor', error);
        }
      )
  }



  getProperty() {
    this.service.getProperty(this.projectId).subscribe
      (
        data => {
          this.propertyList = data;

          console.log('hksjhfksfhks3333', this.propertyList);
        },
        error => { }
      )
  }

  getPlanPayment(value) {
    // console.log("unit ddddd6666", value);
    // let installmentPrice = 0;


    this.installmentPaymentId = value.id;
    this.customerId = value.customer.id;
    this.unitIdInfo = value.unitId;
    // console.log('fadiiiiiiiiu', this.unitIdInfo);
    this.service.getUnit(value.unitId).subscribe
      (
        data => {
          this.unitList = data;
          this.propertyId = this.unitList['propertyId'];
          // console.log('unit listtttttttt', this.unitList, this.propertyId);
          this.service.getPostPlans(this.propertyId).subscribe
            (
              data => {
                this.planList = data;
                this.planAmount = this.planList[0]['totalPrice'];
                this.planId = this.planList[0]['id'];
                console.log('plan listtttplannnnn amount', this.planAmount);
                this.service.getpaymentPlan(this.planId).subscribe
                  (
                    val => {

                      this.installmentList = val;

                      this.installmentList.sort(function (a, b) {
                        if (a.installmentNumber < b.installmentNumber) { return -1; }
                        if (a.installmentNumber > b.installmentNumber) { return 1; }
                        return 0;
                      });
                      let planPrice = 0;
                      this.installmentList.forEach((value, i) => {
                        delete value['id'];
                        delete  value['planId'];
                        let installmentPrice = parseInt(value['amount'], 10);

                        console.log('installment list on accept amount11111', installmentPrice);

                        planPrice = planPrice + installmentPrice;
                        console.log('installment list on accept mount22222222', planPrice);


                        if (value.installmentNumber === 1) {
                          value.dueDate = new Date();
                          // let day=value.dueDate.getDate();
                          // let month=value.dueDate.getMonth();
                          // let year=value.dueDate.getFullYear();
                          // let date = day+'/'+month+'/'+year;
                          // value.dueDate=date;

                          // value.dueDate = value.dueDate.getDate()+'/'+value.dueDate.getMonth+'/'+value.dueDate.getFullYear;
                          console.log('first dueDate=======', value.dueDate);
                        } else {
                          if (value.intervalType === 'Months') {
                            const previousDate = _.cloneDeep(this.installmentList[i - 1].dueDate);
                            const month = previousDate.getMonth() + value.interval;
                            previousDate.setMonth(month);
                            value.dueDate = previousDate;
                          }
                          else if (value.intervalType === 'years') {
                            const previousDate = _.cloneDeep(this.installmentList[i - 1].dueDate);
                            const year = previousDate.getFullYear() + value.interval;
                            previousDate.setFullYear(year);
                            value.dueDate = previousDate;
                          }
                          else if (value.intervalType === 'Days') {
                            const previousDate = _.cloneDeep(this.installmentList[i - 1].dueDate);
                            const day = previousDate.getDate() + value.interval;
                            previousDate.setDate(day);
                            value.dueDate = previousDate;
                          }
                        }
                      })
                      this.addAmount = this.planAmount - planPrice;
                     
                      this.planInfo = data[0];
                      // delete this.planInfo['id'];
                      // delete this.planInfo['propertyId'];
                      console.log('installment list on accept amount Addddd infoooo', this.planInfo);
                      this.pageLoader = false;
                      // console.log('installment list i', this.planInfo);
                      console.log('installment list on accept', this.installmentList);
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

  // Confirm Booking
  getPlansCopy() {
    console.log('planAmount', this.addAmount);
    let updatedAmount = 0;
    this.installmentList.forEach(element => {

      
    
      updatedAmount = updatedAmount + parseInt(element.amount, 10);

    });
    if (this.planAmount >= 0 && updatedAmount == this.planAmount) {

      console.log('planAmount', this.addAmount);
      this.toastrService.success('Booking Confirmed', '', {
        timeOut: 4000
      });

      //  Optimize Booking Api
 
console.log('plan listtttt---', this.planList);
console.log('installment listtttt$$$$', this.installmentList);
let makeBookingInfo ={
  installmentPaymentId:this.installmentPaymentId,
  customerId:this.customerId ,
  unitsId:this.unitIdInfo ,
  projectId:this.projectId ,
  planId:this.planId,
  planInstallments:this.installmentList

   
}
// console.log('confrimr booking dataaaa', data);
      this.service.makeBooking(makeBookingInfo).subscribe
        (
          data => { 
            console.log('confrimr booking dataaaa', data);
            document.getElementById('closePoppppup').click();
          },
          error => { }
        )

      // this.service.saveUnitPlan(this.planInfo).subscribe
      // (
      //   val => {
      //     this.planId = val['id'];
      //     for (let i = 0; i < this.installmentList.length; i++) {
      //       delete this.installmentList[i].id;
      //       this.service.savePaymentPlan(this.installmentList[i], this.planId).subscribe
      //         (
      //           abc => {
      //             console.log('132113131313113', abc);
      //           },
      //           error => { }
      //         )


      //     }
      //     let data = {};
      //     data['planId'] = this.planId;
      //     console.log('plan iddd121313131', data);


      //     this.service.updateUnits(data, this.unitIdInfo).subscribe
      //       (
      //         val => {
      //           console.log('hdgag78999991515151554', this.unitIdInfo);
      //           let value = {};
      //           value['unitsId'] = this.unitIdInfo;
      //           value['projectId'] = this.projectId;
      //           value['planId'] = this.planId;
      //           value['customerId'] = this.customerId;
      //           console.log('hdgag78999990000', this.customerId);
      //           this.service.customerbooking(value, this.customerId).subscribe
      //             (
      //               xyz => {
      //                 console.log('hdgag7899999121212', xyz);
      //                 let bookingData = {};
      //                 this.bookingId = xyz['id'];
      //                 console.log('noman condition', this.bookingId, !this.bookingId);
      //                 bookingData['bookingId'] = this.bookingId;
      //                 bookingData['status'] = 'approved';
      //                 this.service.updateInstallmentPayments(bookingData, this.installmentPaymentId).subscribe
      //                   (
      //                     value => {
      //                       this.toastrService.success('Booking Confirmed', '', {
      //                         timeOut: 4000
      //                       });
      //                       _.remove(this.installmentPaymentList, { id: this.installmentPaymentId });
      //                       document.getElementById('closePoppppup').click();
      //                       console.log('bokkingggggggg', value);

      //                       this.btnLoader2 = false;

      //                     },
      //                     error => { }
      //                   )
      //                 console.log('kjhsfksh55555', this.bookingId);
      //               },
      //               error => { }
      //             )

      //         },
      //         error => { }
      //       )


      //   },
      //   error => { }

      // )
    }
    else {
      this.toastrService.error('Booking not Confirmed', '', {
        timeOut: 4000
      });
    }

  }


  getPlanPaymentForm(value) {
    this.frontVlaue = value;
    this.installmentPaymentId = value['id'];
    console.log('kdjlkajd', this.frontVlaue);
  }

  approvedRequest() {
    console.log('bokkinggggggggappppp33331', this.installmentPaymentId);
    let patchData = {};
    //  patchData['amount']= this.frontVlaue.amount;
    this.btnLoader1 = true;
    patchData['amount'] = (<HTMLInputElement>document.getElementById('amount')).value;
    patchData['status'] = 'approved';

    this.service.updateInstallmentPayments(patchData, this.installmentPaymentId).subscribe
      (
        data => {
          this.btnLoader1 = false;
          patchData['amount'] = (<HTMLInputElement>document.getElementById('amount')).value;
          _.remove(this.installmentPaymentList, { id: this.installmentPaymentId });
          document.getElementById('closePopup').click();
          this.toastrService.success('Payment is Approved', '', {
            timeOut: 4000
          });
          this.btnLoader1 = false;
          console.log('bokkinggggggggappppp333399', (<HTMLInputElement>document.getElementById('amount')).value);
        },
        error => {
          this.btnLoader1 = false;
        }
      )
  }

  getReject(value) {
    this.installmentPaymentId = value['id'];
    console.log('fkdhfkhshkh', value, this.installmentPaymentId);

  }
  rejectedPayment() {
    this.btnLoader = true;
    let patchData = {};
    patchData['status'] = 'rejected';
    this.service.updateInstallmentPayments(patchData, this.installmentPaymentId).subscribe
      (
        data => {
          this.btnLoader = false;
          console.log('dhsagadhgajg09', patchData['status']);
          _.remove(this.installmentPaymentList, { id: this.installmentPaymentId });
          document.getElementById('closePoppup').click();
          this.toastrService.success('Payment is Rejected', '', {
            timeOut: 4000
          });
          this.btnLoader = false;
        },
        error => {
          this.btnLoader = false;
        }
      )
  }

  // history section

  getinstallmentPayment() {
    this.service.getInstallmentPaymentsHistory().subscribe
      (
        data => {
          this.historyList = data;
          this.Filtered = this.historyList;
          console.log('historyyy', this.historyList);
        },
        error => { }
      )
  }
  searchByProperty(name: any) {
    console.log('jksadhh1234 name', name);
    console.log('1321646477 history', this.historyList);
    if (name) {
      this.Filtered = this.historyList.filter(value => {
        return value.unit.property.name == name;
      });

      console.log('kfh66666 filterd', this.Filtered);
    } else {
      this.Filtered = this.historyList;
      console.log('fsh888', this.Filtered = this.historyList)
    }

  }

  searchByNameHistory(customerName) {

    this.Filtered = this.historyList.filter(a => a.customer.username.toLowerCase().indexOf(customerName) > -1);
  }
  searchByPropertyPending(name: any) {
    console.log('jksadhh1234 nameppppp', name);
    console.log('1321646477 historypppppp', this.FilterdTwo = this.installmentPaymentList.filter(value => {
      return value.unit.property.name === 'Property Type On';
    }));
    if (name) {
      this.FilterdTwo = this.installmentPaymentList.filter(value => {
        return value.unit.property.name === name;
      });

      console.log('kfh66666 filterd2222', this.FilterdTwo);
    } else {
      this.FilterdTwo = this.installmentPaymentList;
      console.log('fsh8882222', this.FilterdTwo = this.installmentPaymentList)
    }
  }

  searchByNameHistoryPending(customerName) {
    this.FilterdTwo = this.installmentPaymentList.filter(a => a.customer.username.toLowerCase().indexOf(customerName) > -1);
  }
  viewDetails(value) {
    this.paymentId = value.id;
    this.detailPayment = value;
    this.filesId = value.fileids.split(',');

    console.log('length of the file ids===========', this.filesId);

    this.filesId.forEach(element => {
      console.log('element==============', element);



      this.service.getViewDetail(element).subscribe
        (
          data => {
            this.viewDetailsList = data;
            console.log('detai;s555554444444', this.viewDetailsList);
            let imageUrlTemp = data['url'].split('/');
            console.log('detai;s55555', imageUrlTemp);
            imageUrlTemp.splice(0, 2);
            let imageUrll = imageUrlTemp.join('/');

            console.log('imageeeeeeee', environment.baseURL + '/' + imageUrll);
            this.imageUrl.push(environment.baseURL + '/' + imageUrll);
            console.log('dsajhggggggaaa', this.imageUrl);


          },
          error => { }
        )
    });





    // console.log('viewwwwwwwww11111', b);

  }

  // getViewDetails() {


  // }
  amountCalculated(value, index) {
    // this.installmentList.splice(index,1,value);
    let updatedAmount = 0;
    this.installmentList.forEach(element => {

      updatedAmount = updatedAmount + parseInt(element.amount, 10);

    });
    this.addAmount = this.planAmount - updatedAmount;

  }

}
