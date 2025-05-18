import { AfterContentInit, AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, effect, OnInit, signal } from '@angular/core';

import { DashboardService } from '../../dashboard.service';
import { IFilters } from '../../../model/app.model';
import { FilterComponent } from '../filter/filter.component';
import { UserGridComponent } from '../user-grid/user-grid.component';
import { SignalDemoService } from '../../signal-demo.service';
import { UserStateService } from '../../user-state.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    standalone: true,

    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],
    imports: [
        UserGridComponent,
        FilterComponent,
    ],
})
export class DashboardComponent implements OnInit
{
    constructor(
        public service: DashboardService,
        public userService: UserStateService,
        readonly signals: SignalDemoService,
    )
    {
        const signalTest_ = signal('0');

        signalTest_.set('1');

        effect(() => {
            console.log(signalTest_());
        });

        signalTest_.set('2');
        
        setTimeout(() => {
            signalTest_.set('4');
        })

        queueMicrotask(() => {
            signalTest_.set('5');
        })

        signalTest_.set('3');
    }

    ngOnInit(): void {
        console.log('init');
    }

    public handleFilterSelection(filters: IFilters)
    {
        this.service.setFilters(filters);
    }

    public onSearch(event: any)
    {
        this.service.setSearch(event.target.value);
    }
}
