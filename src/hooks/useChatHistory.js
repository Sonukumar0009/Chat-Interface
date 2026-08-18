import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'chat-interface-history'

function loadHistory() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

// Fake bot reply generator — simulates network delay and occasional failure
function fakeBotReply(userText) {
  return new Promise((resolve, reject) => {
    const delay = 800 + Math.random() * 1200
    setTimeout(() => {
      // simulate ~10% failure rate for demonstrating retry/error handling
      if (Math.random() < 0.1) {
        reject(new Error('Network error'))
      } else {
        resolve(`You said: "${userText}"`)
      }
    }, delay)
  })
}

export function useChatHistory() {
  const [messages, setMessages] = useState(loadHistory)
  const [isBotTyping, setIsBotTyping] = useState(false)

  // persist to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  }, [messages])

  const addMessage = useCallback((sender, text, status = 'sent') => {
    const id = generateId()
    setMessages((prev) => [
      ...prev,
      { id, sender, text, status, timestamp: new Date().toISOString() },
    ])
    return id
  }, [])

  const updateMessage = useCallback((id, updates) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    )
  }, [])

  const sendMessage = useCallback(
    async (text) => {
      addMessage('user', text)
      setIsBotTyping(true)
      try {
        const reply = await fakeBotReply(text)
        addMessage('bot', reply)
      } catch {
        addMessage('bot', 'Failed to get a response.', 'failed')
      } finally {
        setIsBotTyping(false)
      }
    },
    [addMessage]
  )

  const retryMessage = useCallback(
    async (failedId, originalUserText) => {
      updateMessage(failedId, { status: 'retrying' })
      setIsBotTyping(true)
      try {
        const reply = await fakeBotReply(originalUserText)
        updateMessage(failedId, { text: reply, status: 'sent' })
      } catch {
        updateMessage(failedId, { status: 'failed' })
      } finally {
        setIsBotTyping(false)
      }
    },
    [updateMessage]
  )

  const clearHistory = useCallback(() => {
    setMessages([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return { messages, isBotTyping, sendMessage, retryMessage, clearHistory }
}