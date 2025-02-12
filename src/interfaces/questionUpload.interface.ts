export interface IQuestion {
    standard: string;
    standardName: string;
    subject: string;
    subjectName: string;
    topic: string;
    year: number;
    question: string;
    options: string[];
    correctOptionIndexes: number[];
    answers: string[];
    questionType: "MCQ" | string;
    createdBy: string;
    chapter: string;
    isActive: boolean;
    marks: number;
  }
  