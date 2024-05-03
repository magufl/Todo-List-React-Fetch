import React, { useEffect, useState } from "react";


export const ToDoJPH = () => {
    const [todos, setTodos] = useState();
    const host = 'https://playground.4geeks.com/todo'

    const getTodos = async () => {
        const uri = host + '/users/';
        const options = {
            method: 'GET'
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
            //tratamos el error
            if (response.status == '404') {
                console.log('bad request 404')
            }
            console.log('Error: ', response.status, response.statusText)
            return
        }
        const data = await response.json()
        setTodos(data.users)
    }

    useEffect(() => {
        getTodos();
    }, [])

    return (
        <div className="container text-start">
            <h1 className="text-center">ToDo JPH</h1>
            <>
                {!todos ? <p>No tengo nada</p> :

                    <ul className="list-group">

                        {todos.map ((item) =>
                            <li key={item.id} className="list-group-item">
                                {item.name}
                            </li>
                        )}
                    </ul>
                }
            </>


        </div>

    )
}