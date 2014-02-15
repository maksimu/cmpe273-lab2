cmpe273-lab2
============

Node.JS with [Connect]

Try this code [HERE]

### To Install Dependencies ###

```sh
npm install
```

### To run the application
```sh
node index.js
```

### cURL commands

* POST with JSON payload in the request body.
```sh
curl -i http://localhost:8000/ -X POST -H "Content-Type: application/json" -d '{ "name" : "Foo", "email":"email@gmail.com" }'
```

* GET go check if connection to the server works
```sh
curl -i http://localhost:8000/ -X GET
```

* GET with setting **Cookies** in the request header.
```sh
curl -i http://localhost:8000/ -X GET --cookie "session_id=99999"
```
Add -v to enable the verbose mode to see what you are sending in the request header.
```sh
curl -i http://localhost:8000/ -X GET --cookie "session_id=99999" -v
```

* PUT with an optional cookie
```sh
curl -i http://localhost:8000/ -X PUT --cookie "session_id=xxxxxxxxxx"
```

* DELETE with an optional cookie
```sh
curl -i http://localhost:8000/ -X DELETE --cookie "session_id=xxxxxxxxxx"
```

[Connect]:http://www.senchalabs.org/connect/
[HERE]:http://runnable.com/Uv_fhCtP3zcOAABV/cmpe273-lab2-for-node-js-and-connect