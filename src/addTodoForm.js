import React, { useState } from "react";

function AddTodoForm({onAddTodo}) {

    const [todoTitle, setTodoTitle] = useState('')

    function handleTitleChange(event) {
        const newTodoTitle = event.target.value
        setTodoTitle(newTodoTitle)
    }

    function handleAddTodo(event) {
        event.preventDefault()
        onAddTodo({ title: todoTitle, id: Date.now() })
        event.target.title.value = ""
    }

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo:</label>
            <input name="title" id="todoTitle" onChange={handleTitleChange} />
            <button >Add</button>
        </form>
    )
}
export default AddTodoForm