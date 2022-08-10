import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileModule } from 'src/file/file.module';
import { PhotoAlbumsModule } from 'src/photo_albums/photo_albums.module';
import { PostPhotos } from 'src/posts/post-photos.model';
import { Post } from 'src/posts/posts.model';
import { User } from 'src/users/users.model';
import { PhotosController } from './photos.controller';
import { Photo } from './photos.model';
import { PhotosService } from './photos.service';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService],
  imports: [
    SequelizeModule.forFeature([ User,  Photo, Post, PostPhotos]),
    FileModule,
    PhotoAlbumsModule
  ],
  exports: [
    PhotosService
  ]
})
export class PhotosModule {}
