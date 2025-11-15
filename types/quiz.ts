// Quiz and Question Types

export type QuestionType = 'mcq' | 'true-false' | 'text' | 'short-answer' | 'essay';

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  title: string;
  type: QuestionType;
  options?: Option[]; // For MCQ and True/False
  correctAnswer?: string; // For MCQ, True/False
  correctText?: string; // For text/short-answer matching
  marks?: number;
  order: number;
}

export interface Quiz {
  id: string;
  title: string;
  totalMarks?: number;
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
}

export interface CreateQuestionInput {
  title: string;
  type: QuestionType;
  options?: Option[];
  correctAnswer?: string;
  correctText?: string;
  marks?: number;
}

export interface CreateQuizInput {
  title: string;
  description: string;
  subject?: string;
  duration?: number;
}
