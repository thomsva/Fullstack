import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE_INCREASE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }

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

const getId = () => (100000 * Math.random()).toFixed(0)

export const voteIncrease = (id) => {
  return {
    type: 'VOTE_INCREASE',
    data: { id }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: { content, votes: 0, id: getId() }
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