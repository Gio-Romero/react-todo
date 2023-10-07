
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './addTodoForm';


function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm />
      <TodoList />
    </div>
  );
}

export default App;

