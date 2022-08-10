import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Photo } from 'src/photos/photos.model';
import { User } from 'src/users/users.model';
import { PhotoAlbumDefaultTypes } from './albums_default_types.model';
import { PhotoAlbumsController } from './photo_albums.controller';
import { PhotoAlbum } from './photo_albums.model';
import { PhotoAlbumsService } from './photo_albums.service';

@Module({
  controllers: [PhotoAlbumsController],
  providers: [PhotoAlbumsService],
  imports: [
    AuthModule,
    SequelizeModule.forFeature([ User,  Photo, PhotoAlbum, PhotoAlbumDefaultTypes]),
  ],
  exports: [
    PhotoAlbumsService
  ]
})
export class PhotoAlbumsModule {}
