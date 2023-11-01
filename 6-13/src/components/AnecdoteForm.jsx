import React from 'react'
import {createAnecdote} from '../reducers/anecdoteReducer.js'
import {useDispatch} from 'react-redux'
import {changeNotification} from '../reducers/notificationReducer.js'

const AnecdoteForm = () => {

  const dispatch = useDispatch()
  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    const content = anecdote
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(changeNotification(`You've created a new anecdote: '${anecdote}'`))
    setTimeout(() => dispatch(changeNotification('')), 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm;
