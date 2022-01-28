import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacebookStrategy } from './facebook.strategy';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, FacebookStrategy],
})
export class AppModule {}
