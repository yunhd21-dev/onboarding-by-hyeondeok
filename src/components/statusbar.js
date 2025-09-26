import Button from './button';

export default class StatusBar {
  selectedFilter = 'all';
  allButton = null;
  activeButton = null;
  completedButton = null;
  container = null;
  statusText = null;
  completedText = null;

  constructor({ onFilter, onClear }) {
    this.container = document.createElement('div');
    this.statusText = document.createElement('span');
    this.container.className = 'todo-list-status-section';
    this.statusText.className = 'todo-list-status-text';
    this.statusText.textContent = '0 items left';

    const clearArea = document.createElement('div');
    clearArea.className = 'todo-list-clear-area';

    const clearButton = new Button({
      isActive: false,
      text: 'Clear Completed',
      onClick: onClear
    });

    this.completedText = document.createElement('span');
    this.completedText.className = 'todo-list-completed-text';
    this.completedText.textContent = '(0)';

    clearButton.render(clearArea);
    clearArea.appendChild(this.completedText);

    this.container.appendChild(this.statusText);
    this.container.appendChild(this.createFilterButton(onFilter));
    this.container.appendChild(clearArea);
  }

  onButtonHandler(callback) {
    this.allButton.classNameUpdate(this.selectedFilter === 'all');
    this.activeButton.classNameUpdate(this.selectedFilter === 'active');
    this.completedButton.classNameUpdate(this.selectedFilter === 'completed');
    callback(this.selectedFilter);
  }

  createFilterButton(callback) {
    const filterArea = document.createElement('div');
    filterArea.className = 'todo-list-filter-area';

    this.allButton = new Button({
      isActive: true,
      text: 'All',
      onClick: () => {
        this.selectedFilter = 'all';
        this.onButtonHandler(callback);
      }
    });

    this.activeButton = new Button({
      isActive: false,
      text: 'Active',
      onClick: () => {
        this.selectedFilter = 'active';
        this.onButtonHandler(callback);
      }
    });

    this.completedButton = new Button({
      isActive: false,
      text: 'Completed',
      onClick: () => {
        this.selectedFilter = 'completed';
        this.onButtonHandler(callback);
      }
    });

    this.allButton.render(filterArea);
    this.activeButton.render(filterArea);
    this.completedButton.render(filterArea);

    return filterArea;
  }

  onLeftCountUpdate(value) {
    this.statusText.textContent = `${value} items left`;
  }

  onCompletedCountUpdate(value) {
    this.completedText.textContent = `(${value})`;
  }

  rendor(parent) {
    parent.appendChild(this.container);
  }

  get element() {
    return this.container;
  }
}
