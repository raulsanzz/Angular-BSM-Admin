import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertyComponent } from './property.component';
import { PropertyRoutingModule } from './property.routing.module';
import { CreatePropertyComponent } from './create-property/create-property.component';
import { PropertyTypeComponent } from './property-type/property-type.component';
import { UnitDetailComponent } from './unit-detail/unit-detail.component';
import { PropertyService } from './property.service';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { CreatePlanComponent } from './create-plan/create-plan.component';
import { EditPlanComponent } from './edit-plan/edit-plan.component';
import { NoRecordFoundModule } from 'src/app/common/directives/no-record/no-record.module';
// import { AngularMultiSelectModule } from 'angular4-multiselect-dropdown/angular4-multiselect-dropdown';

import { LaddaModule } from 'angular2-ladda';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PropertyRoutingModule,
        NoRecordFoundModule,
        LaddaModule,
        NgMultiSelectDropDownModule
    ],
    declarations: [
        PropertyComponent,
        CreatePropertyComponent,
        PropertyTypeComponent,
        UnitDetailComponent,
        EditPropertyComponent,
        CreatePlanComponent,
        EditPlanComponent
    ],
    providers: [
        PropertyService
        
    ]
})

export class PropertyModule {
}
