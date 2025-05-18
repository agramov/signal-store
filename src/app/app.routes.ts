import { Routes } from '@angular/router';
import { PushSignalsComponent } from './push-signals/push-signals.component';

export const routes: Routes = [
    
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    },
    {
        path: 'home',
        component: PushSignalsComponent,
    },
];
