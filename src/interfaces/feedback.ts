export interface FeedbackCreate {
  chatId: string;
  appointmentIndex: number;
  rating: number;
  message: string;
}

export interface Feedback extends FeedbackCreate {
  id: string;
}