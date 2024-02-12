import React from "react";
import TodoListItem from "./TodoListItem";
import style from "../TodoListItem.module.css"
import PropTypes from "prop-types";

function TodoList({todoList,onRemoveTodo, updateTodo}) {

    return (
        <ul className={style.centeredList}>
            {todoList.map((item) => {
                return <TodoListItem key={item.id} todo={item} onRemoveTodo={onRemoveTodo} updateTodo={updateTodo}/>
            })}
        </ul>
    )
}


TodoList.propTypes = {
    todoList: PropTypes.array.isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired
};


export default TodoList