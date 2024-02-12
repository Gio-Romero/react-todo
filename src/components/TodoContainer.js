import React, { useState, useEffect } from "react";
import style from "../TodoListItem.module.css"
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import PropTypes from "prop-types";

function TodoContainer({ tableName }) {

    TodoContainer.propTypes = {
        tableName: PropTypes.string.isRequired,
    };

    const [todoList, setTodoList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [toggleOrder,setToggleOrder] = useState('')
    const API_URL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}`


    const sortOrder = (event) => setToggleOrder(event.target.value)

        useEffect(()=>{
            if (toggleOrder === "A-Z" || toggleOrder === "Z-A") {
                const sortedList = [...todoList].sort((a, b) => toggleOrder === "A-Z" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
                setTodoList(sortedList);
            }else{
                const sortedList = [...todoList].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                setTodoList(sortedList);
            }
        },[toggleOrder])

    const fetchApi = async (method, url, headers, body, id) => {
        const options = {
            method: method,
            headers: {
                ...headers,
                Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
            },
            body: body ? JSON.stringify(body) : null,
        };
        const apiUrl = id ? `${url}/${id}` : url

        const response = await fetch(apiUrl, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }
        const data = await response.json();
        return data
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchApi(
                    'GET',
                    API_URL,
                )
                const sortedData = data.records.map((todo) => {
                    return { title: todo.fields.Title, id: todo.id, createdAt: todo.createdTime, done: todo.fields.Done }
                }).sort((a, b) => a.title.localeCompare(b.title))

                setTodoList(sortedData)
                setIsLoading(false)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData()
    }, [tableName])

    const addTodo = async (newData) => {
        try {
            const data = await fetchApi(
                'POST',
                API_URL,
                {
                    'Content-Type': 'application/json'
                },
                { records: [{ fields: newData }] }
            )
            const listItem = data.records[0]

            setTodoList(prevItems => [...prevItems, {
                title: listItem.fields.Title,
                done: listItem.fields.Done,
                id: listItem.id,
                createdAt: listItem.fields.CreatedAt
            }])
        } catch (error) {
            console.error('Error updating todo:', error.message);
        }
    }

    const fadeOutElement = (element) => {
        element.classList.add("fade-out")
        let opacity = 1;
        const fadeOutInterval = setInterval(function () {
            if (opacity > 0) {
                opacity -= 0.1;
                element.style.opacity = opacity;
            } else {
                clearInterval(fadeOutInterval);
            }
        }, 30);
    }

    const removeTodo = async (id, e) => {
     fadeOutElement(e.target.closest('li'))
        try {
            await fetchApi(
                'DELETE',
                `${API_URL}/${id}`,
                { 'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}` }
            )
            setTodoList(prevTodoList => prevTodoList.filter(item => item.id !== id))
        } catch (error) {
            console.error('Error deleting todo:', error.message);
        }
    }

    const updateTodo = async (id, updatedCheckboxValue) => {
        try {
            const data = await fetchApi(
                'PATCH',
                `${API_URL}/${id}`,
                {
                    'Content-Type': 'application/json'
                },
                {
                    fields: {
                        Done: updatedCheckboxValue,
                    },
                }
            )

            setTodoList((prevTodoList) =>
                prevTodoList.map((item) => item.id === data.id ? {
                    title: data.fields.Title,
                    done: data.fields.Done,
                    id: data.id,
                    createdAt: data.createdTime
                } : item))
        } catch (error) {
            console.error('Error updating todo:', error.message);
        }
    }

    return (
        <>
            <h1 className={style.Title}>{tableName}</h1>
            <AddTodoForm onAddTodo={addTodo} />
            <label htmlFor="sort">Sort By:</label>
            <select onChange={sortOrder} style={{ marginTop: "10px" }} className={style.addBtn} name="sortBy" id="sortBy">
                <option value="">--Please choose an option--</option>
                <option id="A-Z" value="A-Z">A-Z</option>
                <option id="Z-A" value="Z-A">Z-A</option>
                <option id="Date" value="Date">Date</option>
            </select>
            {isLoading ? <p>Loading...</p> :
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} updateTodo={updateTodo} />}
        </>
    )
}

export default TodoContainer