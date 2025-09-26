import 'cypress-real-events/support';

describe('Todo List App', () => {
  Cypress.Commands.add('inputTodo', () => {
    cy.get('.todo-list-input').type('테스트_1{enter}');
    cy.wait(100);
    cy.get('.todo-list-input').type('테스트_2{enter}');
    cy.wait(100);
    cy.get('.todo-list-input').type('테스트_3{enter}');
    cy.wait(100);
    cy.get('.todo-list-input').type('테스트_4{enter}');
    cy.wait(100);
    cy.get('.todo-list-input').type('테스트_5{enter}');
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

      cy.wait(800);
    });

    it('할 일 완료하지 않은 갯수가 "N items left"로 노출 된다.', () => {
      cy.visit('/');
      cy.get('.todo-list-input').type('테스트_1{enter}');
      cy.get('.todo-list-status-text').should('text', '1 items left');

      cy.wait(800);
    });
  });

  context('할 일 항목을 체크하면', () => {
    it('완료된 항목은 목록의 맨 하단으로 이동된다.', () => {
      cy.visit('/');
      cy.inputTodo();

      cy.get('.todo-list-ul > :nth-child(1) > input').click();
      cy.get('.todo-list-ul > :nth-child(5) > span').should('text', '테스트_5');

      cy.wait(800);
    });

    it('완료된 항목을 체크해제 하면, 완료 되지 않은 항목의 목록 맨 상단으로 이동된다.', () => {
      cy.visit('/');
      cy.inputTodo();

      cy.wait(800);
      cy.get('.todo-list-ul > :nth-child(1) > input').click();
      cy.get('.todo-list-ul > :nth-child(5) > span').should('text', '테스트_5');
      cy.wait(800);
      cy.get('.todo-list-ul > :nth-child(5) > input').click();
      cy.get('.todo-list-ul > :nth-child(1) > span').should('text', '테스트_5');

      cy.wait(1000);
    });

    it('완료하지 않은 항목 개수가 업데이트된다.', () => {
      cy.visit('/');
      cy.inputTodo();

      cy.wait(500);
      cy.get('.todo-list-ul > :nth-child(1) > input').click();
      cy.get('.todo-list-status-text').should('text', '4 items left');

      cy.wait(800);
    });

    it('완료된 항목 개수가 업데이트된다.', () => {
      cy.visit('/');
      cy.inputTodo();

      cy.wait(500);
      cy.get('.todo-list-ul > :nth-child(1) > input').click();
      cy.get('.todo-list-completed-text').should('text', '(1)');

      cy.wait(800);
    });
  });

  context('Clear Completed 버튼을 클릭하면', () => {
    it('완료된 항목은 제거된다.', () => {
      cy.visit('/');
      cy.inputTodo();

      cy.wait(500);
      cy.get('.todo-list-ul > :nth-child(1) > input').click();
      cy.get('.todo-list-ul > :nth-child(5) > span').should('text', '테스트_5');

      cy.wait(500);
      cy.get('.todo-list-clear-area > .todo-list-filter-button').click();
      cy.get('.todo-list-ul > li').should('have.length', 4);

      cy.wait(800);
    });

    it('완료된 항목 개수가 "0"으로 업데이트된다.', () => {
      cy.visit('/');
      cy.inputTodo();

      cy.wait(500);
      cy.get('.todo-list-ul > :nth-child(1) > input').click();
      cy.get('.todo-list-ul > :nth-child(5) > span').should('text', '테스트_5');

      cy.wait(500);
      cy.get('.todo-list-clear-area > .todo-list-filter-button').click();
      cy.get('.todo-list-ul > li').should('have.length', 4);

      cy.get('.todo-list-completed-text').should('text', '(0)');

      cy.wait(800);
    });
  });

  context('필터 버튼 메뉴에서', () => {
    it('"Active" 버튼을 클릭하면 완료되지 않은 목록을 표시한다.', () => {
      cy.visit('/');
      cy.inputTodo();

      cy.wait(500);
      cy.get('.todo-list-ul > :nth-child(1) > input').click();
      cy.get('.todo-list-ul > :nth-child(5) > span').should('text', '테스트_5');

      cy.wait(500);
      cy.get('.todo-list-filter-area > :nth-child(2)').click();
      cy.get('.todo-list-ul > li input[type="checkbox"]:checked').should(
        'not.exist'
      );

      cy.wait(800);
    });

    it('"Completed" 버튼을 클릭하면 완료된 목록을 표시한다.', () => {
      cy.visit('/');
      cy.inputTodo();

      cy.wait(500);
      cy.get('.todo-list-ul > :nth-child(1) > input').click();
      cy.get('.todo-list-ul > :nth-child(5) > span').should('text', '테스트_5');

      cy.wait(500);
      cy.get('.todo-list-filter-area > :nth-child(3)').click();
      cy.get('.todo-list-ul > li input[type="checkbox"]:checked').should(
        'exist'
      );
      cy.wait(800);
    });
  });

  context('드래그앤드랍 기능으로', () => {
    it('첫 번째 할 일을 두 번째 아래로 이동하면 두 번째로 이동한다.', () => {
      cy.visit('/');
      cy.inputTodo();

      cy.get('.todo-list-ul > :nth-child(1)').realMouseDown();
      cy.get('.todo-list-ul')
        .realMouseMove(200, 0)
        .wait(200)
        .realMouseMove(200, 50)
        .wait(200)
        .realMouseMove(200, 100)
        .wait(200)
        .realMouseUp();

      cy.get('.todo-list-ul > :nth-child(2) > span').should('text', '테스트_5');

      cy.wait(800);
    });

    it('할 일을 선택해서 완료된 영역에 드롭하면 할 일 영역 맨 아래에 이동한다.', () => {
      cy.visit('/');
      cy.inputTodo();

      cy.get('.todo-list-ul > :nth-child(1) > input').click();
      cy.wait(500);
      cy.get('.todo-list-ul > :nth-child(1) > input').click().wait(500);

      cy.get('.todo-list-ul > :nth-child(1)').realMouseDown().wait(500);
      cy.get('.todo-list-ul')
        .realMouseMove(200, 0)
        .wait(200)
        .realMouseMove(200, 50)
        .wait(200)
        .realMouseMove(200, 100)
        .wait(200)
        .realMouseMove(200, 150)
        .wait(200)
        .realMouseMove(200, 180)
        .wait(200)
        .realMouseMove(200, 210)
        .wait(400)
        .realMouseUp();

      cy.get('.todo-list-ul > :nth-child(3) > span').should('text', '테스트_3');
      cy.wait(800);
    });

    it('완료된 일을 선택해서 할 일 영역에 드롭하면 완료된 일 영역 맨 상단에 이동한다.', () => {
      cy.visit('/');
      cy.inputTodo();

      cy.get('.todo-list-ul > :nth-child(1) > input').click();
      cy.wait(500);
      cy.get('.todo-list-ul > :nth-child(1) > input').click();
      cy.wait(500);
      cy.get('.todo-list-ul > :nth-child(1) > input').click();
      cy.wait(500);

      cy.get('.todo-list-ul > :nth-child(5)').realMouseDown().wait(500);
      cy.get('.todo-list-ul')
        .realMouseMove(200, 210)
        .wait(200)
        .realMouseMove(200, 180)
        .wait(200)
        .realMouseMove(200, 150)
        .wait(200)
        .realMouseMove(200, 100)
        .wait(200)
        .realMouseMove(200, 50)
        .wait(300)
        .realMouseUp()
        .wait(500);

      cy.get('.todo-list-ul > :nth-child(3) > span').should('text', '테스트_5');
      cy.wait(800);
    });

    it('"ESC" 키 입력 시 드래그앤드랍이 취소된다.', () => {
      cy.visit('/');
      cy.inputTodo();

      cy.get('.todo-list-ul > :nth-child(1)').realMouseDown().wait(500);
      cy.get('.todo-list-ul')
        .realMouseMove(200, 0)
        .wait(200)
        .realMouseMove(200, 50)
        .wait(200)
        .realMouseMove(200, 100)
        .wait(200)
        .realMouseMove(200, 150);

      cy.wait(500);
      cy.document().then(doc => {
        const escEvt = new KeyboardEvent('keydown', {
          key: 'Escape',
          code: 'Escape',
          keyCode: 27,
          bulbles: true,
          cancelable: true
        });

        doc.dispatchEvent(escEvt);
      });
      cy.get('.todo-list-ul > :nth-child(1) > span').should('text', '테스트_5');
    });
  });
});
