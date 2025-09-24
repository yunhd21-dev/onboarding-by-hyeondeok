import { Card } from './Card.stories.js';
import { InputSection } from './Input.stories.js';
import { ItemList } from './ItemList.stories.js';
import { StatusSection } from './Status.stories.js';

export default {
  title: 'Todo List App',
  argTypes: {
    checked: { control: 'boolean' },
    leftCount: { control: 'number' },
    completedCount: { control: 'number' },
    filter: {
      control: {
        type: 'select',
        default: 'All'
      },
      options: ['All', 'Active', 'Completed']
    }
  }
};

const Template = ({ checked, filter, leftCount, completedCount }) => {
  const container = document.createElement('div');
  container.className = 'todo-list-container';

  const cardComponent = Card({
    width: '800px',
    height: 'auto',
    borderRadius: '5px'
  });
  const inputSection = InputSection();
  const itemList = ItemList({ checked });
  const statusSection = StatusSection({ filter, leftCount, completedCount });

  cardComponent.appendChild(inputSection);
  cardComponent.appendChild(itemList);
  cardComponent.appendChild(statusSection);
  container.appendChild(cardComponent);

  return container;
};

export const TodoList = Template.bind({});
TodoList.args = {
  checked: false,
  filter: 'All',
  leftCount: 3,
  completedCount: 2
};
