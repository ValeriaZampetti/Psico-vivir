import { Chat } from "../Chat";
import { Client, Doctor } from "../Client";

export interface IChatProvider {
  sendMessage(message: string): any;
  usersActive: Doctor[] | Client[];
  usersInactive: Doctor[] | Client[];
  currentUserToChat: Doctor | Client | null;
  currentChat: Chat | null;
  handleSelectUserToChat(user: Doctor | Client): void
  endChat(chatId: string): void;
}
