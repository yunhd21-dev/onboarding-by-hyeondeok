export default {
  title: 'Todo List App/List',
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
    borderRadius: { control: 'text' }
  }
};

const Template = ({ width, height, borderRadius }) => {
  const container = document.createElement('div');
  container.className = 'todo-list-card';
  container.style.width = width;
  container.style.height = height;
  container.style.borderRadius = borderRadius;
  return container;
};

export const Card = Template.bind({});
Card.args = {
  width: '800px',
  height: '400px',
  borderRadius: '5px'
};
