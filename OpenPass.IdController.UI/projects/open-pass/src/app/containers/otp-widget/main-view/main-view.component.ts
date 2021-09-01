import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { OpenerState } from '@store/otp-widget/opener.state';
<<<<<<< HEAD:OpenPass.IdController.UI/projects/open-pass/src/app/containers/otp-widget/main-view/main-view.component.ts
import { EventsService } from '@rest/events/events.service';
import { EventTypes } from '@shared/enums/event-types.enum';
import { DialogWindowService } from '@services/dialog-window.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
=======
import { EventsTrackingService } from '@services/events-tracking.service';
import { EventTypes } from '@enums/event-types.enum';
import { DialogWindowService } from '@services/dialog-window.service';
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f:Criteo.IdController.UI/projects/open-pass/src/app/containers/otp-widget/main-view/main-view.component.ts

@UntilDestroy()
@Component({
  selector: 'usrf-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit {
  @Select(OpenerState.originFormatted)
  websiteName$: Observable<string>;

<<<<<<< HEAD:OpenPass.IdController.UI/projects/open-pass/src/app/containers/otp-widget/main-view/main-view.component.ts
  constructor(private dialogWindowService: DialogWindowService, private eventsTrackingService: EventsService) {}
=======
  constructor(private dialogWindowService: DialogWindowService, private eventsTrackingService: EventsTrackingService) {}
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f:Criteo.IdController.UI/projects/open-pass/src/app/containers/otp-widget/main-view/main-view.component.ts

  ngOnInit() {
    this.eventsTrackingService.trackEvent(EventTypes.bannerRequest).pipe(untilDestroyed(this)).subscribe();
  }

  closeWindow() {
    this.dialogWindowService.closeDialogWindow(true);
  }

  closeWindow() {
    this.dialogWindowService.closeDialogWindow(true);
  }
}
