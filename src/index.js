import './styles.css';
import TodoListApp from './todolistapp';

(function () {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    const todoListApp = new TodoListApp({ el: appContainer, useDnd: true });
    todoListApp.render();
  }
})();
