import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpWidgetComponent } from './otp-widget.component';
<<<<<<< HEAD:OpenPass.IdController.UI/projects/widget/src/app/containers/identification/otp-widget/otp-widget.component.spec.ts
import { windowFactory } from '@utils/window-factory';
import { DEPLOY_URL, WINDOW } from '@utils/injection-tokens';
import { PipesModule } from '@pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { EventTrackingService } from '@rest/event-tracking/event-tracking.service';
import { MessageSubscriptionService } from '@services/message-subscription.service';
import { Observable } from 'rxjs';
=======
import { windowFactory } from '../../utils/window-factory';
import { DEPLOY_URL, WINDOW } from '../../utils/injection-tokens';
import { PipesModule } from '../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f:OpenPass.IdController.UI/projects/widget/src/app/containers/otp-widget/otp-widget.component.spec.ts

describe('OtpWidgetComponent', () => {
  let component: OtpWidgetComponent;
  let fixture: ComponentFixture<OtpWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtpWidgetComponent],
      imports: [PipesModule, TranslateModule.forRoot()],
      providers: [
        { provide: WINDOW, useFactory: windowFactory },
        { provide: DEPLOY_URL, useFactory: () => {} },
        { provide: EventTrackingService, useFactory: () => ({ track: () => new Observable() }) },
        { provide: MessageSubscriptionService, useValue: { destroyTokenListener: () => {} } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
