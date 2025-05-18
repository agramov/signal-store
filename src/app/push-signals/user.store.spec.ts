import { TestBed } from '@angular/core/testing';
import { UserStore } from './user.store';
import { UserServiceBaseService } from '../user-service-base.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { deepClone } from '@cds/core/internal';

describe('UserStore', () => {


    const user = {
        "userId": "1ead4028-0a0c-4f7b-93b0-959d9956ed7f",
        "username": "agramov",
        "displayName": "Alexander Gramov2414",
        "email": "me@agramov.com",
        "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/702.jpg",
        "password": "AgvUvtXFBw84K5g",
        "birthdate": "2001-08-09T20:55:05.897Z",
        "registeredAt": "2025-01-09T22:56:31.700Z",
        "roles": [
            "admin",
            "owner",
            "user"
        ]
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserStore, UserServiceBaseService, provideHttpClient()],
        });
    });

    it('should verify that 0 entities are available', () => {

        const store = TestBed.inject(UserStore);

        expect(store.entities()).toEqual([]);
    });

    it('should verify fetchCurrentUser works', () => {

      TestBed.configureTestingModule({
            providers: [
                UserStore, 
                {
                    provide: UserServiceBaseService,  
                    useValue: {
                        fetchCurrentUser: jasmine.createSpy('fetchCurrentUser').and.returnValue(of({ isSuccessful: true, payload: deepClone(user) }))
                    }
                },
                provideHttpClient()],
        });


        const store = TestBed.inject(UserStore);
        const service = TestBed.inject(UserServiceBaseService);

        store.fetchCurrentUser();

        expect(service.fetchCurrentUser).toHaveBeenCalled();
        expect(store.email()).toEqual(user.email);
    });
});
