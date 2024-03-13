/// <reference types="cypress" />

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('passes', () => {
    cy.get('.interface.out')
  })
})
