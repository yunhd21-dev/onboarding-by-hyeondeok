export default class Button {
  constructor({ isActive, text, onClick }) {
    this.button = document.createElement('button');
    this.classNameUpdate(isActive);
    this.button.textContent = text || 'Button';
    if (onClick) {
      this.button.addEventListener('click', onClick);
    }
  }

  classNameUpdate(isActive) {
    this.button.className = [
      'todo-list-filter-button',
      isActive ? 'active' : ''
    ].join(' ');
  }

  render(parent) {
    parent.appendChild(this.button);
  }
}
