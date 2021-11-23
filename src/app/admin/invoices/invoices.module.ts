import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InvoicesComponent } from './invoices.component';
import { InvoiceRoutingModule } from './invoices.routing.module';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        InvoiceRoutingModule
    ],
       
    declarations: [
       InvoicesComponent
    ],
    providers: []
})

export class InvoiceModule {}
