const Notification = ({ message, error }) => {
  if (message === null && error === null) {
    return null;
  } else if (message) {
    return <div className="message">{message}</div>;
  }
  return <div className="error">{error}</div>;
};

export default Notification;
