import { useEffect, useRef } from "react"

function InputWithLabel({children,name,id,value,onChange}) {
    const inputRef = useRef()
    useEffect(() => {
        inputRef.current.focus()
    })
    return (
        <>
            <label htmlFor={id}>{children}:</label>
            <input name={name} id={id} value={value} onChange={onChange} ref={inputRef} />
        </>
    )
}

export default InputWithLabel