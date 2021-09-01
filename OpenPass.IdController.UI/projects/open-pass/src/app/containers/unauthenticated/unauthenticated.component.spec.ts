import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD
import { UnauthenticatedComponent } from './unauthenticated.component';
import { WINDOW } from '@utils/injection-tokens';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'usrf-navigation',
  template: '',
})
class StubNavComponent {}

describe('UnauthenticatedComponent', () => {
  let component: UnauthenticatedComponent;
  let fixture: ComponentFixture<UnauthenticatedComponent>;
  const windowMock: Partial<Window> = { opener: true };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [UnauthenticatedComponent, StubNavComponent],
      providers: [{ provide: WINDOW, useValue: windowMock }],
=======
<<<<<<< HEAD:OpenPass.IdController.UI/projects/widget/src/app/components/slider/slider.component.spec.ts
import { SliderComponent } from './slider.component';
=======
import { UnauthenticatedComponent } from './unauthenticated.component';
import { WINDOW } from '@utils/injection-tokens';
import { windowFactory } from '../../../../../widget/src/app/utils/window-factory';
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f:OpenPass.IdController.UI/projects/open-pass/src/app/containers/unauthenticated/unauthenticated.component.spec.ts

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< HEAD:OpenPass.IdController.UI/projects/widget/src/app/components/slider/slider.component.spec.ts
      declarations: [SliderComponent],
=======
      declarations: [UnauthenticatedComponent],
      providers: [{ provide: WINDOW, useFactory: windowFactory }],
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f:OpenPass.IdController.UI/projects/open-pass/src/app/containers/unauthenticated/unauthenticated.component.spec.ts
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
    }).compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD
    fixture = TestBed.createComponent(UnauthenticatedComponent);
=======
    fixture = TestBed.createComponent(SliderComponent);
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
<<<<<<< HEAD

  it('should show Navigation only in dialog mode', () => {
    let navPanel = fixture.debugElement.query(By.css('usrf-navigation'));
    expect(navPanel).toBeFalsy();
    windowMock.opener = null;
    fixture.detectChanges();
    navPanel = fixture.debugElement.query(By.css('usrf-navigation'));
    expect(navPanel).toBeTruthy();
  });
=======
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
});
