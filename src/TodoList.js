import React from "react";


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
                return <li key={item.id}>{item.id} {item.title}</li>
            })}
        </ul>
    )
}
export default TodoList