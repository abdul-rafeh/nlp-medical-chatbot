import { AnswerResponse, HistoryResponse, QuestionRequest } from "@/types/api";

// Base URL for the medical chatbot API
// Note: For Android emulator, you may need to use 'http://10.0.2.2:8000' instead
// For iOS simulator, 'http://127.0.0.1:8000' works fine
// For physical devices, use your computer's local IP address (e.g., 'http://192.168.1.100:8000')
const BASE_URL = "http://127.0.0.1:8000";

export class ApiError extends Error {
  constructor(message: string, public status?: number, public response?: any) {
    super(message);
    this.name = "ApiError";
  }
}

export async function askQuestion(
  question: string,
  debug: boolean = false
): Promise<AnswerResponse> {
  const requestBody: QuestionRequest = {
    question,
    debug,
  };

  try {
    const response = await fetch(`${BASE_URL}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status,
        errorData
      );
    }

    const data: AnswerResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle network errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiError(
        "Unable to connect to the server. Please check your connection and ensure the backend is running.",
        0
      );
    }

    throw new ApiError(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  }
}

export async function getHistory(): Promise<HistoryResponse> {
  try {
    const response = await fetch(`${BASE_URL}/history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status,
        errorData
      );
    }

    const data: HistoryResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle network errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiError(
        "Unable to connect to the server. Please check your connection and ensure the backend is running.",
        0
      );
    }

    throw new ApiError(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  }
}
