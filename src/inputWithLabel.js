import { useEffect, useRef } from "react"
import style from "./TodoListItem.module.css"

function InputWithLabel({children,name,id,value,onChange}) {
    const inputRef = useRef()
    useEffect(() => {
        inputRef.current.focus()
    })
    return (
        <>
            <label htmlFor={id}>{children}:</label>
            <input className={style.input} name={name} id={id} value={value} onChange={onChange} ref={inputRef} />
        </>
    )
}

export default InputWithLabel