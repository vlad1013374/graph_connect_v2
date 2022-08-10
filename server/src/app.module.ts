import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { UsersModule } from './users/users.module';
import {SequelizeModule} from "@nestjs/sequelize";
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { PhotosModule } from './photos/photos.module';
import { Post } from './posts/posts.model';
import { Photo } from './photos/photos.model';
import { PostPhotos } from './posts/post-photos.model';
import { FileModule } from './file/file.module';
import { PhotoAlbumsModule } from './photo_albums/photo_albums.module';
import { PhotoAlbum } from './photo_albums/photo_albums.model';
import { PhotoAlbumDefaultTypes } from './photo_albums/albums_default_types.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),

    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),

    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) ,
      username: process.env.DB_LOGIN,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Role, UserRoles, Post, PhotoAlbum, Photo, PostPhotos, PhotoAlbumDefaultTypes],
      autoLoadModels:true
    }),

    UsersModule,

    RolesModule,

    AuthModule,

    PostsModule,

    PhotosModule,

    FileModule,

    PhotoAlbumsModule
    
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
