import React from "react";
import TodoListItem from "./todoListItem";


const todoList = [{
    id: 1,
    title: 'complete assignment'
},
{
    id: 2,
    title: 'push assignment to Github'
},
{
    id:3,
    title: 'take a break'
}]

function TodoList() {
    return (
        <ul>
            {todoList.map((item) => {
                return <TodoListItem key={item.id} todo={item} />
            })}
        </ul>
    )
}
export default TodoList