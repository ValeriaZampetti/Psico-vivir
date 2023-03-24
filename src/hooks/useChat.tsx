import { useContext } from 'react'
import { ChatContext } from '../context/ChatProvider'
import { IChatProvider } from '../interfaces/providers/IChatProvider'

export function useChat() {
  return useContext<IChatProvider>(ChatContext)
}