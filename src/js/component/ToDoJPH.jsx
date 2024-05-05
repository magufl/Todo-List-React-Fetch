import React, { useEffect, useState } from "react";


export const ToDoJPH = () => {
    const [tarea, setTarea] = useState(" ");
    const [listado, setListado] = useState();
    const [currentTodo, setCurrentTodo] = useState({});
    const [edit, setEdit] = useState(false);
    const host = 'https://playground.4geeks.com/todo';
    const user = 'magufl'

    //crear funcion que cree usuario




    //FUNCIONES FETCH
    //1. TRAER TODOS
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
        setListado(data.todos)
        console.log('data:', data);
    }
    //2. POST TODOS
    const postTodo = async (todo) => {
        const uri = host + '/todos/' + user;
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(todo)
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText);
            return
        }
        const data = await response.json()
        setTarea('');
        getTodos();
    }
    //3. DELETE TODOS
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
        getTodos();
    }
    //4. EDIT TODOS
    const editTodo = async (item) => {
        setCurrentTodo(item);
        setEdit(true)
    }





    //FUNCIONES HANDLE
    // 1. MANDAR TODO
    const handleAddTodo = (event) => {
        event.preventDefault();
        if (tarea.trim() !== '') {
            const newTodo = {
                label: tarea,
                is_done: false
            }
            postTodo(newTodo)
        } else {
            setTarea('');
        }
    }

    // 2. EDITAR TODO
    const handleEdditTodo = async (event) => {
        event.preventDefault();

        const dataToSend = {
            label: currentTodo.label,
            is_done: currentTodo.is_done
          }

        const uri = `${host}/todos/${item.id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText);
            return
        }
        const data = await response.json();
        return data;
        getTodos()

    }




    useEffect(() => {
        //llamar funcion crea usuario
        getTodos();
    }, [])

    return (
        <div className="container text-start">
            <h1 className="text-center">ToDo JPH</h1>
            <form className="my-2" onSubmit={handleAddTodo}>
                <h1 className="text-center">Your To Do list👇</h1>
                <div className="mb-3 ">
                    <input type="text" className="form-control" id="tarea-input" placeholder="Add your new task" aria-describedby="emailHelp" value={tarea} onChange={(event) => setTarea(event.target.value)} />
                </div>
            </form>
            <>
                {!listado ? <p>No tengo nada</p> :
                    <ul className="list-group">
                        {listado.map((item) =>
                            <li key={item.id} className="list-group-item d-flex justify-content-between hidden-icon">
                                {item.label} - Con ID num: {item.id}
                                <div>
                                    <span onClick={() => editTodo(item)} className="me-2">
                                        <i className="fas fa-edit text-success"></i>
                                    </span>
                                    <span onClick={() => deteleTodo(item)}>
                                        <i className="fas fa-trash text-danger"></i>
                                    </span>
                                </div>
                            </li>
                        )}
                        <li className="list-group-item text-end bg-light fw-lighter">
                            {listado.length} pending tasks
                        </li>
                    </ul>
                }
            </>
        </div>
    )



}