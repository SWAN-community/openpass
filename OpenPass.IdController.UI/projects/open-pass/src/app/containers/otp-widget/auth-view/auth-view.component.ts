import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
<<<<<<< HEAD:OpenPass.IdController.UI/projects/open-pass/src/app/containers/otp-widget/auth-view/auth-view.component.ts
import { Observable } from 'rxjs';
=======
import { Observable, Subscription } from 'rxjs';
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f:Criteo.IdController.UI/projects/open-pass/src/app/containers/otp-widget/auth-view/auth-view.component.ts
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import { OpenerState } from '@store/otp-widget/opener.state';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { AuthState, IAuthState } from '@store/otp-widget/auth.state';
import {
  GenerateCode,
  SetCode,
  SetEmail,
  ValidateCode,
  ReceiveToken,
  SetAuthDefault,
} from '@store/otp-widget/auth.actions';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'usrf-auth-view',
  templateUrl: './auth-view.component.html',
  styleUrls: ['./auth-view.component.scss'],
})
export class AuthViewComponent implements OnInit, OnDestroy {
  @Select(OpenerState.originFormatted) websiteName$: Observable<string>;
  @Select(AuthState.fullState) authState$: Observable<IAuthState>;

  isAcceptAgreement = false;
<<<<<<< HEAD:OpenPass.IdController.UI/projects/open-pass/src/app/containers/otp-widget/auth-view/auth-view.component.ts
=======
  private authSubscriptions: Subscription;
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f:Criteo.IdController.UI/projects/open-pass/src/app/containers/otp-widget/auth-view/auth-view.component.ts

  constructor(private store: Store, private router: Router, private actions$: Actions) {}

  @Dispatch()
  submitForm() {
    const { isEmailVerified } = this.store.selectSnapshot(AuthState.fullState);
    return isEmailVerified ? new ValidateCode() : new GenerateCode();
  }

  @Dispatch()
  patchEmail({ target }: Event) {
    return new SetEmail((target as HTMLInputElement).value);
  }

  @Dispatch()
  patchCode({ target }: Event) {
    return new SetCode((target as HTMLInputElement).value);
  }

  @Dispatch()
  private setDefaultState() {
    return new SetAuthDefault();
  }

  ngOnInit() {
<<<<<<< HEAD:OpenPass.IdController.UI/projects/open-pass/src/app/containers/otp-widget/auth-view/auth-view.component.ts
    this.actions$
      .pipe(ofActionDispatched(ReceiveToken), untilDestroyed(this))
=======
    this.authSubscriptions = this.actions$
      .pipe(ofActionDispatched(ReceiveToken))
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f:Criteo.IdController.UI/projects/open-pass/src/app/containers/otp-widget/auth-view/auth-view.component.ts
      .subscribe(() => this.router.navigate(['agreement']));
  }

  ngOnDestroy() {
<<<<<<< HEAD:OpenPass.IdController.UI/projects/open-pass/src/app/containers/otp-widget/auth-view/auth-view.component.ts
=======
    this.authSubscriptions?.unsubscribe?.();
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f:Criteo.IdController.UI/projects/open-pass/src/app/containers/otp-widget/auth-view/auth-view.component.ts
    this.setDefaultState();
  }
}
