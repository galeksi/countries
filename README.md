### Integrify countries assignment

Application for displaying country data.

## Description:

React application build with 'create-react-app' utilizing REST Countries API.

The application displays:

- Countries list view with details pagination and search by country name
- Country detail view with more details and link to location on google maps

## Prerequisites

Node version 14 or higher

## Configuration

Public version hosted on Github pages: https://galeksi.github.io/countries

To run locally:

- git clone repo
- npm update to install all dependencies (alternatively yarn upgarde)
- npm start

## Tests

E2E tests:

Application uses cypress for E2E tests. To use cypress the app has to be running. Tests are in cypress/e2e/countries.cy.js.

-> Run tests with command 'npm run cypress:open'
-> Testing the 'search' fails due to electron browser problem recognizing 'Enter' keystroke

IMPORTANT: Running Linux on Windows Subsystem (WSL2) might need some further setup to open cypress. More info here: https://nickymeuleman.netlify.app/blog/gui-on-wsl2-cypress

## Technology choices:

- axios: http client for fetching data
- cypress: For testing
- gh-pages: For deployment
- MaterialUI: For styling
