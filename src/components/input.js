export default class Input {
  constructor({ onKeyPress }) {
    this.container = document.createElement('div');
    this.container.className = 'todo-list-input-section';
    this.input = document.createElement('input');
    this.input.className = 'todo-list-input';
    this.input.placeholder = 'What needs to be done?';
    if (onKeyPress) {
      this.input.addEventListener('keydown', evt => {
        if (evt.key === 'Enter' && this.input.value.trim() !== '') {
          onKeyPress(this.input.value);
          this.input.value = '';
        }
      });
    }
  }

  render(parent) {
    this.container.appendChild(this.input);
    parent.appendChild(this.container);
  }
}
