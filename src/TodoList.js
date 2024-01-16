import React from "react";
import TodoListItem from "./todoListItem";
import style from "./TodoListItem.module.css"

function TodoList({todoList,onRemoveTodo, checkBox}) {
    return (
        <ul className={style.centeredList}>
            {todoList.map((item) => {
                return <TodoListItem key={item.id} todo={item} onRemoveTodo={onRemoveTodo} checkBox={checkBox} todoList={todoList}/>
            })}
        </ul>
    )
}
export default TodoList