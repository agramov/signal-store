import { Injectable, computed, effect, linkedSignal, resource, signal } from '@angular/core';

import { IFilters, IGridConfig, IPagination } from '../model/app.model';
import { UserStateService } from './user-state.service';

@Injectable({ providedIn: 'root' })
export class DashboardService
{
    private pagination: IPagination = {
        page: 1,
        pageSize: 10,
    };

    public gridConfig_ = signal<IGridConfig>({
        isLoading: true,
        rows: [],
        pagination: this.pagination,
    });

    private filters: IFilters = {};

    private search: string = '';

    constructor(private userService: UserStateService)
    {
        let isUserInfoInitialized = false;
        effect(() =>
        {
            //
            // Effects always emit at least once, here we filter out the initial 2 events
            //
            if (userService.userState.currentUser())
            {
                if (!isUserInfoInitialized)
                {
                    isUserInfoInitialized = true;
                }
                else
                {
                    this.fetchFromServer();
                }
            }
        });

        // const userResource = resource({
        //     // Define a reactive request computation.
        //     // The request value recomputes whenever any read signals change.
        //     request: () => ({id: userService.userInfo_()}),
        //     // Define an async loader that retrieves data.
        //     // The resource calls this function every time the `request` value changes.
        //     loader: ({request}) => {
        //         // console.log('loader', request)
        //         this.fetchFromServer();
        //         return Promise.resolve(this.gridConfig_());
        //     },
        // });

            // console.log('userResource.val', userResource.value());

        // effect(() =>
        // {
        //     console.log('state refetched', userResource.value());
        // });
    }

    public setPagination(pagination: Partial<IPagination>)
    {
        this.pagination = {
            ...this.pagination,
            ...pagination,
        };

        this.fetchFromServer(this.filters, this.search, this.pagination);
    }

    public setFilters(filters: IFilters)
    {
        this.filters = filters;
        this.fetchFromServer(this.filters, this.search, this.pagination);
    }
  
    public setSearch(search: string)
    {
        this.search = search;
        this.fetchFromServer(this.filters, this.search, this.pagination);
    }

    public fetchFromServer(filters: IFilters = this.filters, search: string = this.search, pagination: IPagination = this.pagination)
    {
        this.gridConfig_.update(config => ({
            ...config,
            isLoading: true,
        }));

        this.userService.fetchUsersWithFilters(filters, search, pagination)
            .subscribe((actionResponse) =>
            {
                if (actionResponse.isSuccessful)
                {
                    const serverResponse = actionResponse.payload;

                    this.gridConfig_.set({
                        rows: serverResponse.results,
                        pagination: {
                            page: serverResponse.page,
                            pageSize: serverResponse.pageSize,
                            total: serverResponse.total,
                        },
                        isLoading: false,
                    });
                }
            });
    }
}
