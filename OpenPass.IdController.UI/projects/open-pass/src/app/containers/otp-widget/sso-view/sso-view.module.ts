import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SsoViewComponent } from './sso-view.component';
import { SsoViewRoutingModule } from './sso-view-routing.module';
<<<<<<< HEAD
import { SharedModule } from '@components/shared/shared.module';
import { GoogleAuthModule } from '@components/google-auth/google-auth.module';
import { FacebookAuthModule } from '@components/facebook-auth/facebook-auth.module';

@NgModule({
  declarations: [SsoViewComponent],
  imports: [CommonModule, SharedModule, TranslateModule, GoogleAuthModule, FacebookAuthModule, SsoViewRoutingModule],
=======
import { GoogleAuthButtonModule } from '@components/google-auth-button/google-auth-button.module';
import { FacebookAuthButtonModule } from '@components/facebook-auth-button/facebook-auth-button.module';
import { SharedModule } from '@components/shared/shared.module';

@NgModule({
  declarations: [SsoViewComponent],
  imports: [
    CommonModule,
    SsoViewRoutingModule,
    GoogleAuthButtonModule,
    FacebookAuthButtonModule,
    TranslateModule,
    SharedModule,
  ],
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
})
export class SsoViewModule {}
