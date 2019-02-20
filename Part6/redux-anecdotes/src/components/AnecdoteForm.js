import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { notificationChange, notificationRemove } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    //event.target.anecdote.value = ''  //ei toimi tässä
    props.createAnecdote(newAnecdote.content)
    props.notificationChange('created anecdote: ' + content)
    setTimeout(() => { props.notificationRemove() }, 5000)
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