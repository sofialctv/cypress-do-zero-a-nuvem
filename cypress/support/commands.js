import { dataDefault, dataJose } from './objects'

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (objeto = dataJose) => {
    cy.get('#firstName').type(objeto.firstName)
    cy.get('#lastName').type(objeto.lastName)
    cy.get('#email').type(objeto.email)
    cy.get('#open-text-area').type(objeto.text)
    cy.get('.button[type="submit"]').click()
})