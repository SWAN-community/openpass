import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@components/shared/shared.module';
import { MainViewComponent } from './main-view.component';
import { MainViewRoutingModule } from './main-view-routing.module';

@NgModule({
  declarations: [MainViewComponent],
  imports: [CommonModule, MainViewRoutingModule, TranslateModule, FormsModule, SharedModule],
=======
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MainViewComponent } from './main-view.component';
import { MainViewRoutingModule } from './main-view-routing.module';
import { OpenPassDetailsModule } from '../../../components/open-pass-details/open-pass-details.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainViewComponent],
  imports: [CommonModule, MainViewRoutingModule, TranslateModule, OpenPassDetailsModule, FormsModule],
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
})
export class MainViewModule {}
