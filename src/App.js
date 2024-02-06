

import { useEffect, useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import TodoContainer from './components/TodoContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import style from "./TodoListItem.module.css"

function App() {

  const [todoList, setTodoList] = useState([])
  // let initialList = JSON.parse(localStorage.getItem('savedTodoList')) ?? []
  const [isloading, setIsLoading] = useState(true)
  const API_URL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`


  const fetchApi = async (method, url, headers, body, id) => {
    const options = {
      method: method,
      headers: {
        ...headers,
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
      body: body ? JSON.stringify(body) : null,
    };
    const apiUrl = id ? `${url}/${id}` : url

    const response = await fetch(apiUrl, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    const data = await response.json();
    return data
  }

  const fetchData = async () => {
    try {
      const data = await fetchApi(
        'GET',
        API_URL,
        { 'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}` }
      )
      const todos = data.records.map((todo) => {
        return { title: todo.fields.Title, id: todo.id, createdAt: todo.createdTime, done: todo.fields.Done }
      }).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      setTodoList(todos)
      setIsLoading(false)
    } catch (error) {
      console.log(error.message)
    }
  }

  const addTodo = async (newData) => {
    try {
      const data = await fetchApi(
        'POST',
        API_URL,
        {
          'Content-Type': 'application/json'
        },
        { records: [{ fields: newData }] }
      )
      const listItem = data.records[0]

      setTodoList(prevItems => [...prevItems, {
        title: listItem.fields.Title,
        done: listItem.fields.Done,
        id: listItem.id,
        createdAt: listItem.fields.CreatedAt
      }])
    } catch (error) {
      console.error('Error updating todo:', error.message);
      return null
    }
  }

  const fadeOutElement = async (element) => {
    element.classList.add("fade-out")
    let opacity = 1;
    const fadeOutInterval = setInterval(function () {
      if (opacity > 0) {
        opacity -= 0.1;
        element.style.opacity = opacity;
      } else {
        clearInterval(fadeOutInterval);
      }
    }, 30);
  }

  const removeTodo = async (id, e) => {
    await fadeOutElement(e.target.closest('li'))
    try {
      await fetchApi(
        'DELETE',
        `${API_URL}/${id}`,
        { 'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}` }
      )
      setTodoList(prevTodoList => prevTodoList.filter(item => item.id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error.message);
    }
  }

  const updateTodo = async (id, updatedCheckboxValue) => {
    try {
      const data = await fetchApi(
        'PATCH',
        `${API_URL}/${id}`,
        {
          'Content-Type': 'application/json'
        },
        {
          fields: {
            Done: updatedCheckboxValue,
          },
        }
      )
      setTodoList((prevTodoList) =>
        prevTodoList.map((item) => item.id === data.id ? {
          title: data.fields.Title,
          done: data.fields.Done,
          id: data.id,
          createdAt: data.createdTime
        } : item))
    } catch (error) {
      console.error('Error updating todo:', error.message);
      return null
    }
  }

  useEffect(() => {
    fetchData()
    // TodoContainer()
  }, [])

  useEffect(() => {
    if (todoList.length) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList))
    }
  }, [todoList])
  const tableNameDefault = 'Default'
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/new" element={< NewRoute />} />
      </Routes>
    </BrowserRouter>
  )


  function Home() {
    return (
      <>
      <TodoContainer tableName={tableNameDefault}/>
        {/* <h1 className={style.Title}>To-do List</h1>
        <AddTodoForm onAddTodo={addTodo} />
        {isloading ? <p>Loading...</p> :
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} updateTodo={updateTodo} />} */}
      </>
    )
  }

  function NewRoute() {
    return (
      <h1>New Todo List</h1>
    )
  }
}
export default App;

