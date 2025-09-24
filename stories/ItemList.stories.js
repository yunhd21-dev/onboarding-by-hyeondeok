export default {
  title: 'Todo List App/List',
  argTypes: {
    checked: { control: 'boolean' }
  }
};

const Template = ({ checked }) => {
  const container = document.createElement('div');
  const ul = document.createElement('ul');
  container.className = 'todo-item-list-section';
  ul.className = 'todo-list-ul';
  const items = ['Item 1', 'Item 2', 'Item 3'];
  items.forEach(item => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    const span = document.createElement('span');
    checkbox.type = 'checkbox';
    checkbox.checked = checked;
    li.appendChild(checkbox);
    const isChecked = checked ? 'checked' : '';
    li.className = ['todo-list-li', isChecked].join(' ');
    span.textContent = item;
    li.appendChild(span);
    ul.appendChild(li);
  });
  container.appendChild(ul);
  return container;
};

export const ItemList = Template.bind({});
ItemList.args = {};
