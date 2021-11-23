import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverviewComponent } from './overview.component';
import { OverviewRoutingModule } from './overview.routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        OverviewRoutingModule
    ],
    declarations: [
        OverviewComponent
    ],
    providers: []
})

export class OverviewModule {}
