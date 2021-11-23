import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConservationComponent } from './conservation.component';
import { ConservationRoutingModule } from './conservation.routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ConservationRoutingModule
    ],
    declarations: [
        ConservationComponent
    ],
    providers: []
})

export class ConservationModule {

}

