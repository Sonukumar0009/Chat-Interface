import { useState } from 'react'
import { format } from 'date-fns'

function Message({ message }) {
  const [showFullTime, setShowFullTime] = useState(false)
  const isUser = message.sender === 'user'

  return (
    <div className={`message-row ${isUser ? 'message-row--user' : 'message-row--bot'}`}>
      {!isUser && (
        <div className="message-avatar" aria-hidden="true">
          🤖
        </div>
      )}

      <div className="message-bubble-wrapper">
        <div
          className={`message-bubble ${isUser ? 'message-bubble--user' : 'message-bubble--bot'}`}
          role="group"
          aria-label={`${isUser ? 'You' : 'Bot'} said: ${message.text}`}
        >
          {message.status === 'failed' ? (
            <span className="message-failed-text">{message.text}</span>
          ) : (
            message.text
          )}
        </div>

        <span
          className="message-timestamp"
          onMouseEnter={() => setShowFullTime(true)}
          onMouseLeave={() => setShowFullTime(false)}
          onFocus={() => setShowFullTime(true)}
          onBlur={() => setShowFullTime(false)}
          tabIndex={0}
          title={format(new Date(message.timestamp), 'PPpp')}
        >
          {showFullTime
            ? format(new Date(message.timestamp), 'PPpp')
            : format(new Date(message.timestamp), 'p')}
        </span>

        {message.status === 'failed' && message.onRetry && (
          <button
            className="message-retry-btn"
            onClick={message.onRetry}
            aria-label="Retry sending message"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  )
}

export default Message