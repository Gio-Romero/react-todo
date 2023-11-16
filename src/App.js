

import { useEffect, useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './addTodoForm';


function App() {

  const [todoList, setTodoList] = useState([])
  let initialList = JSON.parse(localStorage.getItem('savedTodoList')) ?? []
  const [isloading, setIsLoading] = useState(true)
  const [whileLoadingVal, setWhileLoadingVal] = useState(true)


  useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: { todoList: initialList } });
      }, 2000);
    })
      .then(result => {
        setTodoList(result.data.todoList)
        setIsLoading(false)

      })
  }, [])

  if (whileLoadingVal.title && !isloading) {
    setTodoList([...todoList, whileLoadingVal])
    setWhileLoadingVal([])
  } else if (whileLoadingVal.length && !isloading) {
    setTodoList([...todoList, ...whileLoadingVal])
    setWhileLoadingVal([])
  }

  useEffect(() => {
    if (todoList.length>0) {
       localStorage.setItem('savedTodoList', JSON.stringify(todoList))
    }
  }, [todoList])

  function addTodo(newTodo) {
    if (isloading) {
      if (whileLoadingVal.title) {
        setWhileLoadingVal([whileLoadingVal, newTodo])
      } else if (whileLoadingVal.length) {
        setWhileLoadingVal([...whileLoadingVal, newTodo])
      } else {
        setWhileLoadingVal(newTodo)
      }
    }
    else {
      setTodoList(prevItems => [...prevItems, newTodo])
    }
  }

  function removeTodo(id) {
    const newList = todoList.filter(item =>
      item.id !== id
    )
    setTodoList(newList)
  }

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isloading ? <p>Loading...</p> :
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
    </>
  );
}

export default App;

