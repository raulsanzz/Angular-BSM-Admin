import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/common/auth.service';
import {environment} from '../../../environments/environment';

import {FormGroup,FormControl, FormBuilder, Validators} from '@angular/forms';
import {ConversationService} from './conversation.service';
@Component({
  selector: 'app-conservation',
  templateUrl: './conservation.component.html',
  styleUrls: ['./conservation.component.scss'],
})
export class ConservationComponent implements OnInit {
  customers: any = [];
  projectTypeId: number;
  projects: any = [];
  buildingName: string;
  SendMessageForm = this.fb.group({
    message: ['', Validators.required ],
  });

  message = new FormControl('');
  constructor(
    private fb: FormBuilder,
    private service: ConversationService,
    private authService: AuthService,
    
  ) {}

  ngOnInit() {
    console.log('this part is running');
    this.getClientsByProjectId();
    const local = this.authService.getUser();
    this.buildingName = local.name;
    console.log('++++++++++', this.authService.getUser());
  }
  
  async getImage(imageId) {
    const tt = await this.service.getViewDetail(imageId).toPromise();
    return tt['url'];
  }
  getAllClients() {
    console.log('Hy this is me');
    this.service.getCustomersConversation().subscribe((data: {}) => {
      this.customers = data;
      console.log(data);
    });
  }
  getClientsByProjectId() {

    const userData = this.authService.getUser();
    console.log('listttttt ', userData.projectId);
    this.service.getCustomersByProjectId(userData.projectId).subscribe(
      data => {
        this.customers = data;
        this.projects = data['id'];
        console.log('listttttt ', this.customers);
      },
      error => {},
    );
  }
  sendmsg(){
    if(this.SendMessageForm.valid){
      this.service.sendMessage(this.SendMessageForm.value)
      .subscribe( data => {
        console.log(data);
      });
    }
  
  }
}
