import React from "react";
import style from "../TodoListItem.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import PropTypes from "prop-types";

function TodoListItem({ todo, onRemoveTodo, updateTodo }) {
    const newDate = new Date(`${todo.createdAt}`)
    return (
        <>
            <li className={style.ListItem} style={{ backgroundColor: todo.done ? 'rgb(44, 162, 44)' : 'white' }}>
                <div>
                    <p style={{ width: "1000px" }}><small>{newDate.toDateString()}</small></p></div>
                <input type="checkbox" id="checkBox" checked={todo.done} onChange={() => { updateTodo(todo.id, !todo.done) }} />
                {todo.title}

                <button className={style.addBtn} onClick={(e) => onRemoveTodo(todo.id, e)}>Remove
                    <FontAwesomeIcon style={{ marginLeft: "7px" }} icon={faTrashCan} /></button></li>
        </>
    )
}

TodoListItem.propTypes = {
    todo: PropTypes.object.isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
};

export default TodoListItem