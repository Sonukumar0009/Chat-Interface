import { useChatHistory } from './hooks/useChatHistory'
import ChatHeader from './components/ChatHeader'
import ChatWindow from './components/ChatWindow'
import MessageInput from './components/MessageInput'
import './App.css'

function App() {
  const { messages, isBotTyping, sendMessage, retryMessage, clearHistory } =
    useChatHistory()

  // attach a retry handler to the last failed message's user text
  const messagesWithRetry = messages.map((msg, idx) => {
    if (msg.status !== 'failed') return msg
    const precedingUserMsg = [...messages.slice(0, idx)]
      .reverse()
      .find((m) => m.sender === 'user')
    return {
      ...msg,
      onRetry: () => retryMessage(msg.id, precedingUserMsg?.text ?? ''),
    }
  })

  return (
    <div className="app">
      <ChatHeader isBotTyping={isBotTyping} />
      <ChatWindow messages={messagesWithRetry} isBotTyping={isBotTyping} />
      <MessageInput onSend={sendMessage} disabled={isBotTyping} />
      <button className="clear-history-btn" onClick={clearHistory}>
        Clear chat
      </button>
    </div>
  )
}

export default App