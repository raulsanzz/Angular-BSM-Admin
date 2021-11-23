import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HeaderComponent} from './admin/header/header.component';
import {AuthenticationGuard} from './common/authentication.guard';
import {AuthGuard} from './common/auth.guard';
import {GalleryModule} from './admin/gallery/gallery.module';

const routes: Routes = [
  {
    path: 'admin',
    component: HeaderComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'property',
        loadChildren: 'src/app/admin/property/property.module#PropertyModule',
      },
      {
        path: 'payments',
        loadChildren: 'src/app/admin/payments/payments.module#PaymentsModule',
      },
      {
        path: 'conservation',
        loadChildren:
          'src/app/admin/conservation/conservation.module#ConservationModule',
      },
      {
        path: 'staffmanagement',
        loadChildren:
          'src/app/admin/staff-management/staff-management.module#StaffManagementModule',
      },
      {
        path: 'usermanagement',
        loadChildren:
          'src/app/admin/user-management/user-management.module#UserManagementModule',
      },

        {
          path: 'gallery',
            loadChildren: 'src/app/admin/gallery/gallery.module#GalleryModule',
        },
        {
          path: 'settings',
            loadChildren: 'src/app/admin/settings/settings.module#SettingsModule',
        },
      {
        path: 'overview',
        loadChildren: 'src/app/admin/overview/overview.module#OverviewModule',
      },
    ],
  },
  {
    path: 'auth',
    canActivate: [AuthenticationGuard],
    loadChildren:
      'src/app/authentication/authentication.module#AuthenticatioModule',
  },
  {
    path: 'auth',
    redirectTo: 'auth/login',
  },
  {
    path: 'auth',
    redirectTo: 'auth/landing-page',
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
