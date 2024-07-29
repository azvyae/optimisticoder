describe('Checking home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Shows coming soon text', () => {
    cy.get('p').contains('Coming soon.');
  });
});
