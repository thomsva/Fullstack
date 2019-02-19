import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, notificationRemove } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const store = props.store
  const addAnecdote = (event) => {
    event.preventDefault()
    store.dispatch(createAnecdote(event.target.anecdote.value))
    store.dispatch(notificationChange('created anecdote: ' + event.target.anecdote.value))
    setTimeout(() => { store.dispatch(notificationRemove()) }, 5000)
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm