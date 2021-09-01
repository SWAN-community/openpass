import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

<<<<<<< HEAD
import { SharedModule } from '@components/shared/shared.module';
import { GoogleAuthModule } from '@components/google-auth/google-auth.module';
import { FacebookAuthModule } from '@components/facebook-auth/facebook-auth.module';
import { OpenPassDetailsModule } from '@components/open-pass-details/open-pass-details.module';
import { MainViewComponent } from './main-view.component';
import { MainViewRoutingModule } from './main-view-routing.module';
=======
import { MainViewComponent } from './main-view.component';
import { MainViewRoutingModule } from './main-view-routing.module';
import { OpenPassDetailsModule } from '../../../components/open-pass-details/open-pass-details.module';
import { SharedModule } from '../../../components/shared/shared.module';
import { FacebookAuthSmallModule } from '../../../components/facebook-auth-small/facebook-auth-small.module';
import { GoogleAuthSmallModule } from '../../../components/google-auth-small/google-auth-small.module';
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f

@NgModule({
  declarations: [MainViewComponent],
  imports: [
    CommonModule,
<<<<<<< HEAD
    SharedModule,
    TranslateModule,
    GoogleAuthModule,
    FacebookAuthModule,
    MainViewRoutingModule,
    OpenPassDetailsModule,
=======
    MainViewRoutingModule,
    TranslateModule,
    OpenPassDetailsModule,
    SharedModule,
    FacebookAuthSmallModule,
    GoogleAuthSmallModule,
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
  ],
})
export class MainViewModule {}
