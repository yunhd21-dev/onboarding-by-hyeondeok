import { TodoService } from '../src/services';

describe('TodoService', () => {
  let todoService;

  beforeEach(() => {
    todoService = new TodoService();
  });

  test('리스트 초기상태는 빈 배열이어야 한다', () => {
    expect(todoService.itemList).toEqual([]);
  });

  test('addTodoList 메서드는 새로운 할 일을 추가해야 한다', () => {
    const callback = jest.fn();
    todoService.addTodoList('Test', callback);

    expect(todoService.itemList.length).toBe(1);
    expect(todoService.itemList[0].text).toBe('Test');
    expect(todoService.itemList[0].selected).toBe(false);
    expect(callback).toHaveBeenCalledWith(todoService.itemList);
  });

  test('todoListRefresh 메서드는 할 일의 완료 상태를 토글해야 한다', () => {
    const callback = jest.fn();
    todoService.addTodoList('Test', () => {});
    const todoId = todoService.itemList[0].id;

    todoService.todoListRefresh(todoId, callback);

    expect(todoService.itemList[0].selected).toBe(true);
    expect(callback).toHaveBeenCalledWith(todoService.itemList);

    todoService.todoListRefresh(todoId, callback);
    expect(todoService.itemList[0].selected).toBe(false);
  });

  test('itemListSort 메서드는 id 기준으로 할 일을 내림차순으로 재배열 해야한다.', () => {
    const callback = jest.fn();
    todoService.addTodoList('Test_1', callback);
    todoService.addTodoList('Test_2', callback);
    todoService.addTodoList('Test_3', callback);
    const firstTodoId = todoService.itemList[0].id;
    const lastTodoId = todoService.itemList[2].id;

    const firstTodoIdx = todoService.itemList.findIndex(
      obj => obj.id === firstTodoId
    );
    const lastTodoIdx = todoService.itemList.findIndex(
      obj => obj.id === lastTodoId
    );

    expect(firstTodoIdx).toBe(0);
    expect(lastTodoIdx).toBe(2);
    expect(callback).toHaveBeenCalledWith(todoService.itemList);
  });

  test('필터 옵션이 Active 경우, getFilterList 메서드는 해야 할 일에 대한 리스트를 반환해야 한다.', () => {
    const callback = jest.fn();
    todoService.addTodoList('Test_1', callback);
    todoService.addTodoList('Test_2', callback);
    todoService.addTodoList('Test_3', callback);
    const todoId = todoService.itemList[0].id;

    todoService.todoListRefresh(todoId, callback);
    const completedIdx = todoService.itemList.findIndex(obj => obj.selected);
    expect(todoService.itemList[completedIdx].text).toBe('Test_3');
    expect(callback).toHaveBeenCalledWith(todoService.itemList);

    const activeList = todoService.getFilterList('active');

    const isAllActive =
      activeList.filter(obj => obj.selected === true).length === 0;

    expect(activeList.length).toBe(2);
    expect(isAllActive).toBe(true);
  });

  test('필터 옵션이 Completed 경우, getFilterList 메서드는 완료된 할 일에 대한 리스트를 반환해야 한다.', () => {
    const callback = jest.fn();
    todoService.addTodoList('Test_1', callback);
    todoService.addTodoList('Test_2', callback);
    todoService.addTodoList('Test_3', callback);
    const todoId = todoService.itemList[0].id;

    todoService.todoListRefresh(todoId, callback);
    const completedIdx = todoService.itemList.findIndex(obj => obj.selected);
    expect(todoService.itemList[completedIdx].text).toBe('Test_3');
    expect(callback).toHaveBeenCalledWith(todoService.itemList);

    const completedList = todoService.getFilterList('completed');

    const isAllCompleted =
      completedList.filter(obj => obj.selected === false).length === 0;

    expect(completedList.length).toBe(1);
    expect(isAllCompleted).toBe(true);
  });

  test('필터 옵션이 All 경우, getFilterList 메서드는 모든 리스트를 반환해야 한다.', () => {
    const callback = jest.fn();
    todoService.addTodoList('Test_1', callback);
    todoService.addTodoList('Test_2', callback);
    todoService.addTodoList('Test_3', callback);
    const todoId = todoService.itemList[0].id;

    todoService.todoListRefresh(todoId, callback);
    const completedIdx = todoService.itemList.findIndex(obj => obj.selected);
    expect(todoService.itemList[completedIdx].text).toBe('Test_3');
    expect(callback).toHaveBeenCalledWith(todoService.itemList);

    const allList = todoService.getFilterList('all');

    expect(allList.length).toBe(3);
  });

  test('getClearCompletedList 메서드는 완료된 할 일을 제외한 리스트를 반환해야 한다.', () => {
    const callback = jest.fn();
    todoService.addTodoList('Test_1', callback);
    todoService.addTodoList('Test_2', callback);
    todoService.addTodoList('Test_3', callback);
    const todoId = todoService.itemList[0].id;

    todoService.todoListRefresh(todoId, callback);
    const completedIdx = todoService.itemList.findIndex(obj => obj.selected);
    expect(todoService.itemList[completedIdx].text).toBe('Test_3');
    expect(callback).toHaveBeenCalledWith(todoService.itemList);

    expect(todoService.itemList.length).toBe(3);
    const resultList = todoService.getClearCompletedList();
    const isAllActive = resultList.filter(obj => obj.selected).length === 0;
    expect(resultList.length).toBe(2);
    expect(isAllActive).toBe(true);
  });
});
