import { Card, Input, ItemList, StatusBar } from './components';
import { TodoService } from './services';

export default class TodoListApp {
  constructor(props) {
    this.container = props;
    this.card = new Card({
      width: '800px',
      height: 'auto',
      borderRadius: '5px'
    });
    this.todoService = new TodoService();
    this.itemList = null;
    this.statusBar = null;
  }

  onListCountInfoUpdate() {
    const leftCount = this.todoService.activeCount;
    const completedCount = this.todoService.completedCount;

    this.statusBar.onLeftCountUpdate(leftCount);
    this.statusBar.onCompletedCountUpdate(completedCount);
  }

  onClearCompleted() {
    const activeArr = this.todoService.getClearCompletedList();
    this.itemList.listUpdate(activeArr);

    this.onListCountInfoUpdate();
  }

  onFilterHander(option) {
    const filterList = this.todoService.getFilterList(option);
    this.itemList.listUpdate(filterList);
  }

  createElement(callback) {
    this.itemList = new ItemList();
    const input = new Input({
      onKeyPress: value => {
        this.todoService.addTodoList(value, todoList => {
          if (this.todoService.isFilteringInfo) {
            this.onFilterHander(this.todoService.selectedFilterInfo);
          } else {
            this.itemList.listUpdate(todoList);
          }
          this.onListCountInfoUpdate();
        });
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
      });
    }
  }
}
