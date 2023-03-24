export interface FeedbackCreate {
  appointmentId: string;
  rating: number;
  message: string;
}

export interface Feedback extends FeedbackCreate {
  id: string;
}