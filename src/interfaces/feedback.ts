export interface FeedbackCreate {
  chatId: string;
  appointmentIndex: number;
  rating: number;
  message: string;
  userId: string;
}

export interface Feedback extends FeedbackCreate {
  id: string;
}