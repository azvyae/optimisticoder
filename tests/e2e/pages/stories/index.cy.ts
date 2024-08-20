describe('Index and search story page', () => {
  context('Checks hero section', () => {
    beforeEach(() => {
      cy.setCookie('theme', 'dark').then(() => {
        cy.visit('/stories');
      });
    });
    it('has small title as a heading', () => {
      cy.getItem('stories-hero').find('h1').contains('Stories');
    });
    it('has second title', () => {
      cy.getItem('stories-hero').find('h2').contains('Explore New Things!');
    });
    it('has subtitle', () => {
      cy.getItem('stories-hero')
        .find('p')
        .contains(
          'Learn about software development, programming languages, and stay updated on the IT industry. Discover our latest stories, coding tips, tech news, career insights, and much more.',
        );
    });
  });
  context('Checks filtering UI', () => {
    beforeEach(() => {
      cy.setCookie('theme', 'dark').then(() => {
        cy.visit('/stories');
      });
    });
    it('has category selectors', () => {
      const categories = [
        {
          text: 'All',
        },
        {
          text: 'Arts',
        },
        {
          text: 'Dev',
        },
        {
          text: 'Game',
        },
      ];
      cy.getItem('stories-filter')
        .find('button[data-item=category-selector]')
        .should('have.length', 4)
        .each(($button, index) => {
          cy.wrap($button).contains(categories[index].text);
        });
    });
    it('has search button', () => {
      cy.getItem('stories-filter').then(($sec) => {
        cy.wrap($sec).find('input[type=search]').should('not.be.visible');
        cy.wrap($sec).find('button[data-item=search-button]').click();
        cy.wrap($sec).find('input[type=search]').should('be.visible');
      });
    });
  });
  context('Checks category filtering handler', () => {
    beforeEach(() => {
      cy.setCookie('theme', 'dark').then(() => {
        cy.visit('/stories');
      });
    });
    it('shows all stories', () => {
      cy.getItem('story-cards-section')
        .find('a[data-item=story-card]')
        .should('have.length', 5);
    });
    it('shows only 2 stories', () => {
      cy.getItem('stories-filter')
        .find('button[data-item=category-selector]')
        .contains('Arts')
        .click();
      cy.getItem('story-cards-section')
        .find('a[data-item=story-card]')
        .should('have.length', 2);
    });
  });
  context('Checks search filtering handler', () => {
    beforeEach(() => {
      cy.setCookie('theme', 'dark').then(() => {
        cy.visit('/stories');
      });
    });
    it('can search one particular story', () => {
      cy.getItem('stories-filter').then(($filter) => {
        cy.wrap($filter).find('button[data-item=search-button]').click();
        cy.wrap($filter)
          .find('input[type=search]')
          .should('be.visible')
          .type('Future VR Dev');
        cy.wrap($filter)
          .find('input[type=search]')
          .should('be.visible')
          .type('{enter}');
        cy.getItem('story-cards-section')
          .find('a[data-item=story-card]')
          .should('have.length', 1)
          .first()
          .find('h6')
          .contains('Future VR Development');
      });
    });
  });
  context('Checks related keyword filtering handler', () => {
    beforeEach(() => {
      cy.visit('/stories?search=wonderwul');
    });
    it('can show particular related keyword', () => {
      cy.getItem('story-cards-section')
        .find('a[data-item=story-card]')
        .should('have.length', 3);
    });
  });
});
