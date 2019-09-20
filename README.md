# Full Stack Login Example

An implementation of a website with login using Aurelia, Node, Express, & Postgresql as well as various other libraries to get everything working together (check the package.json files in the client and server folders for the full list).

## Getting Started

### Prerequisites

I've included the node modules in the repo for simplicities sake. 

TODO: Finish this section (Likely need node installed)

### Database
column_name    oridinl_position             column_default              data_type              character_maximum_length
"id"	        1	               "nextval('users_id_seq'::regclass)"	"integer"	                    null
"username"	    2		                          null                  "character varying"	             40
"user_password"	3		                          null                  "character varying"	            null

### Installing

Cloning the repository should be the only installation necessary

## Running the tests

TODO: Make test code

TODO: Explain how to run the automated tests

### Break down of tests

TODO: Explain what these tests test and why

## Deployment

Start Backend: "node server"

Start Frontend: "au run --watch"

## Built With

* [Aurelia](https://aurelia.io/home) - The web framework used
* [NPM](https://www.npmjs.com/) - Dependency Management

## Authors

* **Taylor Hoss** - [hosstay](https://github.com/hosstay)
