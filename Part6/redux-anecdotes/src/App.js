import React from 'react';
import { voteIncrease, createAnecdote } from './reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const store = props.store
  const addAnecdote = (event) => {
    event.preventDefault()
    store.dispatch(createAnecdote(event.target.anecdote.value))
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

const AnecdoteList = (props) => {
  const store = props.store
  const anecdotes = store.getState()
  const vote = (id) => {
    console.log('vote', id)
    store.dispatch(
      voteIncrease(id)
    )
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

const App = (props) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm store={props.store} />
      <AnecdoteList store={props.store} />
    </div>
  )
}

export default App
