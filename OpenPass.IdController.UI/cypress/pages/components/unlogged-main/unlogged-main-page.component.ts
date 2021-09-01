import { BaseComponent } from '../base.component';

export class UnloggedMainPageComponent extends BaseComponent {
  constructor() {
    super('non-auth');
  }

  getActionBtn() {
    return this.getElement('action-btn');
  }

<<<<<<< HEAD
  getTermsCheckbox() {
    return this.getElement('terms-checkbox');
=======
  getProsItem() {
    return this.getElement('pros-item');
  }

  getImage(name: string) {
    return this.getElement('img-' + name);
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
  }
}
