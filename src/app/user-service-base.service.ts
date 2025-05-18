import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map, of } from 'rxjs';

import { IActionResponse, IFetchUsersWithFiltersApiResponse, IFilters, IPagination } from './model/app.model';
import { IUser } from './model/user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class UserServiceBaseService {

    constructor(
        private httpClient: HttpClient,
    )
    {}

    public fetchUsersWithFilters(filters: IFilters, search: string, pagination: IPagination):
    Observable<IActionResponse<IFetchUsersWithFiltersApiResponse | any>>
    {
        return this.httpClient.post<IFetchUsersWithFiltersApiResponse>('http://localhost:3339/users', {
            page: pagination.page,
            pageSize: pagination.pageSize,
            filters,
            search,
        })
            .pipe(

                map((response) =>
                    ({
                        isSuccessful: true,
                        payload: response,
                    }),
                ),

                catchError(errResponse =>
                    of({
                        isSuccessful: false,
                        payload: errResponse,
                    }),
                ),
            );
    }

    public updateCurrentUser(currentUser: Partial<IUser>): Observable<IActionResponse<IUser | any>>
    {
        return this.httpClient.put<IUser>('http://localhost:3339/user', currentUser)
            .pipe(

                map((response) =>
                    ({
                        isSuccessful: true,
                        payload: response,
                    }),
                ),

                catchError(errResponse =>
                    of({
                        isSuccessful: false,
                        payload: errResponse,
                    }),
                ),
            );
    }

    public fetchCurrentUser(): Observable<IActionResponse<IUser | any>>
    {
        return this.httpClient.get<IUser>('http://localhost:3339/user')
            .pipe(

                map((response) =>
                    ({
                        isSuccessful: true,
                        payload: response,
                    }),
                ),

                catchError(errResponse =>
                    of({
                        isSuccessful: false,
                        payload: errResponse,
                    }),
                ),
            );
    }
}
