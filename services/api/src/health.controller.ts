import { Controller, Get } from "@nestjs/common";
import { HealthCheckResponse } from "@axiom/types";

@Controller("health")
export class HealthController {
  @Get()
  check(): HealthCheckResponse {
    return {
      status: "ok",
      service: "api",
      timestamp: new Date().toISOString(),
    };
  }
}
