import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Photo } from 'src/photos/photos.model';
import { PhotosModule } from 'src/photos/photos.module';
import { User } from 'src/users/users.model';
import { PostPhotos } from './post-photos.model';
import { PostsController } from './posts.controller';
import { Post } from './posts.model';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    SequelizeModule.forFeature([ User,  Photo, Post, PostPhotos]),
    AuthModule,
    PhotosModule
  ]
})
export class PostsModule {}
