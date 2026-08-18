function TypingIndicator() {
  return (
    <div className="message-row message-row--bot" aria-live="polite" aria-label="Bot is typing">
      <div className="message-avatar" aria-hidden="true">🤖</div>
      <div className="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default TypingIndicator