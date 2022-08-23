import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as path from 'path';
import { hbsRegisterHelpers } from './hbs-helper-register';
import * as cookieParser from 'cookie-parser';
import * as hbs from 'hbs';


async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create<NestExpressApplication>(
      AppModule
  );

  app.useStaticAssets(path.resolve(__dirname, 'static'));
  app.useStaticAssets(path.resolve(__dirname, '..', 'public'));
  app.setBaseViewsDir(path.resolve(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  hbsRegisterHelpers(hbs);

  app.use(cookieParser());

  await app.listen(PORT, ()=>{
    console.log(`SERVER STARTED ON ${PORT} PORT!`);
  });
  
}
bootstrap();
