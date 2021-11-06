# Denote

<a href="https://github.com/Araekiel/denote/blob/master/LICENSE"><img alt="MIT License" src="https://img.shields.io/apm/l/atomic-design-ui.svg?"></a>
<a href="https://github.com/Araekiel/denote/releases/tag/v1.0"><img alt="Github Release" src="https://img.shields.io/badge/release-v1.0-blue"></a>

<h4>REST API with JWT authentication for a generic notes app built with <a href="https://deno.land/">Deno</a> (v1.4.0), <a href="https://github.com/oakserver/oak">Oak</a>, and <a href="https://www.typescriptlang.org/">TypeScript</a>.</h4>

## Instructions

Follow the standard procedure to clone the repository and then continue with the steps.

Denote uses ***denon*** as a nodemon alternative for deno. After installing run the following command to install denon. 

```bash
$ deno install --allow-read --allow-run --allow-write --allow-net -f -q --unstable https://deno.land/x/denon@2.4.0/denon.ts
```

> It will use the config specified in ***denon.json***.

Run Denote with the following command:

```bash
$ denon start
```

> Denote reads the port it is supposed to run on from the '.env' file. The default port is 108. 

## Important information 

### API Endpoints

```
GET     /token                  # => Get auth token
GET     /api/users              # => Get all the users
POST    /api/users              # => Add a user
GET     /api/users/:id          # => Get one particular user
GET     /api/users/:id/notes    # => Get one user's notes
DELETE  /api/users/:id          # => Delete a user
GET     /api/notes              # => Get all the notes
GET     /api/notes/:id          # => Get one particular note
POST    /api/notes              # => Add a note
PUT     /api/notes/:id          # => Update a note
DELETE  /api/notes/:id          # => Delete a note
```

### Default user creds 

```
username: admin
password: admin
```

### Accessing the API 

To get started send a request to /token with the default username and password in the body to get the auth token. That token is required to be sent with every request to any other endpoint as the 'Authorization' header.

## Update checklist

| Status |         Update         | 
|--------|:----------------------:|
|  Fin.  |   JWT Authentication   |
|        |     NoSQL Database     | 


## Authors

- Araekiel - [Github](https://www.github.com/Araekiel)

## License 

[MIT License](https://github.com/Araekiel/denote/blob/master/LICENSE) | Copyright (c) 2020 Kumar Shashwat
