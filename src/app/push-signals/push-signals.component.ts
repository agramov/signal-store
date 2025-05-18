import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClarityModule } from '@clr/angular';
import { UserStateService } from './user-state.service';
import { UserStore } from './user.store';
import { UserServiceBaseService } from '../user-service-base.service';

@Component({
    selector: 'app-push-signals',
    templateUrl: './push-signals.component.html',
    styleUrls: [ './push-signals.component.scss' ],
    standalone: true,
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],

    imports: [
        ClarityModule,
        DashboardComponent,
    ],

    providers: [
        UserStore,
        UserServiceBaseService,
    ]
})
export class PushSignalsComponent implements OnInit
{
    userStore = inject(UserStore);

    constructor()
    {
        // this.userStore.fetchCurrentUser();

        this.userStore.error();
    }

    ngOnInit(): void
    {
        console.log('PushSignalsComponent OnInit');
    }

    changeName()
    {
        this.userStore.updateCurrentUser(`${ Math.floor(Math.random() * 10)}`);
    }
}
