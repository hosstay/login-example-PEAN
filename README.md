# Full Stack Login Example

An implementation of a website with login using Aurelia, Node, Express, & Postgresql as well as various other libraries to get everything working together (check the package.json files in the client and server folders for the full list).

## Getting Started

### Prerequisites

Have Node installed

I've included the node modules in the repo for simplicities sake. 

### Database

Table 'users'

column_name             column_default                data_type              character_maximum_length

'id'          'nextval('users_id_seq'::regclass)'	    'integer'	                     null

'username'                   null                 'character varying'	                40

'password'	                 null                 'character varying'	               200

### Installing

* Install Node
* Clone the repository
* Have Aurelia installed globally (npm install aurelia-cli -g)
* Have Nodemon install globally if you're going to use it (npm install nodemon -g)

## Running the tests

Run tests via command: 'npm run test'

TODO: Write more tests

## Deployment

Start Backend: 'node server' or 'nodemon --inspect server' if you have nodemon installed and want dedicated devtools.

Start Frontend: 'npm start' or 'au run --watch' if you have aurelia cli installed and want it to watch for changes.

Webpage runs at localhost:8080, backend listens on :3000

## Built With

* [Aurelia](https://aurelia.io/home) - Frontend framework
* [Node](https://nodejs.org/en/download/) - Backend framework
* [NPM](https://www.npmjs.com/) - Dependency Management

## Authors

* **Taylor Hoss** - [hosstay](https://github.com/hosstay)
