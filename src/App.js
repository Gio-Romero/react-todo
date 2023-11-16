
import { useEffect, useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './addTodoForm';


function App() {

  const [todoList, setTodoList] = useState([])
  // let initialList = JSON.parse(localStorage.getItem('savedTodoList')) ?? []
  const [isloading, setIsLoading] = useState(true)

  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}` }
    }
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`
    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      const todos = data.records.map((todo) => {
        return { title: todo.fields.Title, id: todo.id, createdAt: todo.createdTime }
      })
      const newTodos = todos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      setTodoList(newTodos)
      setIsLoading(false)

    } catch (error) {
      console.log(error.message)
    }
  }

  const addTodo = async (url, data) => {
    try {
      const response = await fetch(url,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ records: [{ fields: data }] })
        });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const newData = await response.json();
      const listItem = newData.records[0]
      setTodoList(prevItems => [...prevItems, {
        title: listItem.fields.Title,
        id: listItem.id,

      }])
    } catch (error) {
      console.error('Error updating todo:', error.message);
      return null
    }
  }

  const removeTodo = async (id) => {
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`
    try {
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const newList = todoList.filter(item =>
        item.id !== id
      )
      setTodoList(newList)
    } catch (error) {
      console.error('Error deleting todo:', error.message);

    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList))
    }
  }, [todoList])


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

