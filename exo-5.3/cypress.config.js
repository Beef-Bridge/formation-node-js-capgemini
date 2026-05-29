import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3888',
    specPattern: 'cypress/e2e/app/*.cy.{js,mjs,jsx,ts,tsx}'
  },
});