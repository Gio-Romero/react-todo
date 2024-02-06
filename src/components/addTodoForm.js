import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import style from "../TodoListItem.module.css"
import PropTypes from "prop-types";

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

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm