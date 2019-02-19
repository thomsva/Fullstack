
const initialState = { text: 'hello world' }

const notificationReducer = (state = initialState, action) => {

  switch (action.type) {
    default:
      return state
  }
}

export const notificationChange = text => {
  return {
    type: 'SET_NOTIFICATION',
    text: text
  }
}

export default notificationReducer
