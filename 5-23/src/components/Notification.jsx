import PropTypes from 'prop-types'
import LoginForm from './LoginForm.jsx'

const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={'message ' + messageType}>
      {message}
    </div>
  )
}

LoginForm.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired
}
export default Notification
