describe("Countries app", () => {
  it("front page can be opened", () => {
    cy.visit("http://localhost:3000/countries");
    cy.contains("Countries");
  });

  beforeEach(function () {
    cy.visit("http://localhost:3000/countries");
  });

  describe("countries page", () => {
    it("data is fetched", () => {
      cy.contains("Iceland");
    });

    it("only five countries are shown", () => {
      cy.get(".countrytablebody").find("tr").should("have.length", 5);
    });

    it("pagination forward works", () => {
      cy.get('.MuiTablePagination-actions > [tabindex="0"]').click();
      cy.contains("New Zealand");
    });

    it("Rows per page can be changed", () => {
      cy.get(".MuiTablePagination-root > .MuiToolbar-root").contains(5).click();
      cy.get('[data-value="10"]').click();
      cy.get(".countrytablebody").find("tr").should("have.length", 10);
    });

    // TEST FAILS DUE TO ELECTRON BROWSER PROBLEM NOT RECOGNIZING 'ENTER' KEYSTROKE
    it("country can be searched", () => {
      cy.get(".css-1orzy9s > .MuiInputBase-root > .MuiInputBase-input")
        .click()
        .type("ge{enter}");
      cy.contains("South Georgia");
      cy.contains("Algeria");
      cy.contains("Iceland").should("not.exist");
    });
  });

  describe("country detail page", () => {
    it("page can be reached", () => {
      cy.get(".countryDetailButton").first().click();
      cy.contains("Reykjavik");
    });

    it("Back button on detailpage works", () => {
      cy.get(".countryDetailButton").first().click();
      cy.contains("Reykjavik");
      cy.get(".countryDetailBack").click();
      cy.contains("Japan");
    });
  });
});
