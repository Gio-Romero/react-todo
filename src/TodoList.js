import React from "react";
import TodoListItem from "./todoListItem";

function TodoList({todoList,onRemoveTodo}) {
    return (
        <ul>
            {todoList.map((item) => {
                return <TodoListItem key={item.id} todo={item} onRemoveTodo={onRemoveTodo}/>
            })}
        </ul>
    )
}
export default TodoList