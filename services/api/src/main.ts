import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Open CORS for now; tightened to known origins in Milestone 2 (auth).
  app.enableCors();

  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  console.log(`[api] listening on port ${port}`);
}

bootstrap();
