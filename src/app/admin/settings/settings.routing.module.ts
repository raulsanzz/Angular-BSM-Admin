import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { SettingsUnitsComponent } from './settings-units/settings-units.component';
import { CreateUnitsComponent } from './create-units/create-units.component';




const routes: Routes = [
    {
        path: '',
        component: SettingsComponent
    },
    {
        path: 'settings-units',
        component: SettingsUnitsComponent
    },
    {
        path: 'create-units',
        component: CreateUnitsComponent
    },
    {
        path: '',
        redirectTo : 'admin/settings',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SettingsRoutingModule{}
