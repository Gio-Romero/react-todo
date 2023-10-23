import { useEffect, useRef } from "react"

function InputWithLabel(props) {
    const inputRef = useRef()
    useEffect(() => {
        inputRef.current.focus()
    })

    return (
        <>
            <label htmlFor={props.htmlFor}>{props.children}:</label>
            <input name="title" id={props.id} value={props.value} onChange={props.onChange} ref={inputRef} />
        </>
    )
}

export default InputWithLabel