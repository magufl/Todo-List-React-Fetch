import React, { useEffect, useState } from "react";


export const ToDoJPH = () => {
    const [todos, setTodos] = useState();
    const host = 'https://playground.4geeks.com/todo';
    const user = 'magufl'

    const getTodos = async () => {
        const uri = `${host}/users/${user}`;
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
        setTodos(data.todos)
        console.log(uri)
        console.log(data.users)
        console.log(data.todos)
    }

/*     const postTodo = async () => {
        const uri = host + '/todos/';
        const options = {
            method: 'POST'
        };
    } */

    const deteleTodo = async (item) => {
        const uri = `${host}/todos/${item.id}`;
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText);
            return
        }
        //const data = await response.json();
        getTodos();
    }

/*     const editTodo = async (item) => {
        const uri = '';
        const options = {

        }
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText);
            return
        }
        const data = await response.json();
        return data;
    } */


    useEffect(() => {
        getTodos();
    }, [])

    return (
        <div className="container text-start">
            <h1 className="text-center">ToDo JPH</h1>
            <>
                {!todos ? <p>No tengo nada</p> :
                    <ul className="list-group">
                        {todos.map((item) =>
                            <li key={item.id} className="list-group-item d-flex justify-content-between hidden-icon">
                                <div>
                                    <div className="d-flex justify-content-between">
                                    {item.label}
                                    
                                    <span onClick={() => editTodo(item)} className="me-2">
                                        <i className="fas fa-edit text-success"></i>
                                    </span>
                                    <span onClick={() => deteleTodo(item)}>
                                        <i className="fas fa-trash text-danger"></i>
                                    </span>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                }
            </>
        </div>
    )
}