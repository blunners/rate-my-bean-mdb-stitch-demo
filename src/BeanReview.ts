export interface BeanReview {
  id: string;
  title: string;
  rating: number;
  content: string;
  bean: Bean;
  userId: string;
}

export interface Bean {
  name: string;
  origin: string;
}