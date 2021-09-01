import { Component, Inject, OnInit } from '@angular/core';
import { localStorage } from '@shared/utils/storage-decorator';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { WINDOW } from '@utils/injection-tokens';
import { DialogWindowService } from '@services/dialog-window.service';
<<<<<<< HEAD:OpenPass.IdController.UI/projects/open-pass/src/app/containers/otp-widget/already-signed-view/already-signed-view.component.ts
import { EventTypes } from '@shared/enums/event-types.enum';
import { EventsService } from '@rest/events/events.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
=======
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f:Criteo.IdController.UI/projects/open-pass/src/app/containers/otp-widget/already-signed-view/already-signed-view.component.ts

@UntilDestroy()
@Component({
  selector: 'usrf-already-signed-view',
  templateUrl: './already-signed-view.component.html',
  styleUrls: ['./already-signed-view.component.scss'],
})
export class AlreadySignedViewComponent implements OnInit {
  @localStorage('openpass.email')
  private storageUserEmail: string;

  userEmail: string;

  constructor(
    private authService: AuthService,
    @Inject(WINDOW) private window: Window,
    private router: Router,
<<<<<<< HEAD:OpenPass.IdController.UI/projects/open-pass/src/app/containers/otp-widget/already-signed-view/already-signed-view.component.ts
    private dialogWindowService: DialogWindowService,
    private eventsTrackingService: EventsService
=======
    private dialogWindowService: DialogWindowService
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f:Criteo.IdController.UI/projects/open-pass/src/app/containers/otp-widget/already-signed-view/already-signed-view.component.ts
  ) {}

  ngOnInit() {
    this.userEmail = this.storageUserEmail;
  }

  submitForm() {
    if (this.userEmail !== this.storageUserEmail) {
      this.storageUserEmail = this.userEmail;
    }
    this.authService.setTokenToOpener();
<<<<<<< HEAD:OpenPass.IdController.UI/projects/open-pass/src/app/containers/otp-widget/already-signed-view/already-signed-view.component.ts
    this.eventsTrackingService
      .trackEvent(EventTypes.consentGranted)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.dialogWindowService.closeDialogWindow());
=======
    this.dialogWindowService.closeDialogWindow();
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f:Criteo.IdController.UI/projects/open-pass/src/app/containers/otp-widget/already-signed-view/already-signed-view.component.ts
  }

  resetState() {
    this.storageUserEmail = '';
    this.userEmail = '';
    this.authService.resetToken();
    this.router.navigate(['auth']);
  }
}
