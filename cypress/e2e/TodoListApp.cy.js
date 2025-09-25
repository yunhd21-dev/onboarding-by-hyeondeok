describe('Todo List App', () => {
  Cypress.Commands.add('inputTodo', () => {
    cy.get('.todo-list-input').type('테스트_1{enter}');
    cy.get('.todo-list-input').type('테스트_2{enter}');
    cy.get('.todo-list-input').type('테스트_3{enter}');
  });

  context('최초 앱 실행', () => {
    it("입력된 항목이 없을 경우 'No List'를 표시한다.", () => {
      cy.visit('/');
      cy.get('.todo-list-li.empty > span').should('text', 'No List');
    });
  });

  context('할 일을 입력 한 후 엔터키를 누르면', () => {
    it('입력한 항목이 할 일 목록에 노출 된다.', () => {
      cy.visit('/');
      cy.get('.todo-list-input').type('테스트_1{enter}');
      cy.get('.todo-list-ul > li').should('have.length', 1);
    });
    it('할 일 완료하지 않은 갯수가 "N items left"로 노출 된다.', () => {
      cy.visit('/');
      cy.get('.todo-list-input').type('테스트_1{enter}');
      cy.get('.todo-list-status-text').should('text', '1 items left');
    });
  });

  context('할 일 항목을 체크하면', () => {
    it('완료된 항목은 목록의 맨 하단으로 이동된다.', () => {
      cy.visit('/');
      cy.inputTodo();

      cy.get('.todo-list-ul > :nth-child(1) > input').click();
      cy.get('.todo-list-ul > :nth-child(3) > span').should('text', '테스트_3');
    });
    it('완료된 항목을 체크해제 하면, 완료 되지 않은 항목의 목록 맨 상단으로 이동된다.', () => {
      cy.visit('/');
      cy.inputTodo();

      cy.get('.todo-list-ul > :nth-child(2) > input').click();
      cy.get('.todo-list-ul > :nth-child(3) > span').should('text', '테스트_2');
      cy.get('.todo-list-ul > :nth-child(3) > input').click();
      cy.get('.todo-list-ul > :nth-child(1) > span').should('text', '테스트_2');
    });
    it('완료하지 않은 항목 개수가 업데이트된다.', () => {
      cy.visit('/');
      cy.inputTodo();

      cy.get('.todo-list-ul > :nth-child(1) > input').click();
      cy.get('.todo-list-status-text').should('text', '2 items left');
    });
    it('완료된 항목 개수가 업데이트된다.', () => {
      cy.visit('/');
      cy.inputTodo();

      cy.get('.todo-list-ul > :nth-child(1) > input').click();
      cy.get('.todo-list-completed-text').should('text', '(1)');
    });
  });

  context('Clear Completed 버튼을 클릭하면', () => {
    it('완료된 항목은 제거된다.', () => {
      cy.visit('/');
      cy.inputTodo();

      cy.get('.todo-list-ul > :nth-child(1) > input').click();
      cy.get('.todo-list-ul > :nth-child(3) > span').should('text', '테스트_3');

      cy.get('.todo-list-clear-area > .todo-list-filter-button').click();
      cy.get('.todo-list-ul > li').should('have.length', 2);
    });
    it('완료된 항목 개수가 "0"으로 업데이트된다.', () => {
      cy.visit('/');
      cy.inputTodo();

      cy.get('.todo-list-ul > :nth-child(1) > input').click();
      cy.get('.todo-list-ul > :nth-child(3) > span').should('text', '테스트_3');

      cy.get('.todo-list-clear-area > .todo-list-filter-button').click();
      cy.get('.todo-list-ul > li').should('have.length', 2);

      cy.get('.todo-list-completed-text').should('text', '(0)');
    });
  });

  context('필터 버튼 메뉴에서', () => {
    it('"Active" 버튼을 클릭하면 완료되지 않은 목록을 표시한다.', () => {
      cy.visit('/');
      cy.inputTodo();

      cy.get('.todo-list-ul > :nth-child(1) > input').click();
      cy.get('.todo-list-ul > :nth-child(3) > span').should('text', '테스트_3');

      cy.get('.todo-list-filter-area > :nth-child(2)').click();
      cy.get('.todo-list-ul > li input[type="checkbox"]:checked').should(
        'not.exist'
      );
    });
    it('"Completed" 버튼을 클릭하면 완료된 목록을 표시한다.', () => {
      cy.visit('/');
      cy.inputTodo();

      cy.get('.todo-list-ul > :nth-child(1) > input').click();
      cy.get('.todo-list-ul > :nth-child(3) > span').should('text', '테스트_3');

      cy.get('.todo-list-filter-area > :nth-child(3)').click();
      cy.get('.todo-list-ul > li input[type="checkbox"]:checked').should(
        'exist'
      );
    });
  });
});
