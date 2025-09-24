export default class Item {
  constructor({ selected, text, onChange, id }) {
    this.li = document.createElement('li');
    const checkbox = document.createElement('input');
    const span = document.createElement('span');
    checkbox.type = 'checkbox';
    checkbox.checked = selected;
    if (onChange) {
      checkbox.addEventListener('change', () => {
        onChange(id);
      });
    }
    this.li.appendChild(checkbox);
    this.li.className = ['todo-list-li', selected ? 'checked' : ''].join(' ');
    span.textContent = text;
    this.li.appendChild(span);
  }

  get element() {
    return this.li;
  }
}
