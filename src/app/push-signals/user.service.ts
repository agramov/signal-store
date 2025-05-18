import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';
import { UserServiceBaseService } from '../user-service-base.service';
import { IUser } from '../model/user.model';
import { IActionResponse } from '../model/app.model';
import { signalState } from '@ngrx/signals';


@Injectable({
    providedIn: 'root',
})
export class UserService extends UserServiceBaseService
{
    public userInfo_ = signal<IUser | null>(null);

    constructor(
        httpClient: HttpClient,
    )
    {
        super(httpClient);

        this.fetchCurrentUser()
            .subscribe((actionResponse) =>
            {
                if (actionResponse.isSuccessful)
                {
                    this.userInfo_.set(actionResponse.payload);
                    
                }
                else
                {
                    console.error('Something went wrong...');
                }
            });
    }

    public override updateCurrentUser(currentUser: Partial<IUser>): Observable<IActionResponse<IUser | any>>
    {
        return super.updateCurrentUser(currentUser)
            .pipe(

                tap((response) =>
                {
                    if (response.isSuccessful)
                    {
                        this.userInfo_.set(response.payload);
                    }
                }),
            );
    }

}
