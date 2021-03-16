import { UnloggedMainPage } from '../../pages/unlogged-main.page';
import { LocalStorageHelper } from '../../helpers/local-storage-helper';
import { AuthHelper } from '../../helpers/interceptors/auth-helper';

context('Unlogged:Main page', () => {
  let page: UnloggedMainPage;

  before(() => {
    page = new UnloggedMainPage();
    page.goToPage();
  });

  it('should display a list of pros', () => {
    page.pageComponent.getProsItem().should('have.length', 3);
  });

  it('should display a button', () => {
    page.pageComponent.getActionBtn().should('be.visible');
  });

  it('should load images', () => {
    [
      page.pageComponent.getImage('logo'),
      page.pageComponent.getImage('info'),
      page.pageComponent.getImage('lock'),
      page.pageComponent.getImage('safe'),
    ].forEach((cyImage) => {
      cyImage.should('be.visible').and((imgs) => expect(imgs[0]['naturalWidth']).to.be.greaterThan(0));
    });
  });

  it('should request token', () => {
    const waitingToken = AuthHelper.mockGetIfa({ body: { token: 'fake_token' } });
    page.pageComponent.getActionBtn().click();
    cy.waitFor(waitingToken);
    cy.location('pathname').should('be.eq', '/open-pass/unauthenticated/agreement');

    // reset state
    page.goToPage();
  });

  it('should redirect to /unauthenticated/recognized if token is present', () => {
    LocalStorageHelper.setFakeToken();

    cy.location('pathname').should('be.eq', '/open-pass/unauthenticated/recognized');

    // reset state
    LocalStorageHelper.clearLocalStorageItem('USRF');
    page.goToPage();
  });
});