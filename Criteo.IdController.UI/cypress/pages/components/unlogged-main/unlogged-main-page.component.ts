import { BaseComponent } from '../base.component';

export class UnloggedMainPageComponent extends BaseComponent {
  constructor() {
    super('non-auth');
  }

  getActionBtn() {
    return this.getElement('action-btn');
  }

  getProsItem() {
    return this.getElement('pros-item');
  }

  getImage(name: string) {
    return this.getElement('img-' + name);
  }
}
