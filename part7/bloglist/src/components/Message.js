import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Message = () => {
  const message = useSelector((state) => state.notification)
  const variant = message && message.type === 'error' ? 'danger' : 'success'
  // ? {
  //   color: 'red',
  //   border: '3px solid red',
  //   padding: '2px',
  //   margin: '5px 0',
  // }
  // : {
  //   color: 'green',
  //   border: '3px solid green',
  //   padding: '2px',
  //   margin: '5px 0',
  // }
  // <>{message &&
  //   <div className="message" style={msgStyle}>
  //     {message.message}
  //   </div>}
  // </>
  return <>{message && <Alert variant={variant}>{message.message}</Alert>}</>
}

export default Message
