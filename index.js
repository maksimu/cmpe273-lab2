var connect = require('connect');
var login = require('./login');

var app = connect();

app.use(connect.json()); // Parse JSON request body into `request.body`
app.use(connect.urlencoded()); // Parse form in request body into `request.body`
app.use(connect.cookieParser()); // Parse cookies in the request headers into `request.cookies`
app.use(connect.query()); // Parse query string into `request.query`

app.use('/', main);

var portToListen = 8000;

function main(request, response, next) {
    switch (request.method) {
        case 'GET':
            get(request, response);
            break;
        case 'POST':
            post(request, response);
            break;
        case 'DELETE':
            del(request, response);
            break;
        case 'PUT':
            put(request, response);
            break;
    }
}

function get(request, response) {
    var cookies = request.cookies;
    console.log('GET::%s', cookies);
    if ('session_id' in cookies) {
        var sid = cookies['session_id'];
        if (login.isLoggedIn(sid)) {
            response.setHeader('Set-Cookie', 'session_id=' + sid);
            response.end(login.hello(sid));
        } else {
            response.end("Invalid session_id! Please login again\n");
        }
    } else {
        response.end("Please login via HTTP POST\n");
    }
}

function post(request, response) {

    var json = request.body;
    console.log("POST:: name:%s, email:%s.", json.name, json.email);

    var newSessionId = login.login(json.name, json.email);
    response.setHeader('Set-Cookie', 'session_id=' + newSessionId);

    response.end(login.hello(newSessionId));
}

function del(request, response) {
    var cookies = request.cookies;
    console.log("DELETE:: %s", cookies);
    if ('session_id' in cookies) {
        var sid = cookies['session_id'];
        if (login.isLoggedIn(sid)) {
            console.log("DELETE:: Logout from the server. Session id=[%s]", sid);
            login.logout(sid);

            response.end('Logged out from the server\n');

        } else {
            response.end("Invalid session_id! Please login again\n");
        }
    } else {
        response.end("Please login via HTTP POST before logging out\n");
    }
}

function put(request, response) {
    console.log("PUT:: Re-generate new seesion_id for the same user");

    var cookies = request.cookies;
    console.log("DELETE:: %s", cookies);
    if ('session_id' in cookies) {
        var sid = cookies['session_id'];
        if (login.isLoggedIn(sid)) {
            console.log("DELETE:: Logout from the server. Session id=[%s]", sid);
            var newSessionId = login.renew(sid);
            response.setHeader('Set-Cookie', 'session_id=' + sid);

            response.end('Session renewed to [' + newSessionId + ']\n');

        } else {
            response.end("Invalid session_id! Please login again\n");
        }
    } else {
        response.end("Please login via HTTP POST before logging out\n");
    }
}

app.listen(portToListen);

console.log("Node.JS server running at %s...", portToListen);
