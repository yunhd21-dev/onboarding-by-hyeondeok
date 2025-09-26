export default class ItemList {
  constructor() {
    this.selectItem = null;
    this.container = document.createElement('div');
    this.ul = document.createElement('ul');

    this.container.className = 'todo-item-list-section';
    this.ul.className = 'todo-list-ul';

    this.ul.appendChild(this.emptyList());
    this.container.appendChild(this.ul);
  }

  emptyList() {
    const li = document.createElement('li');
    const span = document.createElement('span');
    li.className = 'todo-list-li empty';
    span.textContent = 'No List';

    li.appendChild(span);

    return li;
  }

  rendor(parent) {
    parent.appendChild(this.container);
  }

  listUpdate(itemArr) {
    this.ul.replaceChildren();

    if (itemArr && Array.isArray(itemArr) && itemArr.length > 0) {
      itemArr.forEach(obj => {
        this.ul.appendChild(obj);
      });
    } else {
      this.ul.appendChild(this.emptyList());
    }
  }

  get element() {
    return this.container;
  }

  get ulElement() {
    return this.ul;
  }
}
