export default class Card {
  card = null;
  constructor({ width, height, borderRadius }) {
    this.card = document.createElement('div');
    this.card.className = 'todo-list-card';
    this.card.style.width = width || '800px';
    this.card.style.height = height || '400px';
    this.card.style.borderRadius = borderRadius || '5px';
  }

  render(parent) {
    parent.appendChild(this.card);
  }

  get element() {
    return this.card;
  }
}
