import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE_INCREASE':
      const id = action.data.anecdote.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: action.data.anecdote.votes }
      return state
        .map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
        .sort((a1, a2) => (a2.votes - a1.votes))
    case 'NEW_ANECDOTE':
      state = state.concat(action.data)
        .sort((a1, a2) => (a2.votes - a1.votes))
      return state
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const voteIncrease = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'VOTE_INCREASE',
      data: { anecdote: newAnecdote }
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}



export default anecdoteReducer