import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpWidgetComponent } from './otp-widget.component';
import { windowFactory } from '../../../../../widget/src/app/utils/window-factory';
import { RouterTestingModule } from '@angular/router/testing';

describe('OtpWidgetComponent', () => {
  let component: OtpWidgetComponent;
  let fixture: ComponentFixture<OtpWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: 'Window', useFactory: windowFactory }],
      declarations: [OtpWidgetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
