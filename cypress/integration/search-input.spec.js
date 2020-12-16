describe("search input", ()=> {
  beforeEach(() => {
    cy.visit("/");
  })
  it("focusses on input on load", () => {
    cy.focused().should("have.class", "form-control my-0 py-1 amber-border")
  });

  it("accepts input", () => {
    cy.get(".form-control.my-0.py-1.amber-border")
      .type("Test Search")
      .should("have.value", "Test Search");
  });

  it("submit search", () => {
    cy.get(".form-control.my-0.py-1.amber-border")
      .clear() 
      .type("Test Search")
      .should("have.value", "Test Search");
    
    cy.get(".btn.btn-primary")
      .click();
    
  })
})