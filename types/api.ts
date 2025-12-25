export interface QuestionRequest {
  question: string;
  debug?: boolean;
}

export interface Source {
  id: number;
  text: string;
}

export interface DebugInfo {
  predicted_intent: string;
  retrieved_answers_raw: string[];
  llm_prompt: string;
  num_retrieved_docs: number;
  kb_used: string;
}

export interface AnswerResponse {
  intent: string;
  answer: string;
  sources: Source[];
  debug?: DebugInfo | null;
}

export type Intent =
  | "causes"
  | "definition"
  | "other"
  | "prevention"
  | "risks"
  | "symptoms"
  | "treatment";

export interface HistoryItem {
  question: string;
  answer: string;
  intent: string;
  timestamp: string; // ISO 8601 format
}

export interface HistoryResponse {
  user_id: string;
  history: HistoryItem[];
}
