import { Injectable, OnInit, computed, effect, linkedSignal, resource, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SignalDemoService
{
    // userSignal_ = signal<{ username: string; id?: string }>({ username: 'test', id: 'testId' });

    // constructor() {

    //     effect(() => {
    //         console.log('effect', computedUsername()); // 
    //     });

    //     this.userSignal_.set({ username: 'test123' }); 

    //     const computedUsername = computed(() => {
    //         return this.userSignal_().username + '345';
    //     })
    // }

    // userSignal_ = signal<{ username: string; id?: string }>({ username: 'test', id: 'testId' });

    constructor() {
        
//   const signalTest_ = signal('probe 0');

//         signalTest_.set('probe 1');

//         effect(() => {
//             console.log('DashboardComponent effect', signalTest_());
//         });

//         signalTest_.set('probe 2');
        
//         setTimeout(() => {
//             signalTest_.set('probe 4');
//         })

//         queueMicrotask(() => {
//             signalTest_.set('probe 5');
//         })

//         signalTest_.set('probe3');

        // const signalTest_ = signal('probe');

        // signalTest_.set('probe1');

        // effect(() => {
        //     console.log('DashboardComponent effect', signalTest_());
        // });

        // signalTest_.set('probe2');
        
        // setTimeout(() => {
        //     signalTest_.set('probe 4');
        // })

        // signalTest_.set('probe3');

        // effect(() => {
        //     console.log('effect', linkedUsername());
        // });
        
        // this.userSignal_(); // { username: "test", id: "testId" };

        // Promise.resolve().then(() => {
        //     console.log('microtask 1');
        // })

        // this.userSignal_.set({ username: 'test123' }); 

        // this.userSignal_(); // { username: "test123" };

        // this.userSignal_.update((userObj) => ({ ...userObj, id: 'testId2' })); 

        // this.userSignal_(); // { username: "test123", id: "testId2" };

        // const computedUsername = computed(() => {
        //     return this.userSignal_().username + '345';
        // })

        // computedUsername(); // "test123345"

        // const linkedUsername = linkedSignal({

        //     source: computedUsername,

        //     computation: (current, previous) => {
        //         return { 
        //             currentUsername: current,
        //             previousUsername: previous?.source,
        //         };
        //     },
        // });
        
        // setTimeout(() => {
        //     console.log('macrotask 1');
        // })


        // setTimeout(() => {
        //     console.log('macrotask 2');
        // })


        // new Promise(() => {
        //     setTimeout(() => {
        //         console.log('macrotask update');
        //         this.userSignal_.update((userObj) => ({ ...userObj, username: '9999' })); 

        //     }, 1000);
        // }).then(() => {
        //     console.log('microtask 3');
        // })
        
        // setTimeout(() => {
        //     console.log('macrotask update2');
        //     this.userSignal_.update((userObj) => ({ ...userObj, username: '11111' })); 

        // }, 5000)

        // linkedUsername(); // { currentUsername: "test123345", previousUsername: undefined, }

        // this.userSignal_.update((userObj) => ({ ...userObj, username: 'test678' })); 

        // linkedUsername(); // { currentUsername: "test678345", previousUsername: "test123345", }

        // linkedUsername.set('test123');

        // linkedUsername(); // "test123"

    }



}
