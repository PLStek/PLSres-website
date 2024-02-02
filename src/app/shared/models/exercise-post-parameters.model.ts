export interface ExercisePostParameters {
  title: string;
  difficulty: number;
  topicId: number;
  isCorrected: boolean;
  source: string;
  content: File;
}
