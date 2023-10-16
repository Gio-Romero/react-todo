import React from "react";

function AddTodoForm(props) {

    function handleAddTodo(event) {
        event.preventDefault()
        const todoTitle = event.target.title.value
        props.onAddTodo(todoTitle)
        event.target.reset()
    }

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo:</label>
            <input name="title" id="todoTitle" />
            <button >Add</button>
        </form>
    )
}
export default AddTodoForm