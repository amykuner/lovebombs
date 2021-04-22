// Cypress has a handy way to run some code before every test—the beforeEach method.
// use this to reset our database before each new test runs.
beforeEach(() => {
  cy.task('resetDb');
});

describe('check homepage link ', () => {
  it('can navigate pages', () => {
    cy.visit('/');
  });
});
