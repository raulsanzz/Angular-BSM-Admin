import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserManagementComponent } from './user-management.component';
import { UserManagementRoutingModule } from './user-management.routing.module';
import { LaddaModule } from 'angular2-ladda';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { PropertyService } from '../property/property.service';
import { UnitDetailsComponent } from './unit-details/unit-details.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UserManagementRoutingModule,
        LaddaModule,
        NgMultiSelectDropDownModule
       
    ],
    declarations: [
        UserManagementComponent,
        UnitDetailsComponent
    ],
    providers: [
        PropertyService
    ]
})

export class UserManagementModule {
}
