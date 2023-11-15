import React, { useState } from "react";
import InputWithLabel from "./inputWithLabel";
import TodoList from "./TodoList";

function AddTodoForm({ onAddTodo }) {

    const [todoTitle, setTodoTitle] = useState("")

    function handleTitleChange(event) {
        const newTodoTitle = event.target.value
        setTodoTitle(newTodoTitle)
    }

    function handleAddTodo(event) {
        event.preventDefault()
        // onAddTodo({ title: todoTitle, id: Date.now() })
        const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`
        onAddTodo(url,{"Title":todoTitle})
        setTodoTitle("")
    }

    return (
        <form onSubmit={handleAddTodo}>
            <InputWithLabel name="title" htmlFor="todoTitle" id="todoTitle" value={todoTitle} onChange={handleTitleChange}>
                Title
            </InputWithLabel>
            <button >Add</button>
        </form>
    )
}
export default AddTodoForm