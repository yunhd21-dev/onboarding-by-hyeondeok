import { Button } from './Button.stories';

export default {
  title: 'Todo List App/List',
  argTypes: {
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

const filterButton = filter => {
  const filterArea = document.createElement('div');
  filterArea.className = 'todo-list-filter-area';

  const allButton = Button({ isActive: filter === 'All', text: 'All' });

  const activeButton = Button({
    isActive: filter === 'Active',
    text: 'Active'
  });

  const completedButton = Button({
    isActive: filter === 'Completed',
    text: 'Completed'
  });

  filterArea.appendChild(allButton);
  filterArea.appendChild(activeButton);
  filterArea.appendChild(completedButton);

  return filterArea;
};

const Template = ({ filter, leftCount, completedCount }) => {
  const container = document.createElement('div');
  const statusText = document.createElement('span');
  container.className = 'todo-list-status-section';
  statusText.className = 'todo-list-status-text';
  statusText.textContent = `${leftCount} items left`;

  const clearArea = document.createElement('div');
  clearArea.className = 'todo-list-clear-area';

  const clearButton = Button({ isActive: false, text: 'Clear Completed' });

  const completedText = document.createElement('span');
  completedText.className = 'todo-list-completed-text';
  completedText.textContent = `(${completedCount})`;

  clearArea.appendChild(clearButton);
  clearArea.appendChild(completedText);

  container.appendChild(statusText);
  container.appendChild(filterButton(filter));
  container.appendChild(clearArea);

  return container;
};

export const StatusSection = Template.bind({});
StatusSection.args = {
  filter: 'All',
  leftCount: 3,
  completedCount: 2
};
