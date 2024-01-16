import React, { useState } from "react";
import InputWithLabel from "./inputWithLabel";
import style from "./TodoListItem.module.css"

function AddTodoForm({ onAddTodo }) {

    const [todoTitle, setTodoTitle] = useState("")

    function handleTitleChange(event) {
        const newTodoTitle = event.target.value
        setTodoTitle(newTodoTitle)
    }

    function handleAddTodo(event) {
        event.preventDefault()
        onAddTodo({ "Title": todoTitle, "Done": false })
        setTodoTitle("")
    }

    return (
        <form className={style.inputStyle} onSubmit={handleAddTodo}>
            <InputWithLabel name="title" id="todoTitle" value={todoTitle} onChange={handleTitleChange}>
                Title
            </InputWithLabel>
            <button style={{ margin: "10px" }} className={style.addBtn}>Add</button>
        </form>
    )
}
export default AddTodoForm