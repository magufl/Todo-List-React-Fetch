import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export const TodoList = () => {

    const host = "https://playground.4geeks.com/todo";
    const user = "magufl";

    const [tareas, setTareas] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState("");

    //GET
    async function traerTareas() {

        const uri = `${host}/users/${user}`
        const options = { method: "GET" }

        const response = await fetch(uri, options);

        if (!response.ok) {
            console.log("Aquí hay un error", response.status, response.statusText);
        };

        const data = await response.json();
        setTareas(data.todos);
    };

    //DELETE
    async function borrarTareas(item) {

        const uri = `${host}/todos/${item.id}`
        const options = {
            method: "DELETE",
        };

        const response = await fetch(uri, options);

        if (!response.ok) {
            console.log("Aquí hay un error", response.status, response.statusText);
        };

        traerTareas();

    };

    //EDIT
    async function editarTareas(item) {

        const uri = `${host}/todos/${item.id}`

        const updateTodo = { ...item, label: nuevaTarea };

        const options = {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(updateTodo)
        };

        const response = await fetch(uri, options);

        if (!response.ok) {
            console.log("Aquí hay un error", response.status, response.statusText);
        };

        setNuevaTarea("");
        traerTareas();

    };

    //POST
    async function crearTareas() {

        const uri = `${host}/todos/${user}`
        const todo = { label: nuevaTarea, is_done: false };
        const options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(todo)
        };

        const response = await fetch(uri, options);

        if (!response.ok) {
            console.log("Aquí hay un error", response.status, response.statusText);
        };

        setNuevaTarea("");
        traerTareas();

    };

    const handleEditTodo = (item) => {
        
        editarTareas(item);

    } 

    useEffect(() => {
        traerTareas();
    }, []);


    return (
        <>
            <div className=" m-5">
                <h1 className="text-center">Your To Do list👇</h1>
                <div className="mb-3 ">
                    <input type="text"
                        className="form-control"
                        id="tarea-input"
                        placeholder="Add your new task"
                        aria-describedby="emailHelp"
                        value={nuevaTarea}
                        onChange={(event) => setNuevaTarea(event.target.value)} />
                <button type="button" className="btn btn-primary my-1" onClick={crearTareas} >Agregar tarea</button>
                </div>

                <ul className="list-group my-2">
                {tareas.map((item) =>
                        <li key={item.id} className="list-group-item d-flex justify-content-between hidden-icon">
                            Tarea: "{item.label}"
                            <div>
                                <span onClick={() => handleEditTodo(item)} className="me-2">
                                    <i className="fas fa-edit text-success"></i>
                                </span>
                                <span onClick={() => borrarTareas(item)}>
                                    <i className="fas fa-trash text-danger"></i>
                                </span>
                            </div>
                        </li>
                    )}
                    <li className="list-group-item text-end bg-light fw-lighter">
                        {tareas.length} pending tasks
                    </li>
                </ul>
            </div>
        </>
    )
}