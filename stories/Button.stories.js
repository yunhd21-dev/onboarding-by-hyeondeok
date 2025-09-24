export default {
  title: 'Todo List App/List',
  argTypes: {
    isActive: { control: 'boolean' },
    text: { control: 'text' }
  }
};

const Template = ({ isActive, text }) => {
  const button = document.createElement('button');
  button.className = ['todo-list-filter-button', isActive ? 'active' : ''].join(
    ' '
  );
  button.textContent = text || 'Button';
  return button;
};

export const Button = Template.bind({});
Button.args = {
  isActive: true,
  text: 'All'
};
