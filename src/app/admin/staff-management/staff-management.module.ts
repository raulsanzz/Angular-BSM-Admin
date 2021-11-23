import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaffManagementComponent } from './staff-management.component';
import { StaffManagementRoutingModule } from './staff-management.routing.module';
import { NewStaffComponent } from './new-staff/new-staff.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        StaffManagementRoutingModule
    ],
    declarations: [
       StaffManagementComponent,
       NewStaffComponent
    ],
    providers: []
})

export class StaffManagementModule {
}
