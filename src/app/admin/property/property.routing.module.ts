import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyComponent } from './property.component';
import { CreatePropertyComponent } from './create-property/create-property.component';
import { PropertyTypeComponent } from './property-type/property-type.component';
import { UnitDetailComponent } from './unit-detail/unit-detail.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { CreatePlanComponent } from './create-plan/create-plan.component';
import { EditPlanComponent } from './edit-plan/edit-plan.component';


const routes: Routes = [
    {
        path: '',
        component: PropertyComponent
    },
    {
        path: 'create-property',
        component: CreatePropertyComponent
    },
    {
        path: 'create-plan',
        component: CreatePlanComponent
    },
    {
        path: 'edit-property',
        component: EditPropertyComponent
    },
    {
        path: 'edit-plan',
        component: EditPlanComponent
    },
    {
        path: 'property-type',
        component: PropertyTypeComponent
    },
    {
        path: 'unit-detail',
        component: UnitDetailComponent
    },
    {
        path: '',
        redirectTo: 'admin/property',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PropertyRoutingModule {
}
