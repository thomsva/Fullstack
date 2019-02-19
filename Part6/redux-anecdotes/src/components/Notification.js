import React from 'react';

const Notification = (props) => {
  const notification = props.store.getState().notification

  var style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification.text === null) {
    style = {
      display: 'none'
    }
  }
  return (<div style={style}>{notification.text}</div>)
}

export default Notification
