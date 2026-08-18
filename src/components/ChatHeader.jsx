function ChatHeader({ isBotTyping }) {
  return (
    <header className="chat-header">
      <div className="chat-header-avatar" aria-hidden="true">🤖</div>
      <div className="chat-header-info">
        <h1 className="chat-header-title">Chat Assistant</h1>
        <span className="chat-header-status">
          {isBotTyping ? 'typing...' : 'online'}
        </span>
      </div>
    </header>
  )
}

export default ChatHeader