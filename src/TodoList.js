import React from "react";


let todoList = [{
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
        <div>
            {todoList.map((item) => {
                // console.log(item)
                return <li key={item.id}>{item.id} {item.title}</li>
            })}
        </div>
    )
}
export default TodoList