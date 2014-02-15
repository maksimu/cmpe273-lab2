/**
 * Login Class
 */
function Login() {
    // sessionId -> user map
    this.sessionMap = {
        99999: { name: 'Foo', email: 'foo@bar.com' }
    };
}
/**
 * Say Hello {name} to the user
 */
Login.prototype.hello = function (sessionId) {
    var userInfo = this.sessionMap[sessionId];

    return 'Hello ' + userInfo.name + ' email=[' + userInfo.email + ']. Your session id=[' + sessionId + ']\n';
};

/**
 * Check whether the given session id is valid (is in sessionMap) or not.
 */
Login.prototype.isLoggedIn = function (sessionId) {
    return sessionId in this.sessionMap;
};

/**
 * Create a new session id for the given user .
 */
Login.prototype.login = function (_name, _email) {
    /*
     * Generate unique session id and set it into sessionMap like foo@bar.com
     */
    var sessionId = new Date().getTime();
    this.sessionMap[sessionId] = { name: _name, email: _email }

    console.log('login:: new session id ' + sessionId + ' for login::' + _email);

    return sessionId;
};

/**
 * Logout from the server
 */
Login.prototype.logout = function (sessionId) {
    console.log('logout:: ' + sessionId + " (Before name=[" + this.sessionMap[sessionId].name + "], email=[" + this.sessionMap[sessionId].email + "])");

    this.sessionMap[sessionId] = null;

    if (this.sessionMap[sessionId] === null) {
        console.log("logout:: Logged out successfully!")
    } else {
        console.warn("logout:: HM, strange... was not able to log out!")
    }
};

/**
 * Renew a session with a new session id for the given user.
 */
Login.prototype.renew = function (sessionId) {

    var name = this.sessionMap[sessionId].name;
    var email = this.sessionMap[sessionId].email;

    console.log('renew:: ' + sessionId + " ( name=[" + name + "], email=[" + email + "])");

    this.sessionMap[sessionId] = null;

    console.log("renew:: removed sessionid=[%s]", sessionId);

    /*
     * Generate unique session id and set it into sessionMap like foo@bar.com
     */
    var newSessionId = new Date().getTime();
    this.sessionMap[newSessionId] = { name: name, email: email }

    console.log('renew:: new session id %s for name=[%s] email=[%s]' , newSessionId, name, email);

    return newSessionId;
};

// Export the Login class
module.exports = new Login();
