import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([{
    id: 1,
    title: 'complete assignment'
  },
  {
    id: 2,
    title: 'push assignment to Github'
  }])

  const [inputText, setInputText] = useState('')

  useEffect(() => {
    console.log(inputText)
  }, [inputText])

  useEffect(() => {
    console.log(todoList)
  }, [todoList])

  const textChange = (e) => {
    setInputText(e.target.value)
  }

  const submitItem = (e) => {

    let newList = todoList;
    newList.push({ id: todoList.length + 1, title: inputText })
    setTodoList(newList)
    setInputText('')
    e.target.previousElementSibling.value = ''
  }

  return (
    <div>
      <h1>Todo List</h1>
      <label htmlFor='search'>submit next to do item:</label>
      <input id='todoItem' onChange={textChange} type='text' />
      <button id='submit' onClick={submitItem}>Submit</button>

      <div>
        <ul>
          {todoList.map((item) => {
            console.log(item)
            return <li id={item.id - 1}>{item.id} {item.title}</li>
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;

