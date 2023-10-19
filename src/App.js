
import { useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './addTodoForm';


function App() {

  const [todoList, setTodoList] = useState([])
  function addTodo(newTodo){
    setTodoList(prevItems=>[...prevItems,newTodo])
  }
  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </>
  );
}

export default App;

