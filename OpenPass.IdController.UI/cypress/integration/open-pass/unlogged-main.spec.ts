import { UnloggedMainPage } from '../../pages/unlogged-main.page';
import { LocalStorageHelper } from '../../helpers/local-storage-helper';
<<<<<<< HEAD
import { AuthHelper } from '../../helpers/interceptors/auth-helper';
=======
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f

context('Unlogged:Main page', () => {
  let page: UnloggedMainPage;

  before(() => {
    page = new UnloggedMainPage();
    page.goToPage();
  });

  it('should display a button', () => {
    page.pageComponent.getActionBtn().should('be.visible');
  });

<<<<<<< HEAD
  it('should forbid to proceed without accepting terms', () => {
    page.pageComponent.getActionBtn().should('be.disabled');
    page.pageComponent.getTermsCheckbox().click();
    page.pageComponent.getActionBtn().should('not.be.disabled');
    page.pageComponent.getTermsCheckbox().click();
  });

  it('should call the backend endpoint if proceed', () => {
    const waitingToken = AuthHelper.mockCreateIfa();
    page.pageComponent.getTermsCheckbox().click();
    page.pageComponent.getActionBtn().click();
    cy.get(waitingToken).its('response.statusCode').should('be.equal', 200);
  });

=======
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
  it('should redirect to /unauthenticated/recognized if token is present', () => {
    LocalStorageHelper.setFakeToken();
    page.goToPage();

    cy.location('pathname').should('be.eq', '/open-pass/unauthenticated/recognized');

    // reset state
    LocalStorageHelper.clearLocalStorageItem('USRF');
    page.goToPage();
  });
});
