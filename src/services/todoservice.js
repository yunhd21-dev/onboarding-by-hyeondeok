export default class TodoService {
  constructor() {
    this.itemList = [];
    this.isFiltering = false;
    this.selectedFilter = 'all';
    this.index = 0;
  }

  itemListSort(callback) {
    const activeList = this.itemList.filter(obj => !obj.selected);
    const completedList = this.itemList.filter(obj => obj.selected);
    activeList.sort((objA, objB) => {
      return objB.id - objA.id;
    });
    this.itemList = [...activeList, ...completedList];

    if (callback) callback(this.itemList);
  }

  todoListRefresh(id, callback) {
    this.itemList = this.itemList.map(obj =>
      obj.id === id ? { ...obj, selected: !obj.selected, id: Date.now() } : obj
    );
    const findIdx = this.itemList.findIndex(obj => obj.id === id);
    if (findIdx > -1 && this.itemList[findIdx].selected) {
      const [obj] = this.itemList.splice(findIdx, 1);
      this.itemList.push(obj);
    }

    this.itemListSort(callback);
  }

  addTodoList(value, callback) {
    const todoItem = {
      id: Date.now() + this.index,
      selected: false,
      text: value,
      onChange: id => {
        this.todoListRefresh(id, callback);
      }
    };
    this.todoList.push(todoItem);
    this.index++;

    this.itemListSort(callback);
  }

  getFilterList(option) {
    let filterList = [];
    this.selectedFilter = option;
    this.isFiltering = true;
    switch (option) {
      case 'active':
        filterList = [...this.itemList.filter(obj => !obj.selected)];
        break;
      case 'completed':
        filterList = [...this.itemList.filter(obj => obj.selected)];
        break;
      case 'all':
      default:
        this.isFiltering = false;
        filterList = [...this.itemList];
        break;
    }

    return filterList;
  }

  getClearCompletedList() {
    const activeList = this.itemList.filter(obj => !obj.selected);
    this.itemList = [...activeList];
    return this.getFilterList(this.selectedFilter);
  }

  get todoList() {
    return this.itemList;
  }

  get activeCount() {
    return this.itemList.filter(obj => !obj.selected).length || 0;
  }

  get completedCount() {
    return this.itemList.filter(obj => obj.selected).length || 0;
  }

  get isFilteringInfo() {
    return this.isFiltering;
  }

  get selectedFilterInfo() {
    return this.selectedFilter;
  }
}
