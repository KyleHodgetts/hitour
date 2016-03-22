# HiTour Content Management System

Build Status: ![Circle CI](https://circleci.com/gh/KyleHodgetts/project-run-cms/tree/master.svg?style=svg&circle-token=989dd912291e5b69390dca32f8add4930208ba9f)

### Team Members
* [Kyle Hodgetts](https://github.com/KyleHodgetts)
* [Dominik Kulon](https://github.com/dkulon)
* [Ana Jalba](https://github.com/AnanaMJ)
* [Charlie Baker](https://github.com/charliebaker)
* [Adam Chlupacek](https://github.com/AdamChlupacek)
* [Phileas Hocquard](https://github.com/groupers)
* [Tahmidul Islam](https://github.com/k1462015)
* [Ben Temple](https://github.com/ben-temple)

## Installation Instructions
We have dedicated a whole document to setting up the application [here]()

## Running Instructions
`Disclaimer`: We assume you have followed the installation document

| Command        | Effect                                  |
| ---------------|-----------------------------------------|
| `make install` | Installs all ruby gems and node modules |
| `make env`     | Creates `application.yml` and populates it with env variable placeholders. Be sure to add your own access keys and secrets |
| `make setup`   | Ensure you have [Postgresql](http://www.postgresql.org/download/) installed and running locally. Migrates DB. |
| `make comp name=[INSERT NAME]` | Creates a React Component with the given name |
| `make start port=[PORTNUM]` | Port 3000 by default, starts local server on the given port |
| `make lint` | Check project for linting errors |
| `make test` | Run all tests, always run this and ensure tests all pass before pushing to github

### More about Application.yml
In order for the application to work as it should, you will need to put your own access keys into the `application.yml` file found in the `config` directory, generated by the `make env` command.

You will need to provide you own keys for the following:
* `AWS_ACCESS_KEY_ID` for Amazon Web Service
* `AWS_SECRET_ACCESS_KEY` for Amazon Web Service
* `SENDGRID_ACCESS_KEY` for sending emails to users and tour participants via the Sendgrid API

To log into the CMS on a local server
  * Email: `dev@mail.com`
  * Password: `password`
  * Note: This will not work in production!

## Contribution
  * Conventions
    * We are using Airbnb's style guides for both [Ruby](https://github.com/airbnb/ruby) and [Javascript](https://github.com/airbnb/javascript)
    * `make lint` to check for offences
  * Open pull request with name of feature
    * Feature must have full set of passing tests and marked with `Ready for Review` tag when ready to be tested
    * Tests are written using the [RSpec](http://rspec.info/) testing framework
    * Other member of team to test feature and merged when functionality has been tested.
  * Feature branch must be a passing build on [CircleCi](https://circleci.com/gh/KyleHodgetts/project-run-cms)
