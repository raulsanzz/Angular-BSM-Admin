import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffManagementComponent } from './staff-management.component';
import { NewStaffComponent } from './new-staff/new-staff.component';

const routes: Routes = [
    {
        path: '',
        component: StaffManagementComponent
    },
    {
        path: 'new-staff',
        component: NewStaffComponent
    },
    {
        path: '',
        redirectTo : 'admin/staffmanagement',
        pathMatch: 'full'
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class StaffManagementRoutingModule {
}
