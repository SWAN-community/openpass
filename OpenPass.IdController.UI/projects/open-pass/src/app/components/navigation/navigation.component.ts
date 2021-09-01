import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
<<<<<<< HEAD
import { DialogWindowService } from '@services/dialog-window.service';
import { EventTypes } from '@shared/enums/event-types.enum';
import { EventsService } from '@rest/events/events.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
=======
import { DialogWindowService } from '../../services/dialog-window.service';
import { EventTypes } from '../../enums/event-types.enum';
import { EventsTrackingService } from '../../services/events-tracking.service';

>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
@Component({
  selector: 'usrf-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  get hasBackHistory() {
    return !this.router.config.map((route: Route) => '/' + route.path).includes(this.router.url.replace(/\?.+/, ''));
  }

  constructor(
    private router: Router,
    private dialogWindowService: DialogWindowService,
<<<<<<< HEAD
    private eventsTrackingService: EventsService
  ) {}

  close() {
    this.eventsTrackingService
      .trackEvent(EventTypes.bannerIgnored)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.dialogWindowService.closeDialogWindow());
=======
    private eventsTrackingService: EventsTrackingService
  ) {}

  close() {
    this.eventsTrackingService.trackEvent(EventTypes.bannerIgnored);
    this.dialogWindowService.closeDialogWindow();
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
  }

  back() {
    this.router.navigate(['..']);
  }
}
