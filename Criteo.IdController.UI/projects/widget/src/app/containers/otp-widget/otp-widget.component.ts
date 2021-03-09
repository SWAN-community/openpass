import { Component, HostBinding, Inject, Input, NgModule, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { WidgetModes } from '../../enums/widget-modes.enum';
import { environment } from '../../../environments/environment';
import { CookiesService } from '../../services/cookies.service';
import { MessageSubscriptionService } from '../../services/message-subscription.service';
import { filter } from 'rxjs/operators';
import { PostMessageActions } from '@shared/enums/post-message-actions.enum';
import { Subscription } from 'rxjs';
import { PostMessagesService } from '../../services/post-messages.service';
import { PublicApiService } from '../../services/public-api.service';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../pipes/pipes.module';
import { WINDOW } from '../../utils/injection-tokens';

@Component({
  selector: 'wdgt-otp-widget',
  templateUrl: './otp-widget.component.html',
  styleUrls: ['./otp-widget.component.scss'],
})
export class OtpWidgetComponent implements OnInit, OnDestroy {
  @Input() view: WidgetModes;

  @HostBinding('class.modal')
  get isModal(): boolean {
    return this.view === WidgetModes.modal && this.isOpen;
  }

  isOpen = true;
  widgetMods = WidgetModes;
  websiteName = 'Website Name';
  openPassWindow: Window;
  postSubscription: Subscription;

  get openerConfigs(): string {
    const { innerHeight, innerWidth } = this.window;
    const width = 400;
    const height = 500;
    const config = {
      width,
      height,
      left: (innerWidth - width) / 2,
      top: (innerHeight - height) / 2,
      location: environment.production ? 'no' : 'yes',
      toolbar: environment.production ? 'no' : 'yes',
    };
    return Object.entries(config)
      .map((entry) => entry.join('='))
      .join(',');
  }

  constructor(
    @Inject(WINDOW) private window: Window,
    private cookiesService: CookiesService,
    private publicApiService: PublicApiService,
    private postMessagesService: PostMessagesService,
    private messageSubscriptionService: MessageSubscriptionService
  ) {}

  ngOnInit() {
    const hasCookie = !!this.cookiesService.getCookie(environment.cookieName);
    const { isDeclined } = this.publicApiService.getUserData();
    this.isOpen = !hasCookie && !isDeclined;
  }

  ngOnDestroy() {
    this.messageSubscriptionService.destroyTokenListener();
    this.postSubscription?.unsubscribe?.();
  }

  launchIdController() {
    const queryParams = new URLSearchParams({ origin: this.window.location.origin });
    const url = `${environment.idControllerAppUrl}?${queryParams}`;
    this.openPassWindow = this.window.open(url, '_blank', this.openerConfigs);
    if (this.openPassWindow) {
      this.messageSubscriptionService.initTokenListener(this.openPassWindow);
      this.listenForClosingRequest();
    }
  }

  backdropClick() {
    this.isOpen = false;
    this.publicApiService.setUserData({ token: null, email: null, isDeclined: true });
  }

  private listenForClosingRequest() {
    this.postSubscription = this.postMessagesService
      .getSubscription()
      .pipe(filter(({ action }) => action === PostMessageActions.closeChild))
      .subscribe(() => {
        this.openPassWindow?.close();
        this.isOpen = false;
      });
  }
}

@NgModule({
  declarations: [OtpWidgetComponent],
  imports: [CommonModule, PipesModule, TranslateModule],
})
class OtpWidgetModule {}