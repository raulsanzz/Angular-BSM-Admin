import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaymentsComponent } from './payments.component';
import { PaymentsRoutingModule } from './payments.routing.module';
import { PaymentService } from './payments.service';
import { LaddaModule } from 'angular2-ladda';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        PaymentsRoutingModule,
        LaddaModule
        
    ],
       
    declarations: [
       PaymentsComponent
    ],
    providers: [
        PaymentService
    ]
})

export class PaymentsModule {}
