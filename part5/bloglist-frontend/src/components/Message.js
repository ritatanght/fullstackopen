const Message = ({ message }) => {
  const msgStyle =
    message.type === 'error'
      ? {
        color: 'red',
        border: '3px solid red',
        padding: '2px',
        margin: '5px 0',
      }
      : {
        color: 'green',
        border: '3px solid green',
        padding: '2px',
        margin: '5px 0',
      }

  return (
    <div className="message" style={msgStyle}>
      {message.message}
    </div>
  )
}

export default Message
