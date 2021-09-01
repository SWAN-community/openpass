<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import { OpenerState } from '@store/otp-widget/opener.state';
import { Observable } from 'rxjs';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { AuthService } from '@services/auth.service';
import { DialogWindowService } from '@services/dialog-window.service';
import { EventTypes } from '@shared/enums/event-types.enum';
import { EventsService } from '@rest/events/events.service';
import { GetAnonymousTokens, GetAnonymousTokensSuccess } from '@store/otp-widget/auth.actions';
import { AuthState } from '@store/otp-widget/auth.state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
=======
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import { OpenerState } from '@store/otp-widget/opener.state';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { AuthService } from '@services/auth.service';
import { DialogWindowService } from '@services/dialog-window.service';
import { EventTypes } from '@enums/event-types.enum';
import { EventsTrackingService } from '@services/events-tracking.service';
import { GetAnonymousTokens, GetAnonymousTokensSuccess } from '@store/otp-widget/auth.actions';
import { AuthState } from '@store/otp-widget/auth.state';

>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
@Component({
  selector: 'usrf-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
<<<<<<< HEAD
export class MainViewComponent implements OnInit {
=======
export class MainViewComponent implements OnInit, OnDestroy {
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
  @Select(OpenerState.originFormatted)
  websiteName$: Observable<string>;
  @Select(AuthState.isFetching)
  isFetching$: Observable<boolean>;

<<<<<<< HEAD
=======
  isDestroyed = new Subject();
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
  acceptTerms = false;

  constructor(
    private store: Store,
    private actions$: Actions,
    private authService: AuthService,
    private dialogWindowService: DialogWindowService,
<<<<<<< HEAD
    private eventsTrackingService: EventsService
=======
    private eventsTrackingService: EventsTrackingService
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
  ) {}

  @Dispatch()
  fetchIfaAndProceed() {
    return new GetAnonymousTokens();
  }

  ngOnInit() {
    this.actions$
<<<<<<< HEAD
      .pipe(ofActionDispatched(GetAnonymousTokensSuccess), untilDestroyed(this))
      .subscribe(() => this.confirm());
    this.eventsTrackingService.trackEvent(EventTypes.bannerRequest).pipe(untilDestroyed(this)).subscribe();
  }

  closeWindow() {
    this.eventsTrackingService
      .trackEvent(EventTypes.consentNotGranted)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.dialogWindowService.closeDialogWindow(true));
=======
      .pipe(ofActionDispatched(GetAnonymousTokensSuccess), takeUntil(this.isDestroyed))
      .subscribe(() => this.confirm());
    this.eventsTrackingService.trackEvent(EventTypes.bannerRequest);
  }

  ngOnDestroy() {
    this.isDestroyed.next();
  }

  closeWindow() {
    this.dialogWindowService.closeDialogWindow(true);
    this.eventsTrackingService.trackEvent(EventTypes.consentNotGranted);
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
  }

  private confirm() {
    this.authService.setTokenToOpener();
<<<<<<< HEAD
    this.eventsTrackingService
      .trackEvent(EventTypes.consentGranted)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.dialogWindowService.closeDialogWindow());
=======
    this.eventsTrackingService.trackEvent(EventTypes.consentGranted);
    this.dialogWindowService.closeDialogWindow();
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
  }
}
