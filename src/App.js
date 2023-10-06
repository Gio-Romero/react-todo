
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './addTodoForm';

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm />

      <ul>
        <TodoList />
      </ul>

      <label htmlFor='newItem'>submit next to do item:</label>
    </div>
  );
}

export default App;

