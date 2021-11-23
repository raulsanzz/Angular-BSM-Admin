import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GalleryComponent} from './gallery.component';

const routes: Routes = [
    {
        path: '',
        component: GalleryComponent
    },
    {
        path: '',
        redirectTo : 'admin/gallery',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
