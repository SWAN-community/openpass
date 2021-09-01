import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnloggedComponent } from './unlogged.component';
<<<<<<< HEAD:OpenPass.IdController.UI/projects/widget/src/app/containers/identification/unlogged/unlogged.component.spec.ts
import { DEPLOY_URL, WINDOW } from '@utils/injection-tokens';
import { windowFactory } from '@utils/window-factory';
import { PipesModule } from '@pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { EventTrackingService } from '@rest/event-tracking/event-tracking.service';
import { MessageSubscriptionService } from '@services/message-subscription.service';
import { Observable } from 'rxjs';
=======
import { DEPLOY_URL, WINDOW } from '../../utils/injection-tokens';
import { windowFactory } from '../../utils/window-factory';
import { PipesModule } from '../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f:OpenPass.IdController.UI/projects/widget/src/app/containers/unlogged/unlogged.component.spec.ts

describe('UnloggedComponent', () => {
  let component: UnloggedComponent;
  let fixture: ComponentFixture<UnloggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnloggedComponent],
      imports: [PipesModule, TranslateModule.forRoot()],
      providers: [
        { provide: WINDOW, useFactory: windowFactory },
        { provide: DEPLOY_URL, useFactory: () => {} },
        { provide: MessageSubscriptionService, useValue: { destroyTokenListener: () => {} } },
        { provide: EventTrackingService, useFactory: () => ({ track: () => new Observable() }) },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnloggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
