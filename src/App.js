
import { useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './addTodoForm';


function App() {
  const [newTodo,setNewTodo] = useState('')

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo = {setNewTodo} />
      <p>{newTodo}</p>
      <TodoList />
    </div>
  );
}

export default App;

