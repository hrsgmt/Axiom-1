// Shared types live here, imported by both apps/web and services/api.
// Real domain types (User, Post, etc.) get added starting Milestone 2.

export interface HealthCheckResponse {
  status: "ok";
  service: string;
  timestamp: string;
}
