import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutingModule } from './authentication.routing';
import { LandaingPageComponent } from './landaing-page/landaing-page.component';
import { AuthenticationService } from './authentication.service';
import { LaddaModule } from 'angular2-ladda';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AuthenticationRoutingModule,
        LaddaModule
    ],
    declarations: [
        LoginComponent,
        LandaingPageComponent
    ],
    providers: [
        AuthenticationService
    ]
})
export class AuthenticatioModule {

}
