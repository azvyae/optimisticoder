describe('Checking navbar', () => {
  const navbarLinks = [
    {
      name: 'optimisticoder logo',
      href: '/',
    },
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Stories',
      href: '/stories',
    },
    {
      name: 'Connect',
      href: 'https://www.linkedin.com/in/azvyae',
    },
  ];

  beforeEach(() => {
    cy.setCookie('theme', 'light').then(() => {
      cy.visit('/');
    });
  });

  context('Main navbar', () => {
    it('shows navbar and logo', () => {
      cy.getItem('main-nav').find('img');
    });

    it('still shows navbar even scrolled to bottom', () => {
      cy.window().scrollTo('bottom');
      cy.getItem('main-nav').find('div').should('be.visible');
    });
  });

  context(
    'Dekstop navbar',
    { viewportWidth: 1280, viewportHeight: 720 },
    () => {
      it("shouldn't show hamburger", () => {
        cy.getItem('main-nav')
          .find('button[data-item="hamburger"]')
          .should('not.be.visible');
      });

      it("shouldn't show mobile links", () => {
        cy.getItem('mobile-nav').should('not.exist');
      });

      it('navigates desktop links', () => {
        cy.getItem('main-nav')
          .getItem('desktop-nav')
          .find('a')
          .each(($a, index) => {
            cy.wrap($a).contains(navbarLinks[index + 1].name);
            cy.wrap($a).should(
              'have.attr',
              'href',
              navbarLinks[index + 1].href,
            );
          });
      });

      it('handles dark mode on desktop', () => {
        cy.getItem('desktop-dark-mode-toggler').first().click({ force: true });
        cy.getItem('desktop-dark-mode-toggler').first().click({ force: true });
        cy.get('html').should('have.class', 'dark');
        cy.getItem('desktop-dark-mode-toggler').first().click({ force: true });
        cy.get('html').should('not.have.class', 'dark');
      });
    },
  );

  context('Mobile navbar', { viewportWidth: 414, viewportHeight: 896 }, () => {
    it("shouldn't show hamburger", () => {
      cy.getItem('main-nav')
        .find('button[data-item="hamburger"]')
        .should('be.visible');
    });

    it("shouldn't show desktop links", () => {
      cy.getItem('desktop-nav').should('not.be.visible');
    });

    it('can use sidebar toggler', () => {
      cy.getItem('mobile-nav').should('not.exist');
      cy.getItem('main-nav').find('button[data-item="hamburger"]').click();
      cy.getItem('mobile-nav').find('a').should('be.visible');
    });

    it('navigate mobile links', () => {
      cy.getItem('mobile-nav').should('not.exist');
      cy.getItem('main-nav').find('button[data-item="hamburger"]').click();
      cy.getItem('mobile-nav').find('a').should('be.visible');
      cy.getItem('mobile-nav')
        .find('a')
        .each(($a, index) => {
          cy.wrap($a).contains(navbarLinks[index + 1].name);
          cy.wrap($a).should('have.attr', 'href', navbarLinks[index + 1].href);
        });
    });

    it('handles dark mode on mobile', () => {
      cy.getItem('mobile-dark-mode-toggler').first().click({ force: true });
      cy.getItem('mobile-dark-mode-toggler').first().click({ force: true });
      cy.get('html').should('have.class', 'dark');
      cy.getItem('mobile-dark-mode-toggler').first().click({ force: true });
      cy.get('html').should('not.have.class', 'dark');
    });
  });
});
