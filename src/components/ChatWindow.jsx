import { useRef, useEffect, useState } from 'react'
import Message from './Message'
import TypingIndicator from './TypingIndicator'

function ChatWindow({ messages, isBotTyping }) {
  const bottomRef = useRef(null)
  const containerRef = useRef(null)
  const [autoScroll, setAutoScroll] = useState(true)

  // detect if the user has scrolled up manually
  const handleScroll = () => {
    const el = containerRef.current
    if (!el) return
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
    setAutoScroll(distanceFromBottom < 100)
  }

  useEffect(() => {
    if (autoScroll && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isBotTyping, autoScroll])

  return (
    <div
      className="chat-window"
      ref={containerRef}
      onScroll={handleScroll}
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
    >
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
      {isBotTyping && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  )
}

export default ChatWindow