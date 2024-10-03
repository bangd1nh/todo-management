import React, { useEffect, useState } from 'react'
import { getTodoById, saveTodo, updateToto } from '../services/TodoService'
import { useNavigate, useParams } from 'react-router-dom'

function TodoComponent() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [completed, setCompleted] = useState(false)

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getTodoById(id).then(response => {
        console.log(response.data)
        setCompleted(response.data.completed)
        setDescription(response.data.description)
        setTitle(response.data.title)
      })
    }
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const todo = { title, description, completed }
    if (id) {
      updateToto(id, todo).then(response => {
        console.log(response.data);
      }).catch(error => {
        console.error(error);
      })
    } else {
      saveTodo(todo).then(response => {
        console.log(response.data);
      }).catch(error => {
        console.error(error);
      })
    }
    navigate('/todos')
  }
  return (
    <div className='border p-2 container mt-2'>
      {id ? <h2 className='text-center'>Update Todo</h2> : <h2 className='text-center'>Add Todo</h2>}
      <form >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
          <input type="text" className="form-control" id="exampleInputEmail1" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail2" className="form-label">Description</label>
          <input type="text" className="form-control" id="exampleInputEmail2" value={description} onChange={(e) => { setDescription(e.target.value) }} />
        </div>
        <div>
          <label className='form-label'>Todo Completed</label>
          <select className='form-control'
            value={completed}
            onChange={(e) => { setCompleted(e.target.value) }}>
            <option value='false'>No</option>
            <option value='true'>Yes</option>
          </select>
        </div>
        <button className='btn btn-outline-dark mt-2' onClick={(e) => { handleSubmit(e) }}>submit</button>
      </form>
    </div>
  )
}

export default TodoComponent