import { computed, effect, inject } from '@angular/core';

import { pipe, switchMap, tap } from 'rxjs';
import { UserServiceBaseService } from '../user-service-base.service';
import { IUser } from '../model/user.model';
import { getState, patchState, signalStore, watchState, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { withRequestStatus } from './user.store.features';
import { addEntity, removeEntities, updateAllEntities, withEntities } from '@ngrx/signals/entities';
import { IActionResponse } from '../model/app.model';

interface IUserState {
    _id: null | string;
    currentUser: IUser | null;
    userStatus: 'active' | 'offline' | null;
    isLoading?: boolean;
    
}

const initialUserState: IUserState = {
    _id: null,
    currentUser: null,
    userStatus:  null,
}

export const UserStore = signalStore(
    withRequestStatus(),

    withEntities<IUser>(),

    withState(initialUserState),

    withComputed(({ currentUser }) => ({
        email: computed(() => currentUser()?.email),
    })),
    
    withProps(() => ({
        userService: inject(UserServiceBaseService),
    })),

    withHooks({
        onInit(store) {
            watchState(store, (state) => {
                console.log('[watchState] counter state', state);
            });
            
            effect(() => {
                console.log('[effect] counter state', getState(store));
            });
        },
    }),

    withMethods((store) => ({
        fetchCurrentUser: rxMethod<void>(
            pipe(
                tap(() => patchState(store, { isLoading: true, requestStatus: 'pending' })),
                switchMap(() => {
                    return store.userService.fetchCurrentUser().pipe(
                        tapResponse({
                            next: (actionResponse: IActionResponse<IUser | any>) => {

                                if (actionResponse.isSuccessful)
                                {
                                    patchState(store, {
                                        currentUser: actionResponse.payload,
                                        _id: actionResponse.payload.userId,
                                        isLoading: false,
                                        requestStatus: 'fulfilled'
                                    });

                                    patchState(store, );
                                }
                                else
                                {
                                    console.error(actionResponse.payload);
                                    patchState(store, { isLoading: false, requestStatus: { error: actionResponse.payload}});
                                }
                                
                            },
                            error: (err) => {
                                console.error(err);
                            },
                        })
                    );
                })
            )
        ),

        updateCurrentUser: rxMethod<string>(
            pipe(
                tap(() => patchState(store, { isLoading: true })),
                switchMap((input) => {
                    return store.userService.updateCurrentUser({ displayName: input }).pipe(
                        tapResponse({
                            next: (actionResponse) => {

                                if (actionResponse.isSuccessful)
                                {
                                    patchState(store, {
                                        currentUser: actionResponse.payload,
                                        _id: actionResponse.payload.id,
                                    })
                                }
                                else
                                {
                                    console.error(actionResponse.payload);
                                }
                                
                                patchState(store, { isLoading: false });
                            },
                            error: (err) => {
                                console.error(err);
                            },
                        })
                    );
                })
            )
        ),

        addUser(user: IUser): void {
            patchState(store, addEntity(user));
        },

        removeUsersStartingWithA(): void {
            patchState(store, removeEntities(({ displayName }) => displayName.at(0) === 'A' ));
        },
        
    }))
);