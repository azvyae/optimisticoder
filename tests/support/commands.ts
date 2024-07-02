/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
declare global {
  namespace Cypress {
    type AliasSelector = `@${string}`;
    interface Chainable {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      get(alias: AliasSelector): Chainable<any>;
      getItem(dataItemAttribute: string): Chainable<JQuery<HTMLElement>>;
      scrollOffset(item: JQuery<HTMLElement>): Chainable<JQuery<HTMLElement>>;
    }
  }
}
Cypress.Commands.add('getItem', (selector) => {
  return cy.get(`[data-item="${selector}"]`);
});
Cypress.Commands.add('scrollOffset', (selector) => {
  return cy.wrap(selector).scrollIntoView({
    duration: 150,
    easing: 'swing',
    timeout: 1000,
  });
});

export {};
