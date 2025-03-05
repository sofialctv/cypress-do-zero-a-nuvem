import '../support/objects'

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  // Lição 1
  // Exercício extra 1

  it('preenche os campos obrigatórios e envia o formulário', () => {
    
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)
    
    cy.get('#firstName').type('NOME')
    cy.get('#lastName').type('SOBRENOME')
    cy.get('#email').type('emailteste@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0})
    
    // Clica no botão 'Enviar'
    cy.get('.button[type="submit"]').click()

    // Verifica se a mensagem de sucesso está visível
    cy.get('.success').should('be.visible')
  })

  // Exercício extra 2

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',() => {

    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)

    cy.get('#firstName').type('NOME')
    cy.get('#lastName').type('SOBRENOME')
    cy.get('#open-text-area').type(longText, { delay: 0})

    cy.get('#email').type('emailteste@gmail,com')
    cy.get('.button[type="submit"]').click()
    cy.get('.error').should('be.visible')

  })

  // Exercício extra 3
  it('valida que, se um valor não-numérico for digitado, seu valor continuará vazio', () => {
    cy.get('#phone')
    .type('adcde')
    .should('have.value', '')
  })

  // Exercício extra 4
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)

    cy.get('#firstName').type('NOME')
    cy.get('#lastName').type('SOBRENOME')
    cy.get('#email').type('emailteste@gmail,com')
    cy.get('#open-text-area').type(longText, { delay: 0})
    
    // Torna telefone obrigatório
    cy.get('#phone-checkbox').click()
    
    // Garante que o campo de telefone está vazio
    cy.get('#phone').should('have.value', '')

    // Envio do formulário
    cy.get('.button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  // Exercício extra 5
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

    cy.get('#firstName')
    .type('DIGITADO')
    .should('have.value', 'DIGITADO')
    .clear()
    .should('have.value', '')

    cy.get('#lastName').
    type('DIGITADO')
    .should('have.value', 'DIGITADO')
    .clear()
    .should('have.value', '')

    cy.get('#email')
    .type('DIGITADO@gmail.com')
    .should('have.value', 'DIGITADO@gmail.com')
    .clear()
    .should('have.value', '')
    
    cy.get('#phone').
    type('123456789')
    .should('have.value', '123456789')
    .clear()
    .should('have.value', '')
    
    cy.get('#open-text-area').
    type('DIGITADO')
    .should('have.value', 'DIGITADO')
    .clear()
    .should('have.value', '')

  })

  // Exercício extra 6
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {

    // Método 1: teste apenas acessa a aplicação e clica em Enviar
    cy.get('.button[type=submit]').click()

    cy.get('.error').should('be.visible')

    // Método 2: garantindo que os campos de fato estão vazios
    cy.get('#firstName').should('have.value', '')
    cy.get('#lastName').should('have.value', '')
    cy.get('#email').should('have.value', '')
    cy.get('#phone-checkbox').click()
    cy.get('#phone').should('have.value', '')
    cy.get('#open-text-area').should('have.value', '')
    cy.get('.button[type=submit]').click()

    cy.get('.error').should('be.visible')
  })

  // Exercício extra 7 - Comandos customizados, utilizando objetos pré definidos
  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  // Exercício extra 8
  it.only('utlizando cy.contains() ao invés de cy.get', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)
    
    cy.get('#firstName').type('NOME')
    cy.get('#lastName').type('SOBRENOME')
    cy.get('#email').type('emailteste@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0})
    cy.contains('.button', 'Enviar').click()
    
    cy.get('.success').should('be.visible')  
  })

})