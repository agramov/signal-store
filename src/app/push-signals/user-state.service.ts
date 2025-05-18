import { effect, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';
import { UserServiceBaseService } from '../user-service-base.service';
import { IUser } from '../model/user.model';
import { IActionResponse } from '../model/app.model';
import { patchState, signalState } from '@ngrx/signals';


interface IUserState {
    currentUser: IUser | null;
    userStatus: 'active' | 'offline' | null;
}

const initialUserState: IUserState = {
    currentUser: null,
    userStatus:  null,
}

const userState = signalState<IUserState>(initialUserState);


patchState(
    userState,
    {
        userStatus: 'active',
    },
);

console.log(userState()) // { currentUser: null, userStatus: "active" }
console.log(userState.currentUser()) // null
console.log(userState.userStatus()) // "active"

@Injectable({
    providedIn: 'root',
})
export class UserStateService extends UserServiceBaseService
{
    public userState = signalState<IUserState>(initialUserState);

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
                    patchState(
                        this.userState,
                        {
                            currentUser: actionResponse.payload,
                            userStatus: 'active',
                        },
                    );
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

                tap((actionResponse) =>
                {
                    if (actionResponse.isSuccessful)
                    {
                        patchState(
                            this.userState,
                            {
                                currentUser: actionResponse.payload,
                                userStatus: 'active',
                            },
                        );
                    }
                }),
            );
    }

    // protected override fetchCurrentUser(): Observable<IActionResponse<IUser | any>>
    // {
    //     return super.fetchCurrentUser()
    //         .pipe(
    //             tap((response) =>
    //             {
    //                 if (response.isSuccessful)
    //                 {
    //                     this.userInfo_.set(response.payload);
    //                 }
    //             }),
    //         );
    // }


}
