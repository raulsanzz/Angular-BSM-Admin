import {Injectable} from '@angular/core';
import { AuthService } from 'src/app/common/auth.service';

@Injectable()
export class  PaymentService{
    constructor(private authService: AuthService) {}

getInstallmentPayments(){
  const data = this.authService.getUser();
return this.authService.getCall
('InstallmentPayments?filter={"order":["date DESC"],"where":{"projectId": '+ data.projectId +  ',"status":"pending"},"include":["customer",{"relation":"unit","scope":{"include":{"relation":"property"}}}]}');
}

getpaymentPlan(id) {
    return this.authService.getCall(`Plans/${id}/planInstallments`);
  }
  getPostPlans(id) {
    return this.authService.getCall(`Properties/${id}/plans`);
  }

  getUnit(id){
      return this.authService.getCall(`Units/${id}`);
  }
  saveUnitPlan(data){
    return this.authService.postCall('Plans', data);
  }

  savePaymentPlan(data, id) {
    return this.authService.postCall(`Plans/${id}/planInstallments`, data);
  }
  updateUnits(data, id) {
    return this.authService.updateCall(`Units/${id}`, data);
  }

  customerbooking(data, id){
    return this.authService.postCall(`Customers/${id}/bookings`, data);
  }
  updateInstallmentPayments(data, id){
    return this.authService.updateCall(`InstallmentPayments/${id}`, data);
  }
   getInstallmentPaymentsHistory(){
    const data = this.authService.getUser();
    return this.authService.getCall
    ('InstallmentPayments?filter={"order":["date DESC"],"where":{"and":[{"projectId":'+ data.projectId +'},{"or":[{"status":"approved"},{"status":"rejected"}]}]},"include":["customer",{"relation":"unit","scope":{"include":{"relation":"property"}}}]}');
  }
   getProperty(id) {
   
    return this.authService.getCall(`Projects/${id}/properties`);
  }

  getViewDetail(id){
    return this.authService.getCall(`CustomFiles/${id}`);
  }

  makeBooking(data){
    return this.authService.postCall(`Bookings/makeBooking`, data);
  }

}