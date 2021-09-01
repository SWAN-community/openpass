import { Inject, Injectable } from '@angular/core';
import { WINDOW } from '@utils/injection-tokens';
import { environment } from '@env';
import { ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';

type WindowWithGapi = Window & { gapi: any };

@Injectable({
  providedIn: 'root',
})
export class GapiService {
  private gapiStateLoaded = new ReplaySubject<boolean>();

  private get authInstance() {
    return this.window.gapi.auth2.getAuthInstance();
  }

<<<<<<< HEAD
=======
  get isSignedIn(): boolean {
    return this.authInstance.isSignedIn.get();
  }

>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
  get userEmail(): string {
    return this.authInstance.currentUser.get().getBasicProfile()?.getEmail();
  }

  constructor(@Inject(WINDOW) private window: WindowWithGapi) {}

  async load() {
    await new Promise((resolve) => this.window.gapi.load('auth2', resolve));
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const auth = await this.window.gapi.auth2.init({ client_id: environment.googleClientId });
    this.gapiStateLoaded.next(true);
    return auth;
  }

<<<<<<< HEAD
=======
  renderButton(element: HTMLElement) {
    this.gapiStateLoaded.pipe(take(1)).subscribe(() => this.window.gapi.signin2.render(element, { width: 'auto' }));
  }

  subscribeToSignInEvent(callback: (isSignedIn: boolean) => void): { remove: () => void } {
    return this.authInstance.isSignedIn.listen((isSignedIn: boolean) => callback(isSignedIn));
  }

>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
  signOut() {
    this.authInstance.signOut();
  }

  attachCustomButton(element: HTMLButtonElement) {
    const signInEvent = new Promise((resolve) => {
      this.gapiStateLoaded.pipe(take(1)).subscribe(() => this.authInstance.attachClickHandler(element, {}, resolve));
    });
    return fromPromise(signInEvent);
  }
}
