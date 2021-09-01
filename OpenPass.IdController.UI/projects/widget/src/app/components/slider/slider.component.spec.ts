import { ComponentFixture, TestBed } from '@angular/core/testing';

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
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
