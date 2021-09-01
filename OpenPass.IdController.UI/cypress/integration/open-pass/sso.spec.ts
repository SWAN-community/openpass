import { SsoPage } from '../../pages/sso.page';

context('SSO page', () => {
  let page: SsoPage;

  before(() => {
    page = new SsoPage();
    page.goToPage();
  });

  it('should render correct title', () => {
    page.pageComponent.getTitle().should('contain.text', 'Other options to access this site');
  });

  it('should render the google SSO button', () => {
<<<<<<< HEAD
    page.googleButtonComponent.getButton().should('contain.text', 'Login with Google');
  });

  it('should render the facebook button', () => {
    page.facebookButtonComponent.getButton().should('contain.text', 'Login with Facebook');
=======
    page.googleButtonComponent.getButton().should('contain.text', 'Sign in');
  });

  it('should render the facebook button', () => {
    page.facebookButtonComponent.getButton().find('iframe').should('exist');
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
  });
});
