# Full Stack Login Example

An implementation of a website with login using Aurelia, Node, Express, & Postgresql

NEW: Docker implementation

## Getting Started

### Prerequisites

Docker:

* Have docker and docker-compose installed

Non-Docker:

* Have Node installed

### Database

Database table spec included in db.init(). Auto-creates by default.

### Installing

Docker:
* Install 'docker' and 'docker-compose'

Non-Docker:

* Install Node
* Clone the repository
* Install Aurelia globally (npm install aurelia-cli -g)
* Install Nodemon globally if you're going to use it (npm install nodemon -g)

## Running the tests

Run tests via command: 'npm run test'

TODO: Write more tests

## Deployment

Docker:

* For Development Environment: run 'docker-compose -f docker-compose.dev.yml up --build'
* For Prodction Environment: run 'docker-compose -f docker-compose.prod.yml up --build'

Non-Docker:

Start Backend: 'node server' or 'nodemon --inspect server' if you have nodemon installed and want dedicated devtools.

Start Frontend: 'npm start' or 'au run --watch' if you have aurelia cli installed and want it to watch for changes.

Webpage runs at localhost:8080, backend listens on :3000

## Built With

* [Aurelia](https://aurelia.io/home) - Frontend framework
* [Node](https://nodejs.org/en/download/) - Backend framework
* [NPM](https://www.npmjs.com/) - Dependency Management
* [Docker](https://www.docker.com/) - Containerization

## Authors

* **Taylor Hoss** - [hosstay](https://github.com/hosstay)
