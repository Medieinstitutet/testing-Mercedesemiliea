describe('Movie App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    
  });

    it("should display movies on search", () => {
      cy.get("#searchText").type("Avengers");
      cy.get('#searchform').submit();
      cy.get("#search-result > div").should("have.length", 0);
    
    });

    it("should display 'Inga sökresultat att visa' when there are no search results", () => {
      cy.get("#searchText").type("Nonexistent Movie");
      cy.get("#searchform").submit();
      cy.get("p").should("have.text", "Inga sökresultat att visa");
    });

    it('should display "No search results" message for invalid search', () => {
      cy.get('#searchText').type('InvalidSearchTerm');
      cy.get('#searchform').submit();
      cy.contains('p', 'Inga sökresultat att visa');
    });

    it('should display "No search results" message on API error', () => {
      cy.intercept('GET', 'api/search*', { statusCode: 500, body: {} });
      cy.get('#searchText').type('Avengers');
      cy.get('#searchform').submit();
      cy.contains('p', 'Inga sökresultat att visa');
    });
    
    it('should assign event listener and toggle sort button visibility in init', () => {
      cy.visit('http://localhost:5173/');
      cy.get('#sort').should('have.class', 'invisible');
      cy.get('#searchform').submit();
     
   });
     
   it('should toggle sort button visibility on unsuccessful search', () => {
    cy.get('#searchText').type('Nonexistent Movie');
    cy.get('#searchform').submit();
    cy.get('#sort').should('have.class', 'invisible');

  });

  it('should toggle sort button visibility when there are search results', () => {
    cy.visit('http://localhost:5173/');
    cy.get("#searchText").type("Avengers");
    cy.get('#searchform').submit();
    cy.get('#sort').should('not.have.class');
  });
  
 
  it('should create HTML elements for movies', () => {
    cy.visit('http://localhost:5173/');
    cy.get("#searchText").type("Avengers");
    cy.get('#searchform').submit();
  
    cy.get('.movie').should('have.length', 0);
    cy.get('.movie__title').should('have.length', 0);
    cy.get('.movie__image').should('have.length', 0);
    cy.get('img').should('have.length', 0);
  
    
   
 });

 it('should toggle sort order on button click', () => {
  cy.get('#sort').click({ force: true });

});

it('should handle successful API response', () => {
  cy.intercept('GET', 'api/search*', {
    statusCode: 200,
    body: [
      { name: 'Avengers: Endgame', imageUrl: 'url1' },
    
    ],
  });

  cy.get('#searchText').type('Avengers');
  cy.get('#searchform').submit();
  cy.get('.movie').should('have.length.greaterThan', 0);
});

it('should handle API error response', () => {

  cy.get('#searchText').type('Avengers');
  cy.get('#searchform').submit();
  cy.contains('p', 'Inga sökresultat att visa');
});

 
  });
