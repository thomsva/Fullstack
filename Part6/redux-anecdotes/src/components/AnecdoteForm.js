import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { notificationChange, notificationRemove } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    props.createAnecdote(event.target.anecdote.value)
    props.notificationChange('created anecdote: ' + event.target.anecdote.value)
    setTimeout(() => { props.notificationRemove() }, 5000)
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


export default connect(
  null, { createAnecdote, notificationChange, notificationRemove }
)(AnecdoteForm)