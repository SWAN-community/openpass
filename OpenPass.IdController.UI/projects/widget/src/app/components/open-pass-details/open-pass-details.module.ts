import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { OpenPassDetailsComponent } from './open-pass-details.component';
<<<<<<< HEAD
import { PipesModule } from '@pipes/pipes.module';
=======
import { PipesModule } from '../../pipes/pipes.module';
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f

@NgModule({
  declarations: [OpenPassDetailsComponent],
  imports: [CommonModule, TranslateModule, PipesModule],
  exports: [OpenPassDetailsComponent],
})
export class OpenPassDetailsModule {}
