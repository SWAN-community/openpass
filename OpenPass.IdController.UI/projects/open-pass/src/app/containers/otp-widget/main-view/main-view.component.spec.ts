import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainViewComponent } from './main-view.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
<<<<<<< HEAD:OpenPass.IdController.UI/projects/open-pass/src/app/containers/otp-widget/main-view/main-view.component.spec.ts
import { EventsService } from '@rest/events/events.service';
=======
import { EventsTrackingService } from '@services/events-tracking.service';
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f:Criteo.IdController.UI/projects/open-pass/src/app/containers/otp-widget/main-view/main-view.component.spec.ts
import { stub } from '@utils/stub-factory';
import { AuthService } from '@services/auth.service';
import { DialogWindowService } from '@services/dialog-window.service';
import { PostMessagesService } from '@services/post-messages.service';
<<<<<<< HEAD:OpenPass.IdController.UI/projects/open-pass/src/app/containers/otp-widget/main-view/main-view.component.spec.ts
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'usrf-open-pass-details',
  template: '',
})
class StubOpenPassDetailsComponent {
  @Input() name: string;
}
=======
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f:Criteo.IdController.UI/projects/open-pass/src/app/containers/otp-widget/main-view/main-view.component.spec.ts

describe('MainViewComponent', () => {
  let component: MainViewComponent;
  let fixture: ComponentFixture<MainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), NgxsModule.forRoot()],
      declarations: [MainViewComponent, StubOpenPassDetailsComponent],
      providers: [
<<<<<<< HEAD:OpenPass.IdController.UI/projects/open-pass/src/app/containers/otp-widget/main-view/main-view.component.spec.ts
        stub(EventsService, { trackEvent: () => new Observable() }),
=======
        stub(EventsTrackingService, { trackEvent: () => {} }),
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f:Criteo.IdController.UI/projects/open-pass/src/app/containers/otp-widget/main-view/main-view.component.spec.ts
        stub(AuthService),
        stub(DialogWindowService),
        stub(PostMessagesService),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
