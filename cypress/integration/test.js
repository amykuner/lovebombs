// Cypress has a handy way to run some code before every test—the beforeEach method.
// use this to reset our database before each new test runs.
beforeEach(() => {
  cy.task('resetDb');
});

describe('check homepage link ', () => {
  it('can go to home page', () => {
    cy.visit('/');
  });

});

it('can select dropdown', () => {
  cy.visit('/');
  cy.get('select').select('Neville');
  cy.get('select').should('have.value', 'Neville');
  cy.get('form').submit();
  cy.visit('/facmembers/:Neville');
});