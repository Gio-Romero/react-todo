import React ,{useState} from "react";
import style from "./TodoListItem.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

function TodoListItem({ todo, onRemoveTodo,updateTodo}) {
 
    return (
        <>
            <li className={style.ListItem} style={{ backgroundColor: todo.done ? 'rgb(44, 162, 44)' : 'white'}}>
                <input type="checkbox" id="checkBox" checked={todo.done} onChange={()=>{updateTodo(todo.id,!todo.done)}} />
                {todo.title}
                <button className={style.addBtn} onClick={(e) => onRemoveTodo(todo.id, e)}>Remove
                    <FontAwesomeIcon style={{ marginLeft: "7px" }} icon={faTrashCan} /></button></li>
        </>
    )
}
export default TodoListItem