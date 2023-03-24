import { Chat } from "../Chat";
import { Client, Doctor } from "../Client";

export interface IChatProvider {
  sendMessage(message: string): any;
  usersToChat: Doctor[] | Client[];
  currentUserToChat: Doctor | Client | null;
  currentChat: Chat | null;
  handleSelectUserToChat(user: Doctor | Client): void;
}