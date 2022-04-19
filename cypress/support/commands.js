import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

Cypress.Commands.add('login', () => {
  Cypress.log({
    name: 'loginViaAuth0'
  });
  // craft request
  const options = {
    method: 'POST',
    url: Cypress.env('auth_url'),
    body: {
      grant_type: Cypress.env('auth_grant_type'),
      username: Cypress.env('auth_username'),
      password: Cypress.env('auth_password'),
      audience: Cypress.env('auth_audience'),
      scope: Cypress.env('auth_scope'),
      client_id: Cypress.env('auth_client_id'),
      client_secret: Cypress.env('auth_client_secret')
    }
  };

  // send request
  cy.request(options)
    .then((resp) => resp.body)
    .then((body) => {
      const { access_token, expires_in, refresh_token } = body;

      // calculate token expiry
      const expireDate = dayjs.utc().add(expires_in, 'second').format('YYYY-MM-DD HH:mm:ss');

      // set local storage
      sessionStorage.setItem('access_token', access_token);
      sessionStorage.setItem('refresh_token', refresh_token);
      sessionStorage.setItem('is_refreshing', false);
      sessionStorage.setItem('expireDate', expireDate);
    });
});
