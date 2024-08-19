describe('Checking home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  context('Hero section', () => {
    it('has main heading', () => {
      cy.getItem('hero-section')
        .find('h1')
        .contains("It's your code, be optimist");
    });
    it('has subtitle', () => {
      cy.getItem('hero-section')
        .find('p')
        .contains('Become a better coder')
        .contains('simply by being')
        .contains('optimistic');
    });
  });
  context('Explore apps section', () => {
    it('has the heading', () => {
      cy.getItem('explore-apps-section').find('h2').contains('Explore Apps');
    });
    it('has subtitle', () => {
      cy.getItem('explore-apps-section')
        .find('p')
        .first()
        .contains(
          'There are some experimental apps I made shown below. You can either try or explore it, since certain apps are open source. Start from here.',
        );
    });
    it('has card template', () => {
      cy.getItem('explore-apps-section')
        .getItem('explore-app-card')
        .first()
        .then(($card) => {
          cy.wrap($card).should('have.attr', 'href');
          cy.wrap($card).find('img').should('exist');
          cy.wrap($card).find('h3').should('exist');
          cy.wrap($card).find('p[role="app-type"]').should('exist');
          cy.wrap($card).find('p[role="description"]').should('exist');
        });
    });
    it('has load more button', () => {
      cy.getItem('explore-apps-section')
        .find('button')
        .contains('Show Apps')
        .should('exist');
    });
  });
  context.only('Most highlighted story section', () => {
    it('has highlighted story section', () => {
      cy.getItem('higlighted-story-section').then(($sec) => {
        cy.wrap($sec)
          .find('a')
          .should('have.length', 3)
          .each(($a) => {
            cy.wrap($a).should('have.attr', 'href');
          });
        cy.wrap($sec).find('img');
        cy.wrap($sec).find('[title="Story category"]').should('exist');
        cy.wrap($sec).find('[title="Story read time"]').should('exist');
        cy.wrap($sec).find('h3').should('exist');
        cy.wrap($sec).find('[title="Story excerpt"]').should('exist');
        cy.wrap($sec).contains('Read More');
      });
    });
  });
  context('Story cards section', () => {
    it('has story cards section', () => {
      cy.getItem('latest-stories-section').then(($section) => {
        cy.wrap($section).find('h4').contains('Latest Stories');
        cy.wrap($section)
          .getItem('story-card')
          .should('have.length', 3)
          .each(($card) => {
            cy.wrap($card).should('have.attr', 'href');
            cy.wrap($card).find('img');
            cy.wrap($card).find('[title="Story category"]').should('exist');
            cy.wrap($card).find('[title="Story read time"]').should('exist');
            cy.wrap($card).find('h6').should('exist');
            cy.wrap($card).find('[title="Story excerpt"]').should('exist');
            cy.wrap($card).contains('Read More');
          });
      });
    });
  });
});
