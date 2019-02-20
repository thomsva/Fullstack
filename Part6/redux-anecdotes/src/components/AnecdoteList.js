import React from 'react';
import { connect } from 'react-redux'
import { voteIncrease } from '../reducers/anecdoteReducer'
import { notificationChange, notificationRemove } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes
  const filter = props.filter.text
  const anecdotesToShow = filter === null
    ? anecdotes
    : anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))

  const vote = (id) => {
    props.voteIncrease(id)
    props.notificationChange('you voted: ' + anecdotes.filter(a => a.id === id)[0].content)
    setTimeout(() => { props.notificationRemove() }, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotesToShow.map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  voteIncrease, notificationChange, notificationRemove
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)