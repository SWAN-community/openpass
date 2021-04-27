import { Inject, Injectable } from '@angular/core';
import { PostMessagePayload } from '@shared/types/post-message-payload';
import { PostMessageActions } from '@shared/enums/post-message-actions.enum';
import { WINDOW } from '@utils/injection-tokens';
import { PostMessagesService } from '@services/post-messages.service';
import { AuthService } from '@services/auth.service';
import { Store } from '@ngxs/store';
import { OpenerState } from '@store/otp-widget/opener.state';

@Injectable({
  providedIn: 'root',
})
export class DialogWindowService {
  constructor(
    @Inject(WINDOW) private window: Window,
    private store: Store,
    private authService: AuthService,
    private postMessagesService: PostMessagesService
  ) {}

  closeDialogWindow() {
    const message: PostMessagePayload = { action: PostMessageActions.closeChild };
    this.postMessagesService.sendMessage(message);
    this.window.close(); // fallback
    // The browser will only reach this code in the "redirect" variant,
    // as the dialog window will be closed on the previous line.
    this.proceedToOrigin();
  }

  private proceedToOrigin() {
    const origin = this.store.selectSnapshot(OpenerState.origin);
    const originPath = new URL(origin);
    originPath.searchParams.set('token', this.authService.token ?? '');
    this.window.location.replace(originPath.toString());
  }
}