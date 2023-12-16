import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import "dotenv/config";

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
}
bootstrap();

// Баги в ТЗ общее:

/* BUG ТЗ: функциональность без регистрации:
  1. не известен endpoint главной страницы, по корню страницы не грузятся никакие заголовки
  2. где отображать желающих не ясно.
*/
