import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoicesComponent } from './invoices.component';


const routes: Routes = [
    {
        path: '',
        component: InvoicesComponent
    },
    {
        path: '',
        redirectTo : 'admin/invoices',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class  InvoiceRoutingModule{}
