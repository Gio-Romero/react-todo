
import { useEffect, useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './addTodoForm';


const useSemiPersistantState = () => {
  const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('savedTodoList')) || [])

  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList))
  }, [todoList])
  return [todoList, setTodoList]
}

function App() {

  const [todoList, setTodoList] = useSemiPersistantState()

  function addTodo(newTodo) {
    setTodoList(prevItems => [...prevItems, newTodo])
  }

  function removeTodo(id){
  const newList =  todoList.filter(item=>
      item.id !== id
    )
    setTodoList(newList)
  }

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
    </>
  );
}

export default App;

