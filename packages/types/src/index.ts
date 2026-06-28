// Shared types live here, imported by both apps/web and services/api.

export interface HealthCheckResponse {
  status: "ok";
  service: string;
  timestamp: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
}
