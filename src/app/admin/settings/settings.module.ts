import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { SettingsRoutingModule } from './settings.routing.module';
import { SettingsComponent } from './settings.component';
import { SettingsUnitsComponent } from './settings-units/settings-units.component';
import { CreateUnitsComponent } from './create-units/create-units.component';
import { SettingsService } from './settings.service';
import { UnitDetailComponent } from '../property/unit-detail/unit-detail.component';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        LaddaModule,
        SettingsRoutingModule
        
    ],
       
    declarations: [
        SettingsComponent,
        SettingsUnitsComponent,
        CreateUnitsComponent, 

    ],
    providers: [
        SettingsService
    ]
})

export class SettingsModule {}
