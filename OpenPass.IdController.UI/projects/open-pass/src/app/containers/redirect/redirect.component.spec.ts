import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectComponent } from './redirect.component';
import { stub } from '@utils/stub-factory';
import { WINDOW } from '@utils/injection-tokens';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { EventsService } from '@rest/events/events.service';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '@services/auth.service';
import { DialogWindowService } from '@services/dialog-window.service';
import { stub } from '@utils/stub-factory';
import { EventsTrackingService } from '@services/events-tracking.service';

describe('RedirectComponent', () => {
  let component: RedirectComponent;
  let fixture: ComponentFixture<RedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, NgxsModule.forRoot(), TranslateModule.forRoot()],
<<<<<<< HEAD:OpenPass.IdController.UI/projects/open-pass/src/app/containers/redirect/redirect.component.spec.ts
      declarations: [RedirectComponent],
      providers: [stub(WINDOW), stub(EventsService)],
=======
      providers: [stub(AuthService), stub(DialogWindowService), stub(EventsTrackingService, { trackEvent: () => {} })],
      declarations: [MainViewComponent],
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f:OpenPass.IdController.UI/projects/open-pass/src/app/containers/unauthenticated/main-view/main-view.component.spec.ts
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
