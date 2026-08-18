import { useState, useRef } from 'react'

function MessageInput({ onSend, disabled }) {
  const [text, setText] = useState('')
  const textareaRef = useRef(null)

  const handleSend = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    onSend(trimmed)
    setText('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleChange = (e) => {
    setText(e.target.value)
    // auto-grow the textarea as the user types
    e.target.style.height = 'auto'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  return (
    <div className="message-input-container">
      <textarea
        ref={textareaRef}
        className="message-input-textarea"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        rows={1}
        aria-label="Type your message"
        disabled={disabled}
      />
      <button
        className="message-send-btn"
        onClick={handleSend}
        disabled={disabled || !text.trim()}
        aria-label="Send message"
      >
        Send
      </button>
    </div>
  )
}

export default MessageInput