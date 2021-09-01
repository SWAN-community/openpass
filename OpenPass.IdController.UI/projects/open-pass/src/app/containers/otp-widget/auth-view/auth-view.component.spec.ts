import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthViewComponent } from './auth-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from '@store/otp-widget/auth.state';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '@services/auth.service';
import { DialogWindowService } from '@services/dialog-window.service';
<<<<<<< HEAD:OpenPass.IdController.UI/projects/open-pass/src/app/containers/otp-widget/auth-view/auth-view.component.spec.ts
import { Component } from '@angular/core';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';

@Component({
  selector: 'usrf-copyright',
  template: '',
})
class StubCopyrightComponent {}
=======
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f:Criteo.IdController.UI/projects/open-pass/src/app/containers/otp-widget/auth-view/auth-view.component.spec.ts

describe('AuthViewComponent', () => {
  let component: AuthViewComponent;
  let fixture: ComponentFixture<AuthViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([AuthState]),
        TranslateModule.forRoot(),
        NgxsDispatchPluginModule,
      ],
      providers: [
        {
          provide: AuthService,
          useFactory: () => {},
        },
        {
          provide: DialogWindowService,
          useFactory: () => {},
        },
      ],
<<<<<<< HEAD:OpenPass.IdController.UI/projects/open-pass/src/app/containers/otp-widget/auth-view/auth-view.component.spec.ts
      declarations: [AuthViewComponent, StubCopyrightComponent],
=======
      providers: [
        {
          provide: AuthService,
          useFactory: () => {},
        },
        {
          provide: DialogWindowService,
          useFactory: () => {},
        },
      ],
      declarations: [AuthViewComponent],
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f:Criteo.IdController.UI/projects/open-pass/src/app/containers/otp-widget/auth-view/auth-view.component.spec.ts
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
