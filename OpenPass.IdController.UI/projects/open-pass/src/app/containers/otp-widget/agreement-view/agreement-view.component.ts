import { Component } from '@angular/core';
<<<<<<< HEAD
import { EventTypes } from '@shared/enums/event-types.enum';
import { AuthService } from '@services/auth.service';
import { DialogWindowService } from '@services/dialog-window.service';
import { EventsService } from '@rest/events/events.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
=======
import { EventTypes } from '@enums/event-types.enum';
import { AuthService } from '@services/auth.service';
import { DialogWindowService } from '@services/dialog-window.service';
import { EventsTrackingService } from '@services/events-tracking.service';

>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
@Component({
  selector: 'usrf-agreement-view',
  templateUrl: './agreement-view.component.html',
  styleUrls: ['./agreement-view.component.scss'],
})
export class AgreementViewComponent {
  isTermsAccepted = false;

  constructor(
    private authService: AuthService,
    private dialogWindowService: DialogWindowService,
<<<<<<< HEAD
    private eventsTrackingService: EventsService
=======
    private eventsTrackingService: EventsTrackingService
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
  ) {}

  saveTokenAndClose() {
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
