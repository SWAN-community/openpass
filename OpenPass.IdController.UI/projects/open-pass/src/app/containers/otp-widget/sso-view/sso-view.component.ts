<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { Actions, ofActionDispatched, Select } from '@ngxs/store';
import { SsoState } from '@store/otp-widget/sso.state';
import { Observable } from 'rxjs';
import { EventTypes } from '@shared/enums/event-types.enum';
import { AuthService } from '@services/auth.service';
import { DialogWindowService } from '@services/dialog-window.service';
import { EventsService } from '@rest/events/events.service';
import { GetTokenByEmail, ReceiveToken } from '@store/otp-widget/auth.actions';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { AuthState, IAuthState } from '@store/otp-widget/auth.state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
=======
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofActionDispatched, Select } from '@ngxs/store';
import { SsoState } from '@store/otp-widget/sso.state';
import { Observable, Subscription } from 'rxjs';
import { EventTypes } from '@enums/event-types.enum';
import { AuthService } from '@services/auth.service';
import { DialogWindowService } from '@services/dialog-window.service';
import { EventsTrackingService } from '@services/events-tracking.service';
import { GetTokenByEmail, ReceiveToken } from '@store/otp-widget/auth.actions';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { AuthState, IAuthState } from '@store/otp-widget/auth.state';

>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
@Component({
  selector: 'usrf-sso-view',
  templateUrl: './sso-view.component.html',
  styleUrls: ['./sso-view.component.scss'],
})
<<<<<<< HEAD
export class SsoViewComponent implements OnInit {
=======
export class SsoViewComponent implements OnInit, OnDestroy {
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
  @Select(SsoState.isFetching)
  isFetching$: Observable<boolean>;
  @Select(AuthState.fullState)
  authState$: Observable<IAuthState>;

  eventTypes = EventTypes;

<<<<<<< HEAD
=======
  private authSubscriptions: Subscription;

>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
  constructor(
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
  getToken(email: string, eventType: EventTypes) {
    return new GetTokenByEmail(email, eventType);
  }

  ngOnInit() {
<<<<<<< HEAD
    this.actions$
      .pipe(ofActionDispatched(ReceiveToken), untilDestroyed(this))
      .subscribe(() => this.saveTokenAndClose());
  }

  private saveTokenAndClose() {
    this.authService.setTokenToOpener();
    this.eventsTrackingService
      .trackEvent(EventTypes.consentGranted)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.dialogWindowService.closeDialogWindow());
=======
    this.authSubscriptions = this.actions$
      .pipe(ofActionDispatched(ReceiveToken))
      .subscribe(() => this.saveTokenAndClose());
  }

  ngOnDestroy() {
    this.authSubscriptions?.unsubscribe?.();
  }

  private saveTokenAndClose() {
    this.authService.setTokenToOpener();
    this.eventsTrackingService.trackEvent(EventTypes.consentGranted);
    this.dialogWindowService.closeDialogWindow();
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
  }
}
