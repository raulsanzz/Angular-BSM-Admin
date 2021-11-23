import {Injectable} from '@angular/core';
import {AuthService} from 'src/app/common/auth.service';
@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  constructor(private authService: AuthService) {}

  getCustomersByProjectId(id) {
    return this.authService.getCall(`Projects/${id}/customers`);
  }
  getCustomersConversation() {
    return this.authService.getCall(`Customers`);
  }
  sendMessage(data) {
    return this.authService.postCall(`Chats`, data);
  }
  getchat() {
    const data = this.authService.getUser();
    return this.authService.getCall('Chats?filter={"where":{"sentBy":"Admin"}}');
  }
  getbuilding() {
    return this.authService.getCall(
      `Admins/${this.authService.getUser().userId}/project`,
    );
  }
  getViewDetail(id) {
    return this.authService.getCall(`CustomFiles/${id}`);
  }
}
