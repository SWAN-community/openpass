import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
    this.actions$
      .pipe(ofActionDispatched(ReceiveToken), untilDestroyed(this))
      .subscribe(() => this.router.navigate(['agreement']));
  }

  ngOnDestroy() {
    this.setDefaultState();
  }
}
