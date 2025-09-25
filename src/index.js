import './styles.css';
import TodoListApp from './todoListApp';

(function () {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    const todoListApp = new TodoListApp(appContainer);
    todoListApp.render();
  }
})();
