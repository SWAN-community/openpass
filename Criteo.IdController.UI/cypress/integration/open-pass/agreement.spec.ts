import { AgreementPage } from '../../pages/agreement.page';

context('Agreement', () => {
  let page: AgreementPage;

  before(() => {
    page = new AgreementPage();
    page.goToPage();
  });

  it('should display correct title', () => {
    page.pageComponent.getTitle().should('contain.text', 'Awesome!');
  });

  it('should toggle details', () => {
    page.pageComponent.getUnifiedContent().should('not.be.visible');
    page.pageComponent.getSummary().click();
    page.pageComponent.getUnifiedContent().should('be.visible');
    page.pageComponent.getSummary().click();
    page.pageComponent.getUnifiedContent().should('not.be.visible');
  });

  it('should redirect to /success', () => {
    page.pageComponent.getActionBtn().click();
    cy.location('pathname').should('be.eq', '/open-pass/success');
  });
});