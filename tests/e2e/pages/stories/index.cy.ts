describe('Index and search story page', () => {
  context('Checks hero section', () => {
    beforeEach(() => {
      cy.visit('/stories');
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
      cy.visit('/stories');
    });
    it('has category selectors', () => {
      const categories = [
        {
          text: 'All',
          link: '/stories',
        },
        {
          text: 'Arts',
          link: '/stories?category=arts',
        },
        {
          text: 'Dev',
          link: '/stories?category=dev',
        },
        {
          text: 'Game',
          link: '/stories?category=game',
        },
      ];
      cy.getItem('stories-filter')
        .find('a')
        .eq(4)
        .each(($a, index) => {
          cy.wrap($a)
            .contains(categories[index].text)
            .should('have.attr', 'href', categories[index].link);
        });
    });
    it('has search button', () => {
      cy.getItem('stories-filter').then(($sec) => {
        cy.wrap($sec).find('input[type=search]').should('not.be.visible');
        cy.wrap($sec).find('button').click();
        cy.wrap($sec).find('input[type=search]').should('be.visible');
      });
    });
  });
  context('Checks category filtering handler', () => {
    beforeEach(() => {
      cy.visit('/stories');
    });
    it('shows all stories', () => {
      cy.getItem('story-cards-section').find('a[data-item=story-card]').eq(5);
    });
    it('shows only 2 stories', () => {
      cy.getItem('stories-filter').find('a').contains('Arts').click();
      cy.getItem('story-cards-section').find('a[data-item=story-card]').eq(2);
    });
  });
  context('Checks search filtering handler', () => {
    beforeEach(() => {
      cy.visit('/stories');
    });
    it('can search one particular story', () => {
      cy.getItem('stories-filter').then(($filter) => {
        cy.wrap($filter).find('button').click();
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
          .eq(1)
          .first()
          .find('h6')
          .contains('Future VR Development');
      });
    });
  });
  context('Checks related keyword filtering handler', () => {
    beforeEach(() => {
      cy.visit('/stories?related=wonderwul');
    });
    it('can show particular related keyword', () => {
      cy.getItem('story-cards-section').find('a[data-item=story-card]').eq(3);
    });
  });
});
