import { useEffect, useRef } from "react"
import style from "../TodoListItem.module.css"
import PropTypes from "prop-types";

function InputWithLabel({ children, name, id, value, onChange }) {
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

InputWithLabel.propTypes = {
    children: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};


export default InputWithLabel