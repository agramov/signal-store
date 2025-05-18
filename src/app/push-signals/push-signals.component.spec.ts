import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushSignalsComponent } from './push-signals.component';

describe('PushSignalsComponent', () => {
  let component: PushSignalsComponent;
  let fixture: ComponentFixture<PushSignalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PushSignalsComponent]
    });
    fixture = TestBed.createComponent(PushSignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
