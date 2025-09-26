import { Card, Input, ItemList, Item, StatusBar } from './components';
import { TodoService, DndService, StorageService } from './services';

export default class TodoListApp {
  constructor({ el, useDnd = false }) {
    this.container = el;
    this.itemList = null;
    this.statusBar = null;
    this.dnd = null;
    this.todoService = new TodoService();
    this.storageService = new StorageService('todo_list_app_data');

    this.card = new Card({
      width: '800px',
      height: 'auto',
      borderRadius: '5px'
    });

    if (useDnd) {
      this.dnd = new DndService({
        onMove: obj => {
          const resultList = this.todoService.itemIndexChange(obj);
          this.storageService.setStorageData(resultList);
          this.todoListUpdate(resultList);
        }
      });
      document.addEventListener('keydown', evt => {
        if (evt.key === 'Escape') {
          this.dnd.onDropCancel();
        }
      });
    }
  }

  initList() {
    const storageList = this.storageService.getStorageData();
    if (storageList) {
      storageList.forEach(obj => {
        this.addTodoListHandler(obj);
      });
    }
  }

  addTodoListHandler(obj) {
    this.todoService.addTodoList(obj, todoList => {
      if (this.todoService.isFilteringInfo) {
        this.onFilterHander(this.todoService.selectedFilterInfo);
      } else {
        this.todoListUpdate(todoList);
        this.storageService.setStorageData(todoList);
      }
    });
  }

  onListCountInfoUpdate() {
    const leftCount = this.todoService.activeCount;
    const completedCount = this.todoService.completedCount;

    this.statusBar.onLeftCountUpdate(leftCount);
    this.statusBar.onCompletedCountUpdate(completedCount);
  }

  onClearCompleted() {
    const activeArr = this.todoService.getClearCompletedList();
    this.storageService.setStorageData(this.todoService.todoList);
    this.todoListUpdate(activeArr);
  }

  onFilterHander(option) {
    const filterList = this.todoService.getFilterList(option);
    this.todoListUpdate(filterList);
  }

  todoListUpdate(list) {
    let elementArr = [];
    list.forEach(obj => {
      const item = new Item(obj);
      elementArr.push(item.element);
    });
    this.itemList.listUpdate(elementArr);
    this.onListCountInfoUpdate();
  }

  createElement(callback) {
    this.itemList = new ItemList();
    if (this.dnd) {
      this.dnd.setDropZone(this.itemList.ulElement);
    }
    const input = new Input({
      onKeyPress: value => {
        this.addTodoListHandler({ text: value });
      }
    });

    this.statusBar = new StatusBar({
      onFilter: value => {
        this.onFilterHander(value);
      },
      onClear: () => {
        this.onClearCompleted();
      }
    });

    input.render(this.card.element);
    this.itemList.rendor(this.card.element);
    this.statusBar.rendor(this.card.element);
    callback();
  }

  render() {
    if (this.container) {
      this.createElement(() => {
        this.card.render(this.container);
        this.initList();
      });
    }
  }
}
