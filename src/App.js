
import './App.css';
import TodoContainer from './components/TodoContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  const tableNameDefault = 'Default'
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoContainer tableName={tableNameDefault}/>}/>
        <Route path="/new" element={< NewRoute />} />
      </Routes>
    </BrowserRouter>
  )

  function NewRoute() {
    return (
      <h1>New Todo List</h1>
    )
  }
}
export default App;

