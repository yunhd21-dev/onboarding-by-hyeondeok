export default {
  title: 'Todo List App/List'
};

const Template = () => {
  const container = document.createElement('div');
  const input = document.createElement('input');
  container.className = 'todo-list-input-section';
  input.className = 'todo-list-input';
  input.placeholder = 'What needs to be done?';
  container.appendChild(input);
  return container;
};

export const InputSection = Template.bind({});
InputSection.args = {};
