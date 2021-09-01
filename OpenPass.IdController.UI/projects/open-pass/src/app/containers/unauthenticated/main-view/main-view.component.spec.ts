import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD
import { MainViewComponent } from './main-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
=======
import { RedirectComponent } from './redirect.component';
import { stub } from '@utils/stub-factory';
import { WINDOW } from '@utils/injection-tokens';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { EventsService } from '@rest/events/events.service';
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '@services/auth.service';
import { DialogWindowService } from '@services/dialog-window.service';
import { stub } from '@utils/stub-factory';
<<<<<<< HEAD
import { EventsService } from '@rest/events/events.service';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'usrf-open-pass-details',
  template: '',
})
class StubOpenPassDetailsComponent {
  @Input() name: string;
}

describe('MainViewComponent', () => {
  let component: MainViewComponent;
  let fixture: ComponentFixture<MainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, NgxsModule.forRoot(), TranslateModule.forRoot(), FormsModule],
      providers: [
        stub(AuthService),
        stub(DialogWindowService),
        stub(EventsService, { trackEvent: () => new Observable() }),
      ],
      declarations: [MainViewComponent, StubOpenPassDetailsComponent],
=======
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
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
    }).compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD
    fixture = TestBed.createComponent(MainViewComponent);
=======
    fixture = TestBed.createComponent(RedirectComponent);
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
