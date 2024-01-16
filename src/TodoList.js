import React from "react";
import TodoListItem from "./todoListItem";
import style from "./TodoListItem.module.css"

function TodoList({todoList,onRemoveTodo, updateTodo}) {
    return (
        <ul className={style.centeredList}>
            {todoList.map((item) => {
                return <TodoListItem key={item.id} todo={item} onRemoveTodo={onRemoveTodo} updateTodo={updateTodo}/>
            })}
        </ul>
    )
}
export default TodoList