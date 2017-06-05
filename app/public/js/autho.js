var auth0 = new auth0.WebAuth({
    domain: '#{env.AUTH0_DOMAIN}',
    clientID: '#{env.AUTH0_CLIENT_ID}',
    redirectUri: '#{env.AUTH0_CALLBACK_URL}'
});

function signinGoogle() {
    auth0.authorize({
        connection: 'google-oauth2',
        responseType: 'code'
    });
}

function signinDb() {
    auth0.redirect.loginWithCredentials({
        connection: 'Username-Password-Authentication',
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        responseType: 'code'
    });
}
