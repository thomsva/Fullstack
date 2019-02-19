import React from 'react';
import { voteIncrease } from '../reducers/anecdoteReducer'
import { notificationChange, notificationRemove } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const store = props.store
  const anecdotes = store.getState().anecdotes
  const vote = (id) => {
    store.dispatch(voteIncrease(id))
    store.dispatch(notificationChange('you voted: ' + anecdotes.filter(a => a.id === id)[0].content))
    setTimeout(() => { store.dispatch(notificationRemove()) }, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList