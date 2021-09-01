import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { windowFactory } from '@utils/window-factory';
import { environment } from '@env';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { SsoState } from '@store/otp-widget/sso.state';
import { AuthState } from '@store/otp-widget/auth.state';
import { OpenerState } from '@store/otp-widget/opener.state';
import { ControlsState } from '@store/controls.state';
import { OtpWidgetState } from '@store/otp-widget/otp-widget.state';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { WINDOW } from '@utils/injection-tokens';
<<<<<<< HEAD:OpenPass.IdController.UI/projects/open-pass/src/app/app.module.ts
import { TrackingDataInterceptor } from './interceptors/tracking-data.interceptor';
=======
import { OriginInterceptor } from './interceptors/origin.interceptor';
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f:Criteo.IdController.UI/projects/open-pass/src/app/app.module.ts

export const createTranslateLoader = (http: HttpClient): TranslateHttpLoader =>
  new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
<<<<<<< HEAD:OpenPass.IdController.UI/projects/open-pass/src/app/app.module.ts
    NgxsModule.forRoot([OpenerState, OtpWidgetState, AuthState, SsoState, ControlsState], {
=======
    NgxsModule.forRoot([OpenerState, OtpWidgetState, AuthState, SsoState], {
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f:Criteo.IdController.UI/projects/open-pass/src/app/app.module.ts
      developmentMode: !environment.production,
    }),
    NgxsDispatchPluginModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: WINDOW, useFactory: windowFactory },
<<<<<<< HEAD:OpenPass.IdController.UI/projects/open-pass/src/app/app.module.ts
    { provide: HTTP_INTERCEPTORS, useClass: TrackingDataInterceptor, multi: true },
=======
    { provide: HTTP_INTERCEPTORS, useClass: OriginInterceptor, multi: true },
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f:Criteo.IdController.UI/projects/open-pass/src/app/app.module.ts
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
