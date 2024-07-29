import inViewport from '@test/support/inViewport';

describe('Checking home page', () => {
  before(() => {
    chai.use(inViewport);
  });
  beforeEach(() => {
    cy.visit('/');
  });
  it('Shows coming soon text', () => {
    cy.get('p').contains('Coming soon.');
  });
});
