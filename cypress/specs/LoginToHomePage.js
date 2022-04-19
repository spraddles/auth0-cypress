describe('login', () => {
  it('should successfully log into our app', () => {
    cy.login();
    cy.visit('/');
    cy.location('pathname').should('eq', '/login');
  });
});
