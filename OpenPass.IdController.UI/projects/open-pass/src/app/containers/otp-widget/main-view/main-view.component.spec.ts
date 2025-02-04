import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainViewComponent } from './main-view.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { EventsService } from '@rest/events/events.service';
import { stub } from '@utils/stub-factory';
import { AuthService } from '@services/auth.service';
import { DialogWindowService } from '@services/dialog-window.service';
import { PostMessagesService } from '@services/post-messages.service';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'usrf-open-pass-details',
  template: '',
})
class StubOpenPassDetailsComponent {
  @Input() name: string;
}

describe('MainViewComponent', () => {
  let component: MainViewComponent;
  let fixture: ComponentFixture<MainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), NgxsModule.forRoot()],
      declarations: [MainViewComponent, StubOpenPassDetailsComponent],
      providers: [
        stub(EventsService, { trackEvent: () => new Observable() }),
        stub(AuthService),
        stub(DialogWindowService),
        stub(PostMessagesService),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
