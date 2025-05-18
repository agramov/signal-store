import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PushSignalsComponent } from './push-signals.component';

const routes: Routes = [
    {
        path: '',
        component: PushSignalsComponent,
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class PushSignalsRoutingModule { }
