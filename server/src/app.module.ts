import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available in all modules
      envFilePath: '.env', // Explicitly specify the .env file
    }),    
    AuthModule, PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
