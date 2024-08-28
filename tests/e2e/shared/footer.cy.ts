describe('Checking footer', () => {
  const footerLinks = [
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
  const socialLinks = [
    {
      href: 'https://instagram.com/azvyae',
    },
    {
      href: 'https://x.com/azvyae',
    },
    {
      href: 'https://www.linkedin.com/in/azvyae',
    },
    {
      href: 'https://www.tiktok.com/@azvyae',
    },
  ];
  const additionalLinks = [
    {
      name: 'Disclaimer',
      href: '/disclaimer',
    },
    {
      name: 'Privacy Policy',
      href: '/privacy-policy',
    },
  ];
  beforeEach(() => {
    cy.setCookie('theme', 'light').then(() => {
      cy.visit('/');
    });
  });

  it('has optimisticoder logo', () => {
    cy.get('footer')
      .find('img')
      .should('have.attr', 'title', 'Optimisticoder logo')
      .parent('a')
      .should('have.attr', 'href', '/');
  });
  it('navigates footer links', () => {
    cy.getItem('footer-links')
      .find('a')
      .each(($a, index) => {
        cy.wrap($a).contains(footerLinks[index].name);
        cy.wrap($a).should('have.attr', 'href', footerLinks[index].href);
      });
  });
  it('has social media links', () => {
    cy.getItem('social-links')
      .find('a')
      .each(($a, index) => {
        cy.wrap($a).should('have.attr', 'href', socialLinks[index].href);
      });
  });
  it('has additional media links', () => {
    cy.getItem('additional-links')
      .find('a')
      .each(($a, index) => {
        cy.wrap($a).contains(additionalLinks[index].name);
        cy.wrap($a).should('have.attr', 'href', additionalLinks[index].href);
      });
  });
});
