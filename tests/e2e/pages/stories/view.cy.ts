describe('View story page', () => {
  beforeEach(() => {
    cy.setCookie('theme', 'light').then(() => {
      cy.visit('/stories/hello-world-everybody');
    });
  });
  context('Checks story header', () => {
    it('has breadcrumbs', () => {
      const breadcrumbs = ['Stories', 'Dev', 'Hello World Everybody'];
      cy.getItem('breadcrumbs')
        .find('a')
        .each(($a, i) => {
          cy.wrap($a).contains(breadcrumbs[i]);
        });
    });
    it('has story title', () => {
      cy.get('h1').contains('Hello World Everybody');
    });
    it('has story subtitle', () => {
      cy.getItem('subtitle').contains('Learn how to code with Go.');
    });
    it('has contact link', () => {
      cy.getItem('image-contact-link').should('have.attr', 'href', '/contact');
      cy.getItem('text-contact-link').should('have.attr', 'href', '/contact');
    });
    it('has reading time', () => {
      cy.getItem('reading-time').contains('2 min read');
    });
    it('has date format', () => {
      cy.getItem('published-date').contains('Mar 15, 2023');
    });
    it('has share button', () => {
      cy.getItem('share').eq(0).should('be.visible');
    });
  });
  context('Checks story body', () => {
    it('has h2-h4 headings', () => {
      cy.getItem('story-body').then(($section) => {
        cy.wrap($section).find('h1').should('not.exist');
        cy.wrap($section).find('h2').should('exist');
        cy.wrap($section).find('h3').should('exist');
        cy.wrap($section).find('h4').should('exist');
        cy.wrap($section).find('h5').should('not.exist');
        cy.wrap($section).find('h6').should('not.exist');
      });
    });
    it('has story contents', () => {
      cy.getItem('story-body').then(($section) => {
        cy.wrap($section).find('p').should('exist');
        cy.wrap($section).find('img').should('exist');
        cy.wrap($section).find('code').should('exist');
        cy.wrap($section).find('pre').should('exist');
        cy.wrap($section).find('ol').should('exist');
        cy.wrap($section).find('li').should('exist');
      });
    });
  });
  context('Checks story footer', () => {
    it('has keyword links', () => {
      const keywords = ['lorem', 'ipsum', 'wonderwul'];
      cy.getItem('keyword-list').then(($el) => {
        cy.wrap($el).contains('Keywords:');
        cy.wrap($el)
          .find('a')
          .each(($a, i) => {
            cy.wrap($a).contains(keywords[i]);
          });
      });
    });
    it('has share button', () => {
      cy.getItem('share').eq(1).should('be.visible');
    });
  });
  context('Checks more story section', () => {
    it('has another story section', () => {
      cy.getItem('see-another-stories').then(($section) => {
        cy.wrap($section).find('h5').contains('Read another stories');
      });
    });
    it('has another story cards', () => {
      cy.getItem('see-another-stories').then(($section) => {
        cy.wrap($section)
          .getItem('story-card')
          .should('have.length', 4)
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
    it('has see complete stories link', () => {
      cy.getItem('see-another-stories').then(($section) => {
        cy.wrap($section)
          .find('a[href="/stories"]')
          .contains('See all stories');
      });
    });
  });
});
