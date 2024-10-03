import React, { useEffect, useState } from 'react'
import { completedTodo, deleteTodo, getAllTodos, incompleteTodo } from '../services/TodoService'
import { useNavigate } from 'react-router-dom'
import { isAdminUser } from '../services/AuthService';

function ListTodoComponent() {

    const [todos, setTodos] = useState([])

    const navigate = useNavigate();

    const isAdmin = isAdminUser()

    useEffect(() => {
        listTodos()
    }, [])

    function listTodos() {
        getAllTodos().then((response) => {
            setTodos(response.data)
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewTodo() {
        navigate("/add-new-todo")
    }

    function updateTodo(params) {
        navigate(`/update-todo/${params}`)
    }

    function removeTodo(params) {
        deleteTodo(params).then(response => {
            console.log(response.data);
            listTodos()
        }).catch(error => {
            console.error(error);
        })
    }

    function comTodo(params) {
        completedTodo(params).then(response => {
            listTodos()
        }).catch(error => {
            console.error(error);
        })
    }

    function incomTodo(params) {
        incompleteTodo(params).then(response => {
            listTodos()
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div className='container'>
            <h2 className='text-center'>List of Todos</h2>
            <div className='container'>
                {
                    isAdmin && <button onClick={addNewTodo} className='btn btn-outline-dark m-2'>Add new Todo</button>
                }
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>
                                Title
                            </th>
                            <th>
                                Description
                            </th>
                            <th>
                                Is completed
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map(d =>
                            <tr key={d.id}>
                                <td>{d.title}</td>
                                <td>{d.description}</td>
                                <td>{d.completed ? 'Yes' : 'NO'}</td>
                                <td>
                                    {
                                        isAdmin &&
                                        <button onClick={() => updateTodo(d.id)} className='btn btn-outline-dark'>update</button>
                                    }
                                    {
                                        isAdmin &&
                                        <button onClick={() => removeTodo(d.id)} className='btn btn-outline-danger ms-2'>Delete</button>
                                    }
                                    <button onClick={() => comTodo(d.id)} className='btn btn-outline-success ms-2'>Complete</button>
                                    <button onClick={() => incomTodo(d.id)} className='btn btn-outline-info ms-2'>Incomplete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default ListTodoComponent