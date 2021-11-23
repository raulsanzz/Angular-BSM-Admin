import {Injectable} from '@angular/core';
import {AuthService} from 'src/app/common/auth.service';

@Injectable()
export class PropertyService {
  constructor(private authService: AuthService) {}
  saveProperty(data, id) {
    return this.authService.postCall(`Projects/${id}/properties`, data);
  }

  getProperty(id) {
    // Admins/44/project/properties
    // return this.authService.getCall(
    //   `Admins/${this.authService.getUser().userId}/project/properties`,
    // );
    return this.authService.getCall(`Projects/${id}/properties?filter={"include":["plans"]}`);
  }
  getbuilding() {
    return this.authService.getCall(
      `Admins/${this.authService.getUser().userId}/project`,
    );
  }

  editProperty(data, id) {
    return this.authService.updateCall(
           `properties/${id}`,
            data,  );
  }

  savePaymentPlan(data, id) {
    return this.authService.postCall(`Plans/${id}/planInstallments`, data);
  }
  getpaymentPlan(id) {
    return this.authService.getCall(`Plans/${id}/planInstallments`);
  }
  updatepaymentPlan(data, id) {
    return this.authService.updateCall(`PlanInstallments/${id}`, data);
  }

  postPlan(data, id) {
    return this.authService.postCall(`Properties/${id}/plans`, data);
  }
  getPostPlans(id) {
    return this.authService.getCall(`Properties/${id}/plans`);
  }
  getUnitPlan(id){
    return this.authService.getCall(`Plans/${id}`)
  }
  updatePostPlan(data, id) {
    return this.authService.updateCall(`plans/${id}`, data);
  }
  saveUnits(data, id) {
    return this.authService.postCall(`Properties/${id}/units`, data);
  }
  getUnits(id) {
    return this.authService.getCall(`Properties/${id}/units?filter={"include":[{"relation":"installmentPayments","scope":{"where":{"status":"approved"}}},{"relation":"booking","scope":{"include":["customer"]}}]}`);
  }
  updateUnits(data, id) {
    return this.authService.updateCall(`Units/${id}`, data);
  }
  saveUnitPlan(data){
    return this.authService.postCall('Plans', data);
  }

  getUnitPayment(id){
    return this.authService.getCall(`Units/${id}/installmentPayments?filter={"order":["date DESC"]}`);
  }

  saveUploadFile(data){
    return this.authService.postCall(`CustomFiles/upload`, data);
  }
  getViewDetail(id){
    return this.authService.getCall(`CustomFiles/${id}`);
  }

  getUnitAttributes(){
    const data = this.authService.getUser();
    return this.authService.getCall('lkpStatuses?filter={"where":{"projectId":'+ data.projectId +',"type":"unitAttribute"}}');
  }
}

