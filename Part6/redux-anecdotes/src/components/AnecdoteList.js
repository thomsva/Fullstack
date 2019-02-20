import React from 'react';
import { connect } from 'react-redux'
import { voteIncrease } from '../reducers/anecdoteReducer'
import { notificationChange, notificationRemove } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.voteIncrease(anecdote)
    props.notificationChange('you voted: ' + anecdote.content)
    setTimeout(() => { props.notificationRemove() }, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {props.visibleAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  const anecdotesToShow = filter.text === null
    ? anecdotes
    : anecdotes.filter(a => a.content.toLowerCase().includes(filter.text.toLowerCase()))
  return anecdotesToShow
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  voteIncrease, notificationChange, notificationRemove
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)