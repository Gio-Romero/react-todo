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
        onAddTodo({"Title":todoTitle})
        setTodoTitle("")
    }

    return (
        <form onSubmit={handleAddTodo}>
            <InputWithLabel name="title" id="todoTitle" value={todoTitle} onChange={handleTitleChange}>
                Title
            </InputWithLabel>
            <button >Add</button>
        </form>
    )
}
export default AddTodoForm